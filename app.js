import dotenv from 'dotenv';
import express from 'express';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userRoutes';
import AdminRoutes from './server/routes/adminRoutes';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1', userRoutes);
app.use('/api/v1', AdminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'hello world!! Your app is working' });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
