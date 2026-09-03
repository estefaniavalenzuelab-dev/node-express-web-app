import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual
} from "node:crypto";

import {
  promisify
} from "node:util";

const scrypt =
  promisify(
    scryptCallback
  );

export async function crearPasswordHash(
  password
) {
  const salt =
    randomBytes(
      16
    ).toString(
      "hex"
    );

  const hash =
    await scrypt(
      password,
      salt,
      64
    );

  return [
    salt,
    hash.toString(
      "hex"
    )
  ].join(
    ":"
  );
}

export async function verificarPassword(
  password,
  almacenado
) {
  if (!almacenado) {
    return false;
  }

  const [
    salt,
    hashHex
  ] =
    almacenado.split(
      ":"
    );

  if (
    !salt ||
    !hashHex
  ) {
    return false;
  }

  const hashGuardado =
    Buffer.from(
      hashHex,
      "hex"
    );

  const hashRecibido =
    await scrypt(
      password,
      salt,
      64
    );

  if (
    hashGuardado.length !==
    hashRecibido.length
  ) {
    return false;
  }

  return timingSafeEqual(
    hashGuardado,
    hashRecibido
  );
}