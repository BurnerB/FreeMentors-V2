import dotenv from "dotenv";
import express from "express";
import '@babel/polyfill';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userRoutes';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'hello world!! Your app is working' });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;