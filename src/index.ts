import express from 'express';
import morgan from 'morgan';
import loginroutes from './routes/login.routes';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json())
app.use(morgan('dev'));
//Morgan sirve para ver los logs de las peticiones que hagamos

app.use('/api/alumnos', loginroutes);

connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto:", PORT)
});
});