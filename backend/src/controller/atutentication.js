import Jwt from "jsonwebtoken"
import { pool } from "../database/conexion.js";
import { Resend } from 'resend';
import {compare, encrypter} from"../controller/encripter.js"
import crypto from "crypto";

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

export const recuperar_password = async (req, res) => {
    try {
        const { identificacion } = req.body;
        const [consulta] = await pool.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);

        if (consulta.length === 0) {
            return res.status(204).json({ mensaje: "Usuario no encontrado" });
        }
        const user = consulta[0];

        if (!user.correo) {
            return res.status(202).json({ mensaje: "El usuario no tiene un correo registrado." });
        }

        // Genera codigp de recuperación
        const resetCode = crypto.randomInt(100000, 999999);

        const [actualizar] = await pool.query(
            "UPDATE usuarios SET codigo_verificacion = ?, fecha_expiracion = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE identificacion = ?", 
            [resetCode, identificacion]
        );

        if (actualizar.affectedRows > 0) {
            // Inicializar Resend
            const resend = new Resend(process.env.RESEND_API);
            const { error } = await resend.emails.send({
                from: "Soporte <notreplay@example.com>",
                to: user.correo.trim(),
                subject: "Recuperación de Contraseña",
                html: `
                    <h1>Hola ${user.nombre},</h1>
                    <h2>Somos Nany Cuco´s</h2>
                    <p>Te Hemos enviado este correo porque has solicitado una restauracion de contraseña en caso de que no seas el destinatario te sugerimos ignorar este mensaje</p> 
                    <p>Tu Código de Verificación es: <strong>${resetCode}</strong></p>
                    <p>Este código expirará en 1 hora.</p>
                `,
            });

            if (error) {
                console.log("Error al enviar el correo:", error);
                return res.status(500).json({ mensaje: "Error al enviar el correo", error });
            }

            return res.status(200).json({ mensaje: `Se envio un correo con un codigo de verificacion a ${user.correo}` });
        } else {
            return res.status(500).json({ mensaje: "No se pudo actualizar el código de verificación" });
        }

    } catch (e) {
        console.error("Error en recuperar_password:", e);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};


export const change_password= async(req, res)=>{
    try {
        const {codigo, nueva_clave}=req.body;
        const [see]= await pool.query("select*from usuarios where codigo_verificacion=?",[codigo])

        if(see.length>0){
         const user= see[0]

        const now = new Date();
        if (new Date(user.fecha_expiracion) < now) {
            return res.status(204).json({ mensaje: "El código de verificación ha caducado por favor genere otro codigo" });
        }
        const password_encrypter= await encrypter(nueva_clave)
            const [update_password]= await pool.query("update usuarios set clave=? where codigo_verificacion=?",[password_encrypter, codigo])

            if (update_password.affectedRows>0) {
                return res.status(200).json({ mensaje: "Has Recuperado la clave" });
            } else {
                return res.status(210).json({ mensaje: "No se pudo recuperar la clave" });                
            }

        }else{
            return res.status(400).json({ mensaje: "El codigo es incorecto" });
        }

    } catch (error) {
           return res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
}