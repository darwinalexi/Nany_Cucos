import { pool } from "../database/conexion.js";

export const create_pedidos= async(req, res)=>{
    try {
        
        const {nombre_producto, referencia, fecha_pedido, observaciones, celular, persona, estado, usuario, cantidad}= req.body;

        const fechaFormateada = new Date(fecha_pedido).toISOString().split('T')[0]; 


        const [crear]= await pool.query("insert into pedidos (nombre_producto, referencia, observaciones, celular, nombre_persona, estado, usuario, cantidad, fecha_pedido)values(?,?,?,?,?,?,?,?,?)",[nombre_producto,referencia,observaciones,celular,persona,estado,usuario, cantidad,fechaFormateada])
    if (crear.affectedRows>0) {
        res.status(200).json({
            "mensaje":" se creo el pedido con exito"
        })
    } else {
      res.status(404).json({
        "mensaje":"no se pudo crear el pedido"
      })  
    }
    } catch (error) {
        console.log("error", error)
        res.status(500).json(error.message)
    }
}


export const show_pedidos = async(req, res)=>{
try {
    const [listar]= await pool.query("select*from pedidos");
    if (listar.length>0) {
        res.status(200).json(listar)
    } else {
        res.status(404).json({
            "mensaje":"no hay registros"
        })
    }
} catch (error) {
    res.status(500),json(error.message)
}
}
export const search = async(req, res)=>{
    try {       
        const {id}= req.params;
        const [search]= await pool.query("select*from pedidos where id=?",[id]) ;
        if(search.length){
            res.status(200).json(search)
        }else{
        res.status(404).json({
            "mensaje":"no se encontro un pedido con ese id"
        })
        }
    
    } catch (error) {
        console.log(error)        
    }
} 


export const update_pedidos = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { nombre_producto, referencia, fecha_pedido, observaciones, celular, persona, estado, usuario, precio,cantidad } = req.body;

        const [seracholder] = await pool.query("SELECT * FROM pedidos WHERE id = ?", [id]);

        if (seracholder.length === 0) {
            return res.status(204).json({ "mensaje": "El pedido no existe" });
        }

        const nombreProductoFinal = nombre_producto || seracholder[0].nombre_producto;
        const referenciaFinal = referencia || seracholder[0].referencia;
        const fechaPedidoFinal = fecha_pedido || seracholder[0].fecha_pedido;
        const observacionesFinal = observaciones || seracholder[0].observaciones;
        const celularFinal = celular || seracholder[0].celular;
        const personaFinal = persona || seracholder[0].nombre_persona;
        const estadoFinal = estado || seracholder[0].estado;
        const usuarioFinal = usuario || seracholder[0].usuario;
        const precioFinal = precio || seracholder[0].precio;
        const cantidadFinal = cantidad || seracholder[0].cantidad;

        // Ejecutar la consulta de actualización
        const [actualizar] = await pool.query(
            "UPDATE pedidos SET nombre_producto = ?, referencia = ?, observaciones = ?, celular = ?, nombre_persona = ?, estado = ?, usuario = ?, fecha_pedido = ?, cantidad=?, precio = ? WHERE id = ?",
            [
                nombreProductoFinal,
                referenciaFinal,
                observacionesFinal,
                celularFinal,
                personaFinal,
                estadoFinal,
                usuarioFinal,
                fechaPedidoFinal,
                cantidadFinal,
                precioFinal,
                id
            ]
        );
        if (actualizar.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Se actualizó el pedido con éxito"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el pedido"
            });
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

export const borrar_pedido=async(req, res)=>{
    try {
        const {id} = req.params;
        const [order]= await  pool.query("delete from pedidos where id=?",[id]);
        if (order.affectedRows>0) {
            res.status(200).json({
            "mensaje":"se elimino exitosamente el pedido"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se elimino el pedido"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const valor_vendido = async (req, res) => {
    try {
        const [listar] = await pool.query(
            "SELECT SUM(precio * cantidad) AS total_ventas FROM pedidos WHERE estado='Vendido' AND fecha_pedido >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)"
        );

        if (listar.length > 0 && listar[0].total_ventas !== null) {
            res.status(200).json({ total_ventas: listar[0].total_ventas });
        } else {
            res.status(404).json({ mensaje: "No hay ventas en el último mes" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const contarperdidos = async (req, res) => {
    try {
        const [resultado] = await pool.query(" SELECT COUNT(*) as total FROM pedidos where estado='Por Entregar' ");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron pedidos por entregar" });
        } else {
            res.status(200).json(resultado[0].total);
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export const contarperdidosvendidos = async (req, res) => {
    try {
        const [resultado] = await pool.query(
            "SELECT COUNT(*) AS total_pedidos_vendidos FROM pedidos WHERE estado='Vendido'"
        );
        if (resultado[0].total_pedidos_vendidos === 0) {
            res.status(404).json({ mensaje: "No se encontraron pedidos vendidos" });
        } else {
            res.status(200).json({ total_pedidos_vendidos: resultado[0].total_pedidos_vendidos });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

