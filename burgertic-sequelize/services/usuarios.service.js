import { raw } from "express";
import { Usuario } from "../models/usuarios.model.js";

const getAllUsuarios = async () => await Usuario.findAll();

/* const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};
 */
const getUsuarioByEmail = async (email) => {
    try {
        console.log("Email recibido en el servicio:", email);
        
        const usuario = await Usuario.findOne({
            where: {
                email: email,
            },
            raw: true,
        });

        console.log("Usuario encontrado:", usuario);
        return usuario;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error.message);
        throw new Error("Error al buscar usuario");
    }
};


/* const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};
 */
const getUsuarioById = async (id) => {
    try {
        console.log("Email recibido en el servicio:", id);
        
        const usuario = await Usuario.findOne({
            where: {
                id: id,
            },
            raw: true,
        });

        console.log("Usuario encontrado:", usuario);
        return usuario;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error.message);
        throw new Error("Error al buscar usuario");
    }
};

/* const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
}; */
const createUsuario = async (usuario) => {
    console.log("Datos recibidos:",usuario);

    if (!usuario) throw new Error("No se encuentran los datos de usuario");

    const existingUser = await Usuario.findOne({
        where: { email: usuario.email },
        raw: true,
    });

    console.log("Resultado de la búsqueda:", existingUser);

    if (existingUser) throw new Error("El correo ya está registrado");

    await Usuario.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        password: usuario.password,
        email: usuario.email,
        admin: usuario.admin,
    });

    console.log("Usuario creado exitosamente");
};





export default { getAllUsuarios,getUsuarioByEmail,getUsuarioById,createUsuario};
