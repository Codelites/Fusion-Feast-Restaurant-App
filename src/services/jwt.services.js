import jwt from "jsonwebtoken"
import config from "../config/main.config.js"


export const jwtsign =  (body)=>{
    
    const token = jwt.sign({body},config.services.jwt_secret, { expiresIn: "54h" })
    return token
}



const signJwt = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  };
  
  export const jwtlogout = async () => {
    try {
      const token = await signJwt({}, config.services.jwt_secret, { expiresIn: "1m" });
      return token;
    } catch (error) {
      throw error;
    }
  };
  