import { Pedido } from "../models/pedidos.model.js";
import { Plato } from "../models/platos.model.js";
import { PlatoxPedido } from "../models/pedidoXplatos.model.js";


/* const getPlatosByPedido = async (idPedido) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos_platos WHERE id_pedido = $1",
            [idPedido]
        );

        if (rows.length < 1) throw new Error("Pedido no encontrado");

        const result = await Promise.all(
            rows.map(async (plato) => {
                const { rows } = await client.query(
                    "SELECT * FROM platos WHERE id = $1",
                    [plato.id_plato]
                );

                if (rows.length < 1) throw new Error("Plato no encontrado");

                return {
                    ...rows[0],
                    cantidad: plato.cantidad,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
}; */


/* const getPedidos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query("SELECT * FROM pedidos");

        if (rows.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};
 */
const getPedidos = async() =>{ await Pedido.findAll();}


/* const getPedidoById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos WHERE id = $1",
            [id]
        );

        if (rows.length < 1) return null;

        const result = rows[0];

        result.platos = await getPlatosByPedido(id);

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
}; */

const getPedidoById= async (id)=> {
 const rta= await Pedido.findOne({
     where:{
         id:id,
     },
     
 })
 return rta; };

/* const getPedidosByUser = async (idUsuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos WHERE id_usuario = $1",
            [idUsuario]
        );

        if (rows.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};
 */

const getPedidosByUser=  async(idUsuario) => 
await Pedido.findAll({
    where:{
        id_usuario:idUsuario,
    },
});

/* const createPedido = async (idUsuario, platos) => {
    const client = new Client(config);
    await client.connect();

    try {
        // ACÁ SE PODRÍA HACER EN ETAPAS
        // 1. Validar que los platos existan
        // 2. Crear el pedido
        // 3. Agregar los platos al pedido

        // Así, no hace falta introducir el concepto de transacciones o rollback

        const { rows } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        );

        const idPedido = rows[0].id;

        for (let plato of platos) {
            const { rows } = await client.query(
                "SELECT * FROM platos WHERE id = $1",
                [plato.id]
            );

            if (rows.length < 1) {
                await client.query("DELETE FROM pedidos WHERE id = $1", [
                    idPedido,
                ]);
                await client.query(
                    "DELETE FROM pedidos_platos WHERE id_pedido = $1",
                    [idPedido]
                );
                throw new Error("Plato no encontrado");
            }

            await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            );
        }

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};
 */

const createPedido = async (idUsuario , platos) => {
    try {
        const nuevoPedido = await Pedido.create({
            id_usuario: idUsuario,
            fecha: new Date(),
            estado: 'pendiente',
        });
        console.log(idUsuario)

        const idPedido = nuevoPedido.id;

        for (let plato of platos) {
            const platoExistente = await Plato.findOne({
                where: { nombre: plato.nombre },
            });

            if (!platoExistente) {
                throw new Error(`Plato con nombre ${plato.nombre} no encontrado`);
            }

            await PlatoxPedido.create({
                id_pedido: idPedido,
                id_plato: platoExistente.id,
                cantidad: plato.cantidad,
            });
        }

        return nuevoPedido;
    } catch (error) {
        console.error("Error al crear el pedido:", error.message);
        throw error;
    }
};




/* const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2",
            [estado, id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
}; */
const updatePedido = async (id,estado) => {
    
    if(estado !=="aceptado"&&
        estado!=="en camino"&&
        estado!=="entregado"
    ) throw new Error("El pedido no esta en un estado correcto")
    const pedido = await Pedido.findByPk(id);

    if(!pedido) throw new Error ("Pedido no encontrado");
    
    pedido.fecha =  new Date(),
    pedido.estado = estado

    await pedido.save();

    return pedido;
}
/* const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM pedidos WHERE id = $1",
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
}; */

const deletePedido= async (id) =>{
const pedido = await Pedido.findByPk(id);

if(!pedido){
    throw new Error ("Pedido no encontrado");
}

await pedido.destroy();

}
export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
