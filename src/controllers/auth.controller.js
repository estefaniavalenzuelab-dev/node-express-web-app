import jwt
  from "jsonwebtoken";

import {
  autenticarUsuario,
  registrarUsuario
} from "../services/auth.service.js";

export async function registrar(
  req,
  res,
  next
) {
  try {
    const usuario =
      await registrarUsuario(
        req.body
      );

    return res
      .status(201)
      .json({
        status:
          "ok",
        message:
          "Usuario registrado correctamente.",
        data:
          usuario
      });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req,
  res,
  next
) {
  try {
    const resultado =
      await autenticarUsuario(
        req.body
      );

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Autenticación correcta.",
        data:
          resultado
      });
  } catch (error) {
    next(error);
  }
}

export function decodificarToken(
  req,
  res,
  next
) {
  try {
    const token =
      req.body.token;

    if (!token) {
      return res
        .status(400)
        .json({
          status:
            "error",
          message:
            "Debes enviar un token.",
          data:
            null
        });
    }

    const payload =
      jwt.decode(
        token
      );

    if (!payload) {
      return res
        .status(400)
        .json({
          status:
            "error",
          message:
            "No fue posible decodificar el token.",
          data:
            null
        });
    }

    return res
      .status(200)
      .json({
        status:
          "ok",
        message:
          "Token decodificado.",
        data:
          payload
      });
  } catch (error) {
    next(error);
  }
}