import "dotenv/config";

import jwt
  from "jsonwebtoken";

const payload = {
  sub:
    "1",
  correo:
    "demo@example.com"
};

const token =
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN ??
        "1h"
    }
  );

console.log(
  "TOKEN:"
);

console.log(
  token
);

console.log(
  "\nDECODIFICADO:"
);

console.log(
  jwt.decode(
    token
  )
);