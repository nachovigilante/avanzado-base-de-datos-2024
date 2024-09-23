import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;


  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }
  try{
    const usuario = await UsuariosService.getUsuarioByEmail(email);
    if (usuario) {
        return res.status(400).json({ message: "Email ya registrado"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await UsuariosService.createUsuario({
        nombre,
        apellido,
        email,
        password: hashedPassword,
    });

    res.json(201).json({ 
        message: "Usuario creado con éxito",
        nuevoUsuario 
    });
} catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error })
}};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }

  const usuario = await UsuariosService.getUsuarioByEmail(email);
  if (!usuario) {
    return res.status(400).json({ message: "Email no registrado" });
  }

  const isValidPassword = await bcrypt.compare(password, usuario.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: usuario.id }, "tu_secreto"/*process.env.SECRET*/, {
    expiresIn: "30m",
  });

  res.json({ token });
};

export default { register, login }