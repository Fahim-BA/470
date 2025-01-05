import express from 'express';
import cors from 'cors';
import { connect } from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

//security packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

//import routes
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config();
connect()
const app = express();
const port = 3000;

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'))

// Import application routes
import applicationRoutes from './routes/applicationRoutes.js';

//routes
app.use('/api', userRoutes)
app.use('/jobs', jobRoutes)
app.use('/applications', applicationRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
