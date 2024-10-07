import express, { Application } from 'express';
import codeRoutes from './routes/code.route';
import sequelize from './config/database';
import { Code } from './models/code.models';
import cors from "cors"

const app: Application = express();

app.use(express.json());

app.use('/api', codeRoutes);

const PORT = process.env.PORT || 3002;

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (!origin || origin === null) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

sequelize.authenticate()
    .then(() => {
        console.log('Database connected.');
        Code.initialize(sequelize);
        return sequelize.sync({ force: false }).then(() => {
            app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
        });
    })
    .then(() => {
        console.log('Models synchronized with database.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });



export default app;
