import dotenv from "dotenv";
import express from "express";
import '@babel/polyfill';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'hello world!! Your app is working' });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;