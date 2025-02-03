import {pool}  from "../database/conexion.js"

export const listar_ventas = async(req, res)=>{
    try {
        const  [show]= await pool.query("select*from ventas")
        if (show.length>0) {
            res.status(200).json(show)
        }else{
            res.status(404).json({
                "message":"no se encontro ventas"
            })
        }
    } catch (error) {
        res.status(500).json({
            "message":error
        })
    }
} 

export const create_venta = async (req, res) => {
    try {
        const { nombre_producto, referencia, cantidad, id_cliente, estado, fecha_venta } = req.body;


        const fechaFormateada = new Date(fecha_venta).toISOString().split('T')[0]; 

        // Consulta para verificar la cantidad almacenada
        const [search] = await pool.query(
            "SELECT cantidad_almacenada FROM productos WHERE referencia = ?",
            [referencia]
        );

        if (search.length === 0 || search[0].cantidad_almacenada <= 0) {
            return res.status(206).json({
                "mensaje": "No hay unidades disponibles para vender este producto.",
            });
        }

        const cantidad_almacenada = search[0].cantidad_almacenada;

        // Validar si la cantidad solicitada es mayor a la disponible
        if (cantidad > cantidad_almacenada) {
            return res.status(205).json({
                "mensaje": `No hay suficientes unidades disponibles. Solo hay ${cantidad_almacenada} unidades en el almacén.`,
            });
        }

        // Insertar la venta
        const [create] = await pool.query(
            "INSERT INTO ventas (nombre_producto, referencia, cantidad, id_cliente, estado, fecha_venta) VALUES (?,?, ?, ?, ?,?)",
            [nombre_producto, referencia, cantidad, id_cliente, estado, fechaFormateada]
        );

        if (create.affectedRows === 0) {
            return res.status(404).json({
                "mensaje": "No se pudo registrar la venta.",
            });
        }

        if (estado === "Vendido") {
            // Actualizar la cantidad almacenada si la venta está completada
            const [update] = await pool.query(
                "UPDATE productos SET cantidad_almacenada = cantidad_almacenada - ? WHERE referencia = ?",
                [cantidad, referencia]
            );

            if (create.affectedRows>0 || update.affectedRows> 0) {
                return res.status(200).json({
                   "mensaje": "Se creó la venta Con Exito",
                });
            } else {

                return res.status(210).json({
                    "mensaje": "No se pudo actualizar el inventario.",
                });
    
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Ocurrió un error al procesar la solicitud.",
        });
    }
};


export const update_venta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, referencia,  estado, cantidad } = req.body;

        
        const [update1] = await pool.query(
            "UPDATE ventas SET nombre_producto = ?, referencia = ?, estado = ?  WHERE id = ?",
            [nombre_producto, referencia,  estado, id]
        )             

        if (estado === "Vendido") {
            // Actualizar la cantidad almacenada si la venta está completada
            const [update] = await pool.query(
                "UPDATE productos SET cantidad_almacenada = cantidad_almacenada - ? WHERE referencia = ?",
                [cantidad, referencia]
            );

            if (update1.affectedRows>0 || update.affectedRows> 0) {
                return res.status(200).json({
                    message: "Se Actualizo venta Con Exito",
                });
            } else {

                return res.status(500).json({
                    message: "No se pudo actualizar el inventario.",
                });
    
            }
        } else  if (estado === "Separado") {
            // Actualizar la cantidad almacenada si la venta está completada
            const [update] = await pool.query(
                "UPDATE productos SET cantidad_almacenada = cantidad_almacenada + ? WHERE referencia = ?",
                [cantidad, referencia]
            );

            if (update1.affectedRows>0 || update.affectedRows> 0) {
            
                return res.status(200).json({
                    message: "Se Actualizo la venta Pero quedo Separada los productos",
                });
            } else {

                return res.status(500).json({
                    message: "No se pudo actualizar el inventario.",
                });
    
            }
        } else  if (estado === "Devolutivo") {
        
            const [update] = await pool.query(
                "UPDATE productos SET cantidad_almacenada = cantidad_almacenada + ? WHERE referencia = ?",
                [cantidad, referencia]
            );

            if (update1.affectedRows>0 || update.affectedRows> 0) {
                return res.status(200).json({
                    message: "la venta quedo Con Devolucion",
                });
            } else {

                return res.status(500).json({
                    message: "No se pudo actualizar el inventario.",
                });
    
            }
        }
    
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Hubo un error en el servidor"
        });
    }
};


export const delete_venta= async(req, res)=>{
    try {
        const {id}=req.params;
        const [eliminar]= await pool.query("delete from ventas where id=?",[id]);

        if (eliminar.affectedRows>0) {
            res.status(200).json({
                "message":"Se Elimino Con Exito"
            })
        } else {
            res.status(404).json({
                "message":"No Se Elimino Con Exito"
            })
        }
        
    } catch (e) {
        res.status(500).json({
            "message":e+message
        })
    }
}

export const search_venta= async(req, res)=>{
    try {
        const {id}=req.params;
        const [data]= await pool.query("select * from ventas where id=?",[id]);

        if (data.length>0) {
            res.status(200).json({
                "message":data
            })
        } else {
            res.status(404).json({
                "message":"No Se Encontro Nada"
            })
        }
        
    } catch (e) {
        res.status(500).json({
            "message":e
        })
    }
}

export const  number_ventas = async (req, res) => {
    try {
        // Obtener la fecha actual y restar 1 mes
        const fecha_limite = new Date();
        fecha_limite.setMonth(fecha_limite.getMonth() - 1); // Restar 1 mes
        const fechaLimiteString = fecha_limite.toISOString().split('T')[0]; // Convertirla al formato YYYY-MM-DD
        
        // Realizar la consulta para obtener las ventas que se han hecho desde la fecha límite
        const [numero_ventas] = await pool.query(
            `
            SELECT COUNT(*) FROM ventas v WHERE v.fecha_venta >=? and estado='Vendido'
            `,
            [fechaLimiteString]
          );

        if (numero_ventas.length > 0) {
            
            res.status(200).json(numero_ventas);
        } else {
            res.status(404).json({
                message: "No se encontraron ventas en el último mes."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las ventas.",
            error: error.message
        });
    }
};

export const price_sales = async (req, res) => {
    try {
        
        const fecha_limite = new Date();
        fecha_limite.setMonth(fecha_limite.getMonth() - 1);
        const fechaLimiteString = fecha_limite.toISOString().split('T')[0]; // Convertir al formato YYYY-MM-DD

        
        const [resultado] = await pool.query(`
            SELECT 
                SUM(p.precio_venta * v.cantidad) AS valor_total_ventas
            FROM productos p
            INNER JOIN ventas v ON p.referencia = v.referencia
            WHERE v.fecha_venta >=?  and v.estado='Vendido'
        `, [fechaLimiteString]);

        if (resultado.length > 0 && resultado[0].valor_total_ventas) {
            res.status(200).json({
                valor_total_ventas: parseFloat(resultado[0].valor_total_ventas)
            });
        } else {
            res.status(404).json({
                mensaje: "No se encontraron ventas en el último mes."
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Hubo un error al calcular el valor total de las ventas.",
            error: error.message
        });
    }
};







export const sales = async (req, res) => {
    try {
        // Obtener la fecha actual y restar 1 mes
        const fecha_limite = new Date();
        fecha_limite.setMonth(fecha_limite.getMonth() - 1); // Restar 1 mes
        const fechaLimiteString = fecha_limite.toISOString().split('T')[0]; // Convertirla al formato YYYY-MM-DD
        
        // Realizar la consulta para obtener las ventas que se han hecho desde la fecha límite
        const [numero_ventas] = await pool.query(
            `
            SELECT * FROM ventas v WHERE v.fecha_venta >=? and estado='Vendido'
            `,
            [fechaLimiteString]
          );

        if (numero_ventas.length > 0) {
            res.status(200).json(numero_ventas);
        } else {
            res.status(404).json({
                message: "No se encontraron ventas en el último mes."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error al obtener las ventas.",
            error: error.message
        });
    }
};