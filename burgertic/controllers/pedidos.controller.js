import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) =>  {
const pedidos = await PedidosService.getPedidos();
res.json(pedidos);
};

const getPedidosByUser = async (req, res) => {
    const idUsuario = req.userId;
    const pedidos = await PedidosService.getPedidosByUser(idUsuario);
    res.json(pedidos);
};

const getPedidoById = async (req, res) => {
    const idPedido = req.params.id;
    const pedido = await PedidosService.getPedidoById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedido);
};

const createPedido = async (req, res) => {
    const idUsuario = req.userId;
    const platos = req.body.platos;
    const pedido = await PedidosService.createPedido(idUsuario, platos);
    res.json({ message: "Pedido creado con éxito" });
};

const aceptarPedido = async (req, res) => {
    const idPedido = req.params.id;
    const pedido = await PedidosService.getPedidoById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    await PedidosService.updatePedido(idPedido, "aceptado");
    res.json({ message: "Pedido aceptado con éxito" });
};

const comenzarPedido = async (req, res) => {
    const idPedido = req.params.id;
    const pedido = await PedidosService.getPedidoById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    await PedidosService.updatePedido(idPedido, "en camino");
    res.json({ message: "Pedido en camino con éxito" });
};

const entregarPedido = async (req, res) => {
    const idPedido = req.params.id;
  const pedido = await PedidosService.getPedidoById(idPedido);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }
  await PedidosService.updatePedido(idPedido, "entregado");
  res.json({ message: "Pedido entregado con éxito" });
};

const deletePedido = async (req, res) => {
    const idPedido = req.params.id;
    const pedido = await PedidosService.getPedidoById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    await PedidosService.deletePedido(idPedido);
    res.json({ message: "Pedido eliminado con éxito" });
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};