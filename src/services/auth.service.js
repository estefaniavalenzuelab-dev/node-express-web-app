import jwt
  from "jsonwebtoken";

import {
  Usuario
} from "../models/index.js";

import {
  crearPasswordHash,
  verificarPassword
} from "../utils/password.util.js";

function crearError(
  mensaje,
  statusCode
) {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
}

function normalizarTexto(
  valor
) {
  return String(
    valor ?? ""
  ).trim();
}

function validarCorreo(
  correo
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    correo
  );
}

export async function registrarUsuario(
  datos
) {
  const nombre =
    normalizarTexto(
      datos.nombre
    );

  const correo =
    normalizarTexto(
      datos.correo
    ).toLowerCase();

  const password =
    String(
      datos.password ??
      ""
    );

  if (!nombre) {
    throw crearError(
      "El nombre es obligatorio.",
      400
    );
  }

  if (
    !correo ||
    !validarCorreo(
      correo
    )
  ) {
    throw crearError(
      "El correo no es válido.",
      400
    );
  }

  if (
    password.length <
    8
  ) {
    throw crearError(
      "La contraseña debe tener al menos 8 caracteres.",
      400
    );
  }

  const existente =
    await Usuario.findOne({
      where: {
        correo
      }
    });

  if (existente) {
    throw crearError(
      "El correo ya está registrado.",
      409
    );
  }

  const passwordHash =
    await crearPasswordHash(
      password
    );

  const usuario =
    await Usuario.create({
      nombre,
      correo,
      activo:
        true,
      passwordHash
    });

  return {
    id:
      usuario.id,
    nombre:
      usuario.nombre,
    correo:
      usuario.correo,
    activo:
      usuario.activo
  };
}

function generarTokenUsuario(
  usuario
) {
  const secret =
    process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET no está configurado."
    );
  }

  return jwt.sign(
    {
      correo:
        usuario.correo
    },
    secret,
    {
      subject:
        String(
          usuario.id
        ),

      expiresIn:
        process.env.JWT_EXPIRES_IN ??
        "1h"
    }
  );
}

export async function autenticarUsuario(
  credenciales
) {
  const correo =
    normalizarTexto(
      credenciales.correo
    ).toLowerCase();

  const password =
    String(
      credenciales.password ??
      ""
    );

  if (
    !correo ||
    !password
  ) {
    throw crearError(
      "Correo y contraseña son obligatorios.",
      400
    );
  }

  const usuario =
    await Usuario.findOne({
      where: {
        correo
      }
    });

  if (
    !usuario ||
    !usuario.passwordHash
  ) {
    throw crearError(
      "Credenciales inválidas.",
      401
    );
  }

  const passwordValida =
    await verificarPassword(
      password,
      usuario.passwordHash
    );

  if (!passwordValida) {
    throw crearError(
      "Credenciales inválidas.",
      401
    );
  }

  if (
    usuario.activo ===
    false
  ) {
    throw crearError(
      "El usuario está inactivo.",
      401
    );
  }

  const token =
    generarTokenUsuario(
      usuario
    );

  return {
    usuario: {
      id:
        usuario.id,
      nombre:
        usuario.nombre,
      correo:
        usuario.correo,
      activo:
        usuario.activo
    },
    token
  };
}