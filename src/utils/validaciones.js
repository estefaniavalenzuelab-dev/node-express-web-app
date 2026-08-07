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