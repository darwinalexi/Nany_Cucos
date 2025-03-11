import { Router } from "express";
import { login, recuperar_password, change_password } from "../controller/atutentication.js";

export const rutaaut= Router();
rutaaut.post("/login", login)
rutaaut.post("/recuperar", recuperar_password)
rutaaut.put("/recuperar", change_password)