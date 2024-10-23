import express, { Application } from "express";
import routes from "./routes";
import sequelize from "./config/database";
import { Code } from "./models/code.models";
import cors from "cors";
require('dotenv').config();

const app: Application = express();

app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3002;
// const isProd = process.env.NODE_ENV;

const corsOptions = {
  origin: "http://localhost:8888",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
    Code.initialize(sequelize);
    return sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
    });
  })
  .then(() => {
    console.log("Models synchronized with database.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
