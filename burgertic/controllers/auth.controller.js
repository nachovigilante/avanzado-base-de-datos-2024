import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */

    const usuario = req.body
    if (!usuario.email || !usuario.password || !usuario.nombre || !usuario.apellido) {
        return res.status(400).send('Todos los campos tienen que estar completos')
    }

    try {
        const usuario_email = await usuariosService.getUsuarioByEmail(usuario.email)
        if(usuario_email){
            return res.status(400).json({message: "Ya hay un usuario con ese email"})
        }
        //Genero Hash
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(usuario.password, salt)
        console.log(hash)

        usuario.password = hash;
        console.log(usuario)

        await usuariosService.createUsuario(usuario);

        return res.json({ 
            id: usuario.id,
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            email:usuario.email
         })
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
}
    const login = async (req, res) => {
        // --------------- COMPLETAR ---------------
        /*
    
            Recordar que para cumplir con toda la funcionalidad deben:
    
                1. Verificar que el body de la request tenga el campo email y password
                2. Buscar un usuario con el email recibido
                3. Verificar que el usuario exista
                4. Verificar que la contraseña recibida sea correcta
                5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
                6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
                7. Devolver un json con el usuario y el token (status 200)
                8. Devolver un mensaje de error si algo falló (status 500)
            
        */
       const usuario=req.body;
       
       if(!usuario.email||!usuario.password){
           return res.status(404).json({message:error.message})
       }
       
       try{
            const usuario_db= await usuariosService.getUsuarioByEmail(usuario.email)
            if(!usuario){
                return res.status(400).json({message:"No hay un usuario asociado a ese mail"})
            }
            const password=usuario_db.password
            const secret="Vamos Racing"
            
            const comparison=bcrypt.compareSync(usuario.password,password)
            console.log(comparison)
            if(comparison){
                const token = jwt.sign({ id: usuario_db.id}, secret, { expiresIn: 30 * 60 });
                return res.status(200).json({token:token, usuario:{
                    id: usuario_db.id,
                    nombre:usuario_db.nombre,
                    apellido:usuario_db.apellido,
                    email:usuario_db.email
                }})
            }
            if(!comparison){
                return res.status(400).json({message:"Contraseña incorrecta"})
            }
       }
       catch(err){
          return res.status(500).json({message:err.message})
       }
    }

    const updateAdmin= async(req,res)=>{
        const id=req.params.id

        if(!id){
            res.status(404).json({message:'No hay id'})
        }

        try{
            await usuariosService.updateAdmin(id);

        }
        catch(err){
           return res.status(500).json({message:'Error'})
        }
    }

    export default { register, login,updateAdmin }
