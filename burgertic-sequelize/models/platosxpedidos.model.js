import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PlatosxPedidos extends Model {}

PlatosxPedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },
       
    },
    {
        sequelize,
        modelName: "pltosxpedidos",
        timestamps: false,
    }
);
