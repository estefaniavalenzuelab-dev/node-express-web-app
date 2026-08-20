export function normalizarTexto(valor) {
  return String(valor ?? "").trim();
}

export function esCorreoValido(correo) {
  const valor = normalizarTexto(correo);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

export function convertirBooleano(valor) {
  if (typeof valor === "boolean") {
    return valor;
  }

  if (valor === "true") {
    return true;
  }

  if (valor === "false") {
    return false;
  }

  throw new Error(
    'El valor debe ser "true" o "false".'
  );
}

export function validarId(id) {
  const idNumerico = Number(id);

  if (
    !Number.isInteger(idNumerico) ||
    idNumerico <= 0
  ) {
    throw new Error(
      "El identificador debe ser un entero positivo."
    );
  }

  return idNumerico;
}

export function validarNombre(nombre) {
  if (
    typeof nombre !== "string" ||
    nombre.trim().length < 2
  ) {
    throw new Error(
      "El nombre debe contener al menos 2 caracteres."
    );
  }

  return nombre.trim();
}

export function validarCorreo(correo) {
  if (
    typeof correo !== "string" ||
    !correo.includes("@")
  ) {
    throw new Error(
      "El correo no tiene un formato válido."
    );
  }

  return correo.trim().toLowerCase();
}