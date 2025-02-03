import { Router } from "express";
import { login } from "../controller/atutentication.js";

export const rutaaut= Router();
rutaaut.post("/login", login)