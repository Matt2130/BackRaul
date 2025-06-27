import express from 'express';
import morgan from 'morgan';
import loginroutes from './routes/login.routes';
import connectDB from './config/db';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json())
app.use(morgan('dev'));

app.use('/api/alumnos', loginroutes);

connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto:", PORT)
});
});