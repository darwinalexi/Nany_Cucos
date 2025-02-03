import {check}from"express-validator"

export const validator_login=[
    check('identificacion','Se debe ingresar un valor númerico') .notEmpty().isNumeric(),
    check('clave','se debe ingresar un valor  numerico ') .notEmpty().isNumeric()
]