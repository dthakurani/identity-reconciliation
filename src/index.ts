import app from './app';
import { dataSource } from './configs/db.config';

const startServer = async function () {
  try {
    const port = process.env.SERVER_PORT || 3000;
    await dataSource.initialize();
    console.log('... Microservice db ✔');

    app.listen(port);
    console.log(`--- Server started on ${port} ---\n\n`);
  } catch (err) {
    console.log('server setup failed', err);
    console.log('Error: ', err.message);
  }
};

startServer();
