import "dotenv/config";

export const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true,
    url: process.env.DB_URL
};

import { Sequelize } from "sequelize";

console.log(config)

export const sequelize = new Sequelize(
    config.url
);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
