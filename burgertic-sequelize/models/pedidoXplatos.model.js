import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Plato } from "../models/platos.model.js";
import { Pedido } from "../models/pedidos.model.js";

export class PlatoxPedido extends Model {}

PlatoxPedido.init(
   {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedido, 
            key: 'id' 
        }
    },
    id_plato: {
        type: DataTypes.INTEGER,
        references: {
            model: Plato, 
            key: 'id' 
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },                                               
   },
   {
    sequelize,
    modelName: "pedidos_platos",
    timestamps: false,
   }
);