import { Pedidos } from '../models/pedidos.model.js';
import { Plato } from '../models/platos.model.js';
import { PlatosXPedidos } from '../models/platosxpedidos.model.js';
import { Usuarios } from '../models/usuarios.model.js';

const getPlatosByPedido = async (idPedido) => {
    const platosXPedidos = await PlatosXPedidos.findAll({
        where: { id_pedido: idPedido },
        include: [{ model: Plato }],
    });

    return platosXPedidos.map(p => ({
        id: p.Plato.id,
        nombre: p.Plato.nombre,
        cantidad: p.cantidad,
    }));
};

const getPedidos = async () => {
    const pedidos = await Pedidos.findAll({ include: [Usuarios] });
    return pedidos;
};

const getPedidoById = async (id) => {
    const pedido = await Pedidos.findOne({
        where: { id },
        include: [{ model: PlatosXPedidos, include: [Plato] }],
    });
    return pedido;
};

const getPedidosByUser  = async (idUsuario) => {
    const pedidos = await Pedidos.findAll({
        where: { id_usuario: idUsuario },
        include: [{ model: PlatosXPedidos, include: [Plato] }],
    });
    return pedidos;
};

const createPedido = async (idUsuario, platos) => {
    const pedido = await Pedidos.create({ id_usuario: idUsuario, fecha: new Date(), estado: 'pendiente' });
    
    for (let plato of platos) {
        await PlatosXPedidos.create({
            id_pedido: pedido.id,
            id_plato: plato.id,
            cantidad: plato.cantidad,
        });
    }
    
    return pedido;
};

const updatePedido = async (id, estado) => {
    const pedido = await Pedidos.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    
    pedido.estado = estado;
    await pedido.save();
    return pedido;
};

const deletePedido = async (id) => {
    const pedido = await Pedidos.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    
    await pedido.destroy();
    return pedido;
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser ,
    createPedido,
    updatePedido,
    deletePedido,
};