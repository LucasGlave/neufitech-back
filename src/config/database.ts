import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.NODE_ENV === "prod";

let sequelize: Sequelize;

if (isProd) {
    const connectionProd = process.env.DB_CONNECTION_INT;
    if (!connectionProd) {
        throw new Error("La cadena de conexión a la base de datos no está definida en producción.");
    }
    sequelize = new Sequelize(connectionProd, {
        dialect: "postgres",
        logging: false,
    });
} else {
    const connectionDev = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
    };
    if (!connectionDev.database || !connectionDev.username || !connectionDev.password || !connectionDev.host) {
        throw new Error("Faltan configuraciones para la conexión a la base de datos en desarrollo.");
    }
    sequelize = new Sequelize(connectionDev.database, connectionDev.username, connectionDev.password, {
        host: connectionDev.host,
        dialect: "postgres",
        logging: false,
    });
}

export default sequelize;
