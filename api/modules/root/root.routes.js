// api/routes/root.routes.js

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>compras-api-express</title>
  </head>
  <body style="background-color: black; color: yellow; text-align: center;">
    <h1>compras-api-express</h1>
  </body>
</html>

  `);
});

export default router;
