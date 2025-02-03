import { pool } from "../database/conexion.js";


export const show_products = async(req,res)=>{
    try {

        const [consulta]= await pool.query("select*from productos where estado='Disponible'; ")

        if (consulta.length >0) {
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"no hay productos registrados"
            })

        }
        
    } catch (error) {   
        console.log(error)
        res.status(500).json({
            "mensaje" : error
            })
    }
}

export const register_product =  async(req, res)=>{
    try {
        const {nombre, referencia, precio_por_mayor, observaciones, id_usuario, estado, fecha_ingreso, precio_venta,   cantidad_almacenada }= req.body
        const cantidad_vendida= 0;
        const cantidad_separada=0;

        const [search] = await pool.query("select referencia from productos where referencia=?",[referencia]);
        if(search.length>0){
            res.status(405).json({
                message: "La referencia ya esta registrada y no se puede tener las mismas referencias"
            })
        }
        
        const fechaFormateada = new Date(fecha_ingreso).toISOString().split('T')[0]; 
        const [consulta] = await pool.query(
            "INSERT INTO productos(nombre, referencia, precio_por_mayor, observaciones, id_usuario,  estado, fecha_ingreso, precio_venta, cantidad_vendida, unidades_separadas, cantidad_almacenada) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [nombre, referencia, precio_por_mayor, observaciones, id_usuario, estado, fechaFormateada, precio_venta, cantidad_vendida, cantidad_separada, cantidad_almacenada]);




        if (consulta.affectedRows >0) {
            res.status(200).json({
                "mensaje":"se registro extosamente el producto"
            })
        }else{
            res.status(404)({
                "mensaje":"no se hizo el registro"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "menaje":error
        })
    }
}

export const delete_products = async(req,res)=>{

    try {
        const { id } = req.params;
        const [ borrar ]= await pool.query("delete from productos where id= ?", [id]);


        if (borrar.affectedRows >0 ) {
            
            res.status(200).json({
                "mensaje":"se elimino con exito"
            })
        } else {
            res.status(404).json({
                "mensaje":"fue imposible eliminar este producto"
            })
        }
    } catch (error) {
        res.status(500).json({
            "menaje":"algo salio mal"
        })
    }
}

export const update_products = async (req, res) => {
    try {
        const { id } = req.params;
        const {nombre, referencia, precio_por_mayor, observaciones, id_usuario, estado, fecha_ingreso, precio_venta, cantidad_vendida, cantidad_separada, cantidad_almacenada }= req.body

        
        const fechaFormateada = new Date(fecha_ingreso).toISOString().split('T')[0]; 

        const [consulta] = await pool.query(
            "update  productos set nombre=?, referencia=?, precio_por_mayor=?, observaciones=?, id_usuario=?,  estado=?, fecha_ingreso=?, precio_venta=?, cantidad_vendida=?, unidades_separadas=?, cantidad_almacenada=?  where id=?",
        [nombre, referencia, precio_por_mayor, observaciones, id_usuario, estado, fechaFormateada, precio_venta, cantidad_vendida, cantidad_separada, cantidad_almacenada, id]);

        if (consulta.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El producto ha sido actualizado"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el producto, es posible que el ID no exista"
            });
        }

    } catch (error) {
        
        res.status(500).json({
            "mensaje vionico": error,
        });
    }
};

export  const show_for_id_products = async(req, res)=>{

   try {
    const {id}=req.params;
    const [consulta] = await pool.query("select*from productos where id=?", [id])

    if (consulta.length>0) {
        res.status(200).json(consulta)
    } else {
      res.status(404).json({
        "mensaje":"no se encontro un producto con este id"
      })  
    }
   } catch (error) {
    res.status(500).json({
        "mensaje":"algo corrio delideradamente"
    })
   }
}

export const show_product_available = async (req, res) => {
    try {
        // Obtener productos disponibles
        const [consulta] = await pool.query("SELECT * FROM productos WHERE estado = 'Disponible'");

        // Filtrar productos con cantidad_almacenada igual a 0
        const productosAgotados = consulta.filter(producto => producto.cantidad_almacenada === 0);
        
        // Si hay productos agotados, cambiar su estado a "Agotado"
        if (productosAgotados.length > 0) {
            // Actualizar productos agotados
            for (let producto of productosAgotados) {
                await pool.query("UPDATE productos SET estado = 'No Disponible' WHERE id = ?", [producto.id]);
            }
            console.log('Productos agotados actualizados');
        }

        // Devolver los productos disponibles (que no están agotados)
        const productosDisponibles = consulta.filter(producto => producto.cantidad_almacenada > 0);

        if (productosDisponibles.length > 0) {
            res.status(200).json(productosDisponibles);
        } else {
            res.status(404).json({
                "mensaje": "No hay productos disponibles",
                "error": consulta
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "mensaje": error.message
        });
    }
};


export const  show_product_not_available= async(req, res)=>{
    try {
        
       const [consulta]= await pool.query("select*from productos where estado='No Disponible'")

        if (consulta.length>0) {
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal o posiblemente no hay Productos No Disponibles"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const  show_vendios= async(req, res)=>{
    try {        
       const [consulta]= await pool.query("select*from productos where estado='Vendido'")
        if (consulta.length>0) {
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal o posiblemente no hay Productos Vendidos"

            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const contarproductos = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM  productos");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron usuarios" });
        } else {
            res.status(200).json(resultado[0].total );
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export const contarproductosavalible = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM productos where estado='Disponible'");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron productos disponibles" });
        } else {
            res.status(200).json(resultado[0].total );
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export const contarproductonotsavalible = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM productos where estado='No Disponible'");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron productos en estado No Disponibles" });
        } else {
            res.status(200).json( resultado[0].total);
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export const contarproductosvendidos = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM productos where estado='Vendido'");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron productos Vendidos" });
        } else {
            res.status(200).json( resultado[0].total );
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

export const contarvalorinvertido=async(req, res)=>{
    try {

        const [consultar]= await pool.query( "SELECT FORMAT(SUM(cantidad_almacenada * precio_venta), 3) AS total_invertido FROM productos WHERE estado IN ('Disponible', 'Pendiente')")
        //const [consultar]=await pool.query("SELECT SUM(CAST(precio AS DECIMAL(10, 3))) AS total_precio FROM productos where estado in('Disponible','Pendiente')")

        if (consultar.length>0) {
            res.status(200).json(consultar)
        } else {
            res.status(404).json({
                "mensaje":"algo paila"
            })
        }
    } catch (error) {
        res.status(500).json({
            "valor":error
        })
    }
}

export const estadsisticasultimomes = async (req, res) => {
    try {
        const [consultar] = await pool.query(`
            SELECT 
                COUNT(*) AS cantidad_disponibles,
                SUM(CAST(REPLACE(precio_por_mayor, '.', '') AS UNSIGNED) * cantidad_almacenada) AS precio_total_invertido
            FROM productos
            WHERE estado = 'Disponible';
        `);

        if (consultar.length > 0 && consultar[0].cantidad_disponibles > 0) {
            res.status(200).json({
                cantidad_disponibles: consultar[0].cantidad_disponibles,
                precio_total_invertido: consultar[0].precio_total_invertido ? parseFloat(consultar[0].precio_total_invertido) : 0
            });
        } else {
            res.status(404).json({
                mensaje: "No se encontraron productos en estado 'Disponible'"
            });
        }
    } catch (error) {
        res.status(500).json({
            valor: error.message
        });
    }
};

