import {Router} from "express";
import { count_client, create_cliente, delete_cliente, Show_client, update_cliente } from "../controller/client.contrloler.js";

export const router_client= Router();

router_client.get("/cliente", Show_client)
router_client.get("/contarclientes",count_client);
router_client.post("/cliente", create_cliente)
router_client.put("/cliente/:identificacion", update_cliente)
router_client.delete("/cliente/:identificacion", delete_cliente);
