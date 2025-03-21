import { pool } from "../database/conexion.js";
import multer from "multer";
import { encrypter } from "./encripter.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("origen:public/img")
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        console.log("nombre archivo", file.originalname)
        cb(null, file.originalname);
    }

});

const upload = multer({ storage: storage });

export const cargarImagen = (req, res, next) => {
    console.log("Procesando la imagen...");
    upload.single('imagen')(req, res, (err) => {
        if (err) {
            console.error("Error al cargar la imagen:", err);
            return res.status(500).json({ mensaje: "Error al procesar la imagen" });
        }

        next(); 
    });
};


export const register_user = async (req, res) => {
    try {
        const { identificacion, nombre, clave, tipo, correo, celular, descripcion} = req.body;

        const [revisar]= await pool.query("select*from usuarios where identificacion=?",[identificacion])

        if(revisar.length>0){
            res.status(201).json({
               "mensaje":"no se puede crear el usuario porque esta identificacion ya esta en nuestra base de datos"
            })
         return;
       }


        const imagen= req.file.originalname; // Ahora seguro que req.file existe
        const contraseña =  await encrypter(clave);
        const [register] = await pool.query( "insert into  usuarios (identificacion,nombre,clave,imagen,tipo, correo, celular, descripcion)values(?,?,?,?,?,?,?,?)",[identificacion,nombre,contraseña,imagen, tipo, correo, celular, descripcion]);
          

        if (register.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Se registró el usuario"
            });
        } else {
            res.status(400).json({
                "mensaje": "No se pudo registrar el usuario"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "mensaje": error.message
        });
    }
};


export const show_user= async(req, res)=>{
    try {
        const {identificacion}= req.params; 
        const [listar]= await pool.query("select * from usuarios where identificacion=?",[identificacion])

        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"no hay registros "
            })
       
        }

    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const update_user = async (req, res) => {
    try {
        const { identificacion } = req.params;
        const { nombre, correo, celular, descripcion, clave } = req.body;
       
        let imagen;

        
        if (req.file) {
            imagen = req.file.originalname; // Asigna el nombre del archivo si se subió
        }

        const [oldUser] = await pool.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);

        
        if (!oldUser.length) {
            return res.status(204).json({ mensaje: "Usuario no encontrado" });
        }

        
        const contraseña = clave ? await encrypter(clave) : null;

        // Asignar valores finales, usando los valores existentes si no se proporcionan nuevos
        const nombreFinal = nombre || oldUser[0].nombre;
        const correoFinal = correo || oldUser[0].correo;
        const celularFinal = celular || oldUser[0].celular;
        const claveFinal = contraseña || oldUser[0].clave;
        const imagenFinal = imagen || oldUser[0].imagen;
        const descripcionFinal = descripcion || oldUser[0].descripcion;

        // Ejecutar la consulta de actualización
        const [actualizar] = await pool.query(
            "UPDATE usuarios SET nombre = ?, correo = ?, celular = ?, clave = ?, imagen = ?, descripcion=? WHERE identificacion = ?",
            [nombreFinal, correoFinal, celularFinal, claveFinal, imagenFinal, descripcionFinal,  identificacion]
        );

        // Verificar si la actualización fue exitosa
        if (actualizar.affectedRows > 0) {
            return res.status(200).json({ mensaje: "El usuario se actualizó correctamente" });
        } else {
            return res.status(404).json({ mensaje: "No se pudo actualizar el usuario" });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};


export const  delete_user= async(req, res)=>{
    
    try {
        const {identificacion}= req.params;
        const [borrar]  = await pool.query("delete from usuarios where identificacion=?",[identificacion])

        if (borrar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se borro el usuario con el id"+identificacion
            })
        }else{
            res.status(404).json({
                "mensaje":"no se borro el usuario con el id"+identificacion
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export  const show= async(req, res)=>{
    try{
    const [show]= await pool.query("select * from usuarios where tipo='Administrado(a)r'")
        if (show.length>0) {
            res.status(200).json(show)
        }else{
            res.status(404).json({
                "mensaje":"no hay usuarios"
            })
        }
    }catch(e){
        res.status(500).json({
            "mensaje":e.message
        })
    }
}


export const count_user=async(req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM  usuarios   where tipo='Administrado(a)r'");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron usuarios"});
        } else {
            res.status(200).json( resultado[0].total );
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}