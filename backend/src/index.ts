import express from 'express';

const app = express();
const port = 3001;

app.get('/', (_, res) => {
  res.send('API funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
