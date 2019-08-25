import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userRoutes';
import sessionRoutes from './server/routes/sessionRoutes';
import AdminRoutes from './server/routes/adminRoutes';

const swaggerDocument = require('./Docs/swagger-doc.json');

const app = express();
const port = process.env.PORT;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1', userRoutes);
app.use('/api/v1', AdminRoutes);
app.use('/api/v1', sessionRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello world!! Your app is working' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
