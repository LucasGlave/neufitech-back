import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "prod";
// const isProd = true;

let sequelize: Sequelize;

if (isProd) {
  const connectionProd = process.env.DB_PORT_PROD;
  console.log(connectionProd);
  if (!connectionProd) {
    throw new Error(
      "La cadena de conexión a la base de datos no está definida en producción."
    );
  }
  sequelize = new Sequelize(connectionProd, {
    dialect: "postgres",
    logging: false,
  });
} else {
  const connectionProd = process.env.DB_PORT_DEV;
  console.log(connectionProd);
  if (!connectionProd) {
    throw new Error(
      "La cadena de conexión a la base de datos no está definida en producción."
    );
  }
  sequelize = new Sequelize(connectionProd, {
    dialect: "postgres",
    logging: false,
  });
}

export default sequelize;
