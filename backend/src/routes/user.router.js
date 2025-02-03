import { Router } from "express";
import { delete_user, register_user, show_user, update_user, show, count_user } from "../controller/user.controller.js";
import { cargarImagen } from "../controller/user.controller.js";

export const router_of_user = Router();

router_of_user.post("/crear", cargarImagen,register_user)
router_of_user.get("/listar_usuarios", show)
router_of_user.get("/contarusuarios", count_user)
router_of_user.get("/usuario/:identificacion", show_user)
router_of_user.put("/actualizar/:identificacion", cargarImagen, update_user)
router_of_user.delete("/eliminar_usuario/:identificacion", delete_user);
