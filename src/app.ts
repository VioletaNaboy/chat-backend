import express from 'express';
import cors from 'cors';
//import chatRoutes from './routes/chatRoutes';

const app = express();

app.use(cors());
app.use(express.json());



export default app;
