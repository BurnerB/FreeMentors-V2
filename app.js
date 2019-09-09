import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import '@babel/polyfill';
import bodyParser from 'body-parser';

import routes from './server/routes';
import response from './server/helpers/responses';


const swaggerDocument = require('./Docs/swagger-doc.json');

const app = express();
const port = process.env.DB_PORT;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
routes(app);
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello world!! Your app is working' });
});


app.use((req, res) => response.handleError(405 ,'Method not allowed',res));

app.use((req, res) => {
  if (!req.is('*/json')) {
    return response.handleError(404, 'Not valid Json request', res);
  }
});

app.use((req, res) => response.handleError(405, 'Method not allowed', res));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
