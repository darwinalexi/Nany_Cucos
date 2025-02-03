import {Router} from "express";
import { create_venta, delete_venta, listar_ventas, search_venta, update_venta, number_ventas, price_sales, sales } from "../controller/controller.sale.js";

export const router_venta=Router();

router_venta.get("/ventas", listar_ventas)
router_venta.get("/ventas_mes", number_ventas)
router_venta.get("/ventas_mestotal", price_sales)
router_venta.get("/ventas/:id",search_venta)
router_venta.post("/ventas", create_venta)
router_venta.put("/ventas/:id", update_venta)
router_venta.delete("/ventas/:id", delete_venta)
router_venta.get("/ultimasventas", sales)
