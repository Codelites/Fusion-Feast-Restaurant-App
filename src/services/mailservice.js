import { error } from "console";
import config from "../config/main.config.js";
import nodemailer from "nodemailer"
import path from "path";
import ejs from "ejs"
import fs from "fs"


 export const transporter = nodemailer.createTransport({
    host: config.mailServices.host,
    port: config.mailServices.port,

    auth: {
      user: config.mailServices.auth.user,
      pass: config.mailServices.auth.pass
    }
  });


transporter.verify((error,success) =>{

    if(error) {
        console.log(error)
    }else{
        console.log("Mail server is running......")
    }
}
)

//   ==============

export const sendWelcomeEmail =async ({username,email})=>{

    const templatePath = path.join(process.cwd(), "../views/welcome.ejs")

    // const templatePath = new URL('views/welcome.ejs', import.meta.url).pathname;
    // const templateContent = fs.readFileSync(templatePath, 'utf-8');


    const data = await ejs.renderFile(templatePath);

    const  mainOptions = {

            from: '"support" testmail@gmail.com',
            to: email,
            subject: "Account Activated"
            ,html:data,
            user:username

    }


        await transporter.sendMail(mainOptions)
}













