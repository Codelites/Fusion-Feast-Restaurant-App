import jwt from "jsonwebtoken"
import config from "../config/main.config.js"


export const jwtsign =  (body)=>{
    
    const token = jwt.sign({body},config.services.jwt_secret, { expiresIn: "54h" })
    return token
}