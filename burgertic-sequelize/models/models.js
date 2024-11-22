import { Pedidos } from "./pedidos.model"
import { Plato } from "./platos.model";
import { PlatosxPedidos } from "./platosxpedidos.model";
import { Usuarios } from "./usuarios.model"

const defModelos = async()=>{
    Usuarios.hasMany(Pedidos);
    Pedidos.belongsToMany(Plato, {through: PlatosxPedidos});
    Plato.belongsToMany(Pedidos, {through: PlatosxPedidos});
}