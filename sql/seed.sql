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

INSERT INTO perfiles (
  usuario_id,
  telefono,
  direccion,
  fecha_nacimiento
)
VALUES (
  1,
  '+56 9 1234 5678',
  'Av. Providencia 1234, Santiago',
  '1996-03-12'
)
ON CONFLICT (usuario_id)
DO NOTHING;

INSERT INTO pedidos (
  usuario_id,
  estado,
  total
)
VALUES
  (
    1,
    'pendiente',
    19990
  ),
  (
    1,
    'pagado',
    45990
  ),
  (
    2,
    'enviado',
    12500
  );

  INSERT INTO roles (
  nombre
)
VALUES
  ('usuario'),
  ('editor'),
  ('administrador')
ON CONFLICT (nombre)
DO NOTHING;

INSERT INTO usuario_roles (
  usuario_id,
  rol_id,
  asignado_por
)
VALUES
  (
    1,
    1,
    'seed'
  ),
  (
    1,
    2,
    'seed'
  )
ON CONFLICT (
  usuario_id,
  rol_id
)
DO NOTHING;