INSERT INTO usuarios (
  nombre,
  correo,
  activo
)
VALUES
  (
    'Ana Torres',
    'ana@example.com',
    TRUE
  ),
  (
    'Carlos Soto',
    'carlos@example.com',
    FALSE
  ),
  (
    'Daniela Rojas',
    'daniela@example.com',
    TRUE
  )
ON CONFLICT (correo) DO NOTHING;