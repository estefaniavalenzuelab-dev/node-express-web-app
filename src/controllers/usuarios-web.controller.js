import { crearUsuario, obtenerUsuarioPorId, modificarUsuario, eliminarUsuario } from "../services/usuarios.service.js";

export function mostrarFormularioNuevoUsuario(
  req,
  res
) {
  res.render(
    "usuarios/nuevo",
    {
      titulo:
        "Nuevo usuario",

      valores: {
        nombre:
          "",
        correo:
          "",
        activo:
          "true"
      }
    }
  );
}

export async function crearUsuarioWeb(
  req,
  res,
  next
) {
  try {
    await crearUsuario(
      req.body
    );

    return res.redirect(
      "/usuarios"
    );
  } catch (error) {
    if (
      error.status === 400 ||
      error.status === 409
    ) {
      return res.status(
        error.status
      ).render(
        "usuarios/nuevo",
        {
          titulo:
            "Nuevo usuario",
          error:
            error.message,
          valores: {
            nombre:
              req.body.nombre ?? "",
            correo:
              req.body.correo ?? "",
            activo:
              req.body.activo ?? "true"
          }
        }
      );
    }

    return next(error);
  }
}

export async function mostrarFormularioEditarUsuario(
  req,
  res,
  next
) {
  try {
    const usuario =
      await obtenerUsuarioPorId(
        req.params.id
      );

    if (!usuario) {
      return res.status(404).render(
        "404",
        {
          titulo:
            "Usuario no encontrado"
        }
      );
    }

    return res.render(
      "usuarios/editar",
      {
        titulo:
          "Editar usuario",
        usuario
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function actualizarUsuarioWeb(
  req,
  res,
  next
) {
  try {
    const usuario =
      await modificarUsuario(
        req.params.id,
        req.body
      );

    if (!usuario) {
      return res.status(404).render(
        "404",
        {
          titulo:
            "Usuario no encontrado"
        }
      );
    }

    return res.redirect(
      "/usuarios"
    );
  } catch (error) {
    if (
      error.status === 400 ||
      error.status === 409
    ) {
      return res.status(
        error.status
      ).render(
        "usuarios/editar",
        {
          titulo:
            "Editar usuario",
          error:
            error.message,
          usuario: {
            id:
              req.params.id,
            nombre:
              req.body.nombre ?? "",
            correo:
              req.body.correo ?? "",
            activo:
              req.body.activo ===
              "true"
          }
        }
      );
    }

    next(error);
  }
}

export async function eliminarUsuarioWeb(
  req,
  res,
  next
) {
  try {
    const usuario =
      await eliminarUsuario(
        req.params.id
      );

    if (!usuario) {
      return res.status(404).render(
        "404",
        {
          titulo:
            "Usuario no encontrado"
        }
      );
    }

    return res.redirect(
      "/usuarios"
    );
  } catch (error) {
    next(error);
  }
}