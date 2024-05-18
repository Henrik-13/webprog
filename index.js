import express from 'express';
import path from 'path';
import morgan from 'morgan';
import jaratRoutes from './routes/jaratok.js';
import foglalasRoutes from './routes/foglalasok.js';
import errorMiddleware from './middleware/error.js';
import felvezetesRoutes from './routes/felvezetes.js';

const app = express();

app.use(express.static(path.join(process.cwd(), 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(morgan('tiny'));
app.use('/foglalas', foglalasRoutes);
app.use('/', jaratRoutes);
app.use('/felvezetes', felvezetesRoutes);

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('Elindult a szerver');
});
