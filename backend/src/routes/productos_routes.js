import {Router} from 'express'
import { contarproductonotsavalible, estadsisticasultimomes, contarproductosavalible, contarproductosvendidos, contarvalorinvertido, delete_products, register_product, show_for_id_products, show_product_available, show_product_not_available, show_products, show_vendios, update_products} from '../controller/productos_controller.js'

 const router= Router()

router.get("/productos", show_products)
router.post("/productos", register_product)
router.put("/productos/:id", update_products)
router.delete("/productos/:id", delete_products)
router.get("/productos/:id", show_for_id_products)
router.get("/productos_disponibles", show_product_available)
router.get("/productos_no_disponibles", show_product_not_available)
router.get("/productos_vendidos", show_vendios)
router.get("/contarpdisponibles", contarproductosavalible)
router.get("/contar_no_disponibles",contarproductonotsavalible )
router.get("/contar_productpos_vendidos", contarproductosvendidos)
router.get("/contarvalorinvertido", contarvalorinvertido)
//sirven los controllers que estan hacia arriba 
router.get("/estadisticasmes", estadsisticasultimomes)
export default router;