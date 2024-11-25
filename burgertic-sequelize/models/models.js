import { sequelize } from "../db.js";
import { Pedidos } from "./pedidos.model.js"
import { Plato } from "./platos.model.js";
import { PlatosxPedidos } from "./platosxpedidos.model.js";
import { Usuarios } from "./usuarios.model.js"

export const defModelos = async()=>{
    Pedidos.belongsTo(Usuarios);
    Usuarios.hasMany(Pedidos);
    Pedidos.belongsToMany(Plato, {through: PlatosxPedidos});
    Plato.belongsToMany(Pedidos, {through: PlatosxPedidos});

    //await sequelize.sync({force: true, alter: true})
}  