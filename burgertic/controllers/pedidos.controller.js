import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
    try {
        const pedidos = await pedidosService.getPedidos()
        return res.json(pedidos)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver un mensaje de error (status 404)
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const idUser = req.params.idUser
    if (!idUser) return res.status(400).json({ message: "Se necesita un ID" });
    try {
        const pedidos = await pedidosService.getPedidosByUser(idUser)
        if (!pedidos) {
            return res.status(404).json({ message: "No hay pedidos para ese usuario" })
        }
        res.json(pedidos)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const id = req.params.id
    if (!id) return res.status(400).json({ message: "Se necesita un ID" });
    try {
        const pedido = await pedidosService.getPedidoById(id)
        if (!pedido) {
           return res.status(404).json({ message: "Pedido no encontrado" })
        }
        res.json(pedido)
    }
    catch (error) {
       return res.status(500).json({ message: error.message })
    }
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const idUser =req.id
    const platos = req.body.platos
    if (!platos) return res.status(400).json({ message: "El pedido debe tener platos" });

    if (!Array.isArray(platos)){ 
        return res.status(400).json({ message: "Platos debe ser un array" });
    }
    platos.map((plato)=>
    {
        if(!plato['id']|| !plato['cantidad']){
        return res.status(400).json({message:'Platos tiene que tener id y cantidad'})
    }
    })
    
    try {
        await pedidosService.createPedido(idUser,platos);
        return res.status(201).send('Todo Ok')
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }


};

const aceptarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const id = parseInt(req.params.id);

    const pedido = PedidosService.getPedidoById(id);

    if(!pedido){
        return res.status(404).json({message:'No existe un pedido'})
        
    }

    if (pedido.estado !== "aceptado") {
        return res.status(400).json({ message: 'Pedido no aceptado' })
    }
    try {
        await pedidosService.getPedidoById(id);
        return res.status(200).send('Todo Ok')
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

};

const comenzarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
   const id =parseInt(req.params.id)

   const pedido=pedidosService.getPedidoById(id);

   if(!pedido){
       return res.status(404).json({message:'Pedido no existente.'})
   }
   if(pedido.estado !== "aceptado"){
       return res.status(400).json({message:"El pedido no esta aceptado"})
   }
   if(pedido.estado==="aceptado") {
       pedido.estado="en camino"
       return 
   }
   try {
    await pedidosService.updatePedido(id);
    return res.status(200).send('Pedido en camino')
}
catch (err) {
    return res.status(500).json({ message: err.message })
}
};

const entregarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
   const id =parseInt(req.params.id)

   const pedido=pedidosService.getPedidoById(id);

   if(!pedido){
       return res.status(404).json({message:'Pedido no existente.'})
   }
   if(pedido.estado !== "en camino"){
       return res.status(400).json({message:"El pedido no esta en camino"})
   }
   if(pedido.estado==="en camino") {
       pedido.estado="entregado"
       return 
   }
   try {
    await pedidosService.updatePedido(id);
    return res.status(200).send('Pedido entregado')
}
catch (err) {
    return res.status(500).json({ message: err.message })
}
};

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
            const id = parseInt(req.params.id);

            const pedido = PedidosService.getPedidoById(id);
    if (!pedido.id) {
        return res.status(404).json({ message: 'Pedido no existente' })
    }
    try {
        await pedidosService.deletePedido(id);
        return res.status(200).send('Todo Ok')
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
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
