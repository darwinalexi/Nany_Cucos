import {pool} from "../database/conexion.js";

export const Show_client = async(req, res)=>{
    try{
      const [show_client]= await pool.query("select*from clientes");
      if(show_client.length>0){
        res.status(200).json(show_client)
      }else{
        res.status(404).json({
            "Mensajes":"No Hay Registros"
        })
      }
    }catch(e){
        if(e){
            res.status(500).json({
                "error":message+e
            })
        }
    }
}


export const delete_cliente= async(req, res)=>{
    try{
       const {identificacion}= req.params;
       const [borrar]= await pool.query("delete from clientes where identificacion=?",[identificacion])
       if (borrar.affectedRows>0) {
        res.status(200).json({
            "mensaje":"se Borro El Registro del Cliente"
        })
       } else {
        res.status(404).json({
            "mensaje":"No se Borro El Registro"
        })
       }
    }catch(error){
        res.status(500).json({
            "error":error.message
        })
    }
}

export const create_cliente= async(req, res)=>{
    try{
       const {identificacion, nombre, numero_celular, correo}= req.body;
       
       const [verify]= await pool.query("select*from clientes where identificacion =?",[identificacion])

       if(verify.length>0){
            return res.status(404).json({
                "message":"no se puede crear porque ya esta un cliente con esa identificacion"
            })
       }else{
            const [create]= await pool.query("insert into clientes(identificacion, nombre, numero_celular, correo)values(?,?,?,?) ",[identificacion, nombre, numero_celular, correo])
            if (create.affectedRows>0) {
            return res.status(200).json({
                "mensaje":"se Creo El Registro del Cliente"
            })
            } else {
            return res.status(404).json({
                "mensaje":"No se Creo El Registro"
            })
            }
       }
    }catch(error){
        res.status(500).json({
            "error":error.message
        })
    }
}

export const update_cliente= async(req, res)=>{
    try{
        const {identificacion}= req.params;
       const {nombre, numero_celular, correo}= req.body;
       const [borrar]= await pool.query("update clientes set nombre=?, numero_celular=?,correo=? where identificacion=?",[nombre, numero_celular, correo, identificacion])
       if (borrar.affectedRows>0) {
        res.status(200).json({
            "mensaje":"se Actualizo El Registro del Cliente"
        })
       } else {
        res.status(404).json({
            "mensaje":"No se Actualizo El Registro"
        })
       }
    }catch(error){
        res.status(500).json({
            "error":error.message
        })
    }
}


export const count_client=async(req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM clientes");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron clientes"});
        } else {
            res.status(200).json( resultado[0].total );
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}