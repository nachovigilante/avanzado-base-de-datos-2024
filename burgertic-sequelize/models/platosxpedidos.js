import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class pltosxpedidos extends Model {}

pltosxpedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INT,
        },
       
    },
    {
        sequelize,
        modelName: "pltosxpedidos",
        timestamps: false,
    }
);
