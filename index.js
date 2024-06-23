import express from 'express';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import jaratRoutes from './routes/jaratok.js';
import foglalasRoutes from './routes/foglalasok.js';
import errorMiddleware from './middleware/error.js';
import felvezetesRoutes from './routes/felvezetes.js';
import apiRouter from './api/api-router.js';
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js';
import logoutRoutes from './routes/logout.js';
import osszesFoglalasRoutes from './routes/osszes-foglalas.js';

const app = express();

app.use(express.static(path.join(process.cwd(), 'static')));

// sablonmotor beallitasa
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(morgan('tiny'));

// session beallitasa
app.use(session({ secret: '142e6ecf42884f03', resave: false, saveUninitialized: true }));

app.use('/api', apiRouter);

// sajat routerek
app.use('/', jaratRoutes);
app.use('/foglalas', foglalasRoutes);
app.use('/felvezetes', felvezetesRoutes);
app.use('/osszes-foglalas', osszesFoglalasRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('Elindult a szerver');
});
