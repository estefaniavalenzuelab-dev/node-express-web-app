import "dotenv/config";

import jwt
  from "jsonwebtoken";

const token =
  process.argv[2];

if (!token) {
  console.error(
    "Debes pasar un token como argumento."
  );

  process.exit(1);
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

  console.log(
    "TOKEN VÁLIDO"
  );

  console.log(
    payload
  );
} catch (error) {
  console.error(
    "TOKEN INVÁLIDO"
  );

  console.error(
    error.name,
    error.message
  );
}