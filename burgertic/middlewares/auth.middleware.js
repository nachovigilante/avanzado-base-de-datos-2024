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
    const step1 = req.headers['authorization'];
    if(!authorization){
        return res.status(401).json({ error: 'No hay token'})
    }

    const step2 = authorization.split(' ')[1];
    if (!token || authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verifiedToken.id;
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    if (!req.userId) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    next();

};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */

    try{
        const usuario = await UsuariosService.getUsuarioById(req.userId);
        if (!usuario || usuario.rol != 'admin'){
            return res.status(403).json({ error: 'No tiene permisos para realizar esta acción'});
        }
    } catch (error){
        return res.status(403).json({error: 'No sos administrador para realizar esta acción'})
    }

    next();
};
