import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Pedido extends Model {}

Pedido.init(
    {
        id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
        },
        estado:{
            type:DataTypes.STRING
        },
        fecha:{
            type: DataTypes.DATE
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            foreignKey:true,
        },
    },
    {
        sequelize,
        modelName:"pedidos",
        timestamps: false
    }

);