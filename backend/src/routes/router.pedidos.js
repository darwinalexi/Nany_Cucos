import { Router } from "express";
import { create_pedidos, show_pedidos, search, update_pedidos, contarperdidos, valor_vendido, borrar_pedido,contarperdidosvendidos } from "../controller/controller.pedidos.js";

export const router_pedidos= Router();

router_pedidos.post("/pedidos", create_pedidos)
router_pedidos.get("/pedidos", show_pedidos)
router_pedidos.get("/pedidos/:id", search)
router_pedidos.put("/pedidos/:id", update_pedidos)
router_pedidos.get("/contarpedidos", contarperdidos)
router_pedidos.get("/contarpedidosvendidos", contarperdidosvendidos)

router_pedidos.delete("/pedidos/:id", borrar_pedido)
router_pedidos.get("/vendido", valor_vendido)
