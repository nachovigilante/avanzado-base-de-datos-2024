import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";
import usuariosService from "../services/usuarios.service.js";

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
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({ message : "Token necesario" })
    }
    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        return res.status(400).json({ message: "Formato del token no válido" });
    }

    const token = tokenParts[1]; // Extraer el token real
    const secret="Vamos Racing"
    const comparisson = jwt.verify(token,secret)
    console.log(comparisson)
    console.log("Token",decoded)
    const id = decoded.id;
    if (!id) {
        return res.status(401).json({ message: 'ID de usuario no encontrado en el token' });
    }
    
    const usuario=UsuariosService.getUsuarioById(id)
    if (usuario){
        req.id=id
        next()
    }
    else{
        return res.status(400).json({ message: "ID no válido" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
   const id=req.id
   const usuario=usuariosService.getUsuarioById(id)
   if(usuario.admin==True){
    next()
   }
   else{
    return res.status(403).json({ message: "Unauthorized" })
   }
    
};
