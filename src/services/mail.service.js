import { error } from "console";
import config from "../config/main.config.js";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import fs from "fs";

export const transporter = nodemailer.createTransport({
  host: config.mailServices.host,
  port: config.mailServices.port,

  auth: {
    user: config.mailServices.auth.user,
    pass: config.mailServices.auth.pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is running......");
  }
});

//   ==============

export const sendWelcomeEmail = async ({ username, email }) => {
  const templatePath = path.join(process.cwd(), "./src/views/welcome.ejs");

  const data = await ejs.renderFile(templatePath, { user: username});

  const mainOptions = {
    from: '"support" testmail@gmail.com',
    to: email,
    subject: "Account Activated",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};





export const sendTokenMail = async ({username,email,token})=>{

  const templatePath = path.join(process.cwd(),"./src/views/reset-pass.ejs")

  const data = await ejs.renderFile(templatePath,{user:username,token})

  
  const mainOptions = {
    from: '"support" testmail@gmail.com',
    to: email,
    subject: "Password Reset",
    html: data,
  };


    await transporter.sendMail(mainOptions)
}



export const resetSuccesfulMail = async ({username,email})=>{

  const templatePath = path.join(process.cwd(),"./src/views/passwordResetSuccess.ejs")
  const data = await ejs.renderFile(templatePath,{user:username})

  const mainOptions = {
    from: '"support" testmail@gmail.com',
    to: email,
    subject: "Password Reset",
    html: data,
  };

  await transporter.sendMail(mainOptions)

}