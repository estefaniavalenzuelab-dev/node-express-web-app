import express
  from "express";

import bodyParser
  from "body-parser";

const app =
  express();

app.use(
  bodyParser.json()
);

app.post(
  "/demo",
  (req, res) => {
    res.json({
      status:
        "ok",
      message:
        "Body recibido.",
      data:
        req.body
    });
  }
);

app.listen(
  3100,
  () => {
    console.log(
      "Demo en http://localhost:3100"
    );
  }
);