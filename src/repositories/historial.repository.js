export async function insertarHistorial(
  client,
  {
    usuarioId,
    evento,
    detalle = null
  }
) {
  const resultado =
    await client.query(
      `
        INSERT INTO historial_usuarios (
          usuario_id,
          evento,
          detalle
        )
        VALUES (
          $1,
          $2,
          $3
        )
        RETURNING
          id,
          usuario_id,
          evento,
          detalle,
          created_at
      `,
      [
        usuarioId,
        evento,
        detalle
      ]
    );

  return resultado.rows[0];
}