

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

// app.get('/', (_req: Request, res: Response) => res.send('wowie zowie'));



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
});