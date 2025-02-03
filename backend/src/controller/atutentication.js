import Jwt from "jsonwebtoken"
import { pool } from "../database/conexion.js";
import {compare} from"../controller/encripter.js"

export const login = async (req, res) => {
    try {
        const { identificacion, clave } = req.body;


        const [consulta] = await pool.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);

     
        if (consulta.length === 0) {
            return res.status(404).json({
                "mensaje": "Usuario No Encontrado"
            });
        }

        const user = consulta[0];

        const passwordencrypter = await compare(clave, user.clave);

    
        if (!passwordencrypter) {
            return res.status(404).json({
                "mensaje": "Credenciales incorrectas"
            });
        }

        const token = Jwt.sign({ id: user.identificacion }, process.env.AUTO_SECRET, { expiresIn: process.env.AUTO_EXPIRE });
        return res.status(200).json({
            "usuario": user,
            "token": token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "mensaje": error.message 
        });
    }
};

export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(404).json({
                "mensaje": "El token es requerido"
            })
        } else {
            Jwt.verify(token,process.env.AUTO_SECRET, (error) => {
                if (error) {
                    return res.status(404).json({
                        "mensaje": "Token incorrecto"
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}