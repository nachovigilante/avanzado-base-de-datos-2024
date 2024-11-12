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
            
        }

    }

)