import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
    const token =res.body.token
    /* FALTA VERIFICAR FORMATO DEL TOKEN */

    const secret="Vamos Racing"
    jwt.verify(token,secret, (err,decoded))
    if (err){
        return res.status(400).json({ message: "Token no válido" });
    }
    const id=decoded
    
    usuario=UsuariosService.getUsuarioById(id)
    if (usuario){
        next()
    }
    else{
        return res.status(400).json({ message: "ID inválido" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
};
