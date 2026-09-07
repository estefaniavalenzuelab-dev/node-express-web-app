import jwt
  from "jsonwebtoken";

import {
  expressjwt
} from "express-jwt";


export function verificarJwtManual(
  req,
  res,
  next
) {
  const authorization =
    req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({
        status:
          "error",
        message:
          "Token de autenticación requerido.",
        data:
          null
      });
  }

  const [
    esquema,
    token
  ] =
    authorization.split(
      " "
    );

  if (
    esquema !== "Bearer" ||
    !token
  ) {
    return res
      .status(401)
      .json({
        status:
          "error",
        message:
          "Formato de autorización inválido.",
        data:
          null
      });
  }

  try {
    const payload =
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
          algorithms: [
            "HS256"
          ]
        }
      );

    req.auth =
      payload;

    next();
  } catch (error) {
    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({
          status:
            "error",
          message:
            "El token ha expirado.",
          data:
            null
        });
    }

    return res
      .status(401)
      .json({
        status:
          "error",
        message:
          "Token inválido.",
        data:
          null
      });
  }
}

export const protegerRuta =
  expressjwt({
    secret:
      process.env.JWT_SECRET,

    algorithms: [
      "HS256"
    ]
  });