import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Usuarios extends Model {}

Usuarios.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        apellido: {
            type: DataTypes.CHART,
        },
        nombre: {
            type: DataTypes.CHART,
        },
        email: {
            type: DataTypes.CHART,
        },
        password: {
            type: DataTypes.CHART,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: "Usuarios",
        timestamps: false,
    }
);
