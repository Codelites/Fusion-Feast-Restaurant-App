import dotenv from "dotenv";
// import { config as variableConfig } from "dotenv";
// import path from "path"
// variableConfig();
dotenv.config();

// import { config as Configuration } from "dotenv";
// Configuration({ path: ".env.example" });
import mongoose from "mongoose";
import User from "../models/user-model.js";
import { records } from "../database/seeder.database.js";
import MenuItem from "../models/menu-model.js";
import Cart from "../models/cart.model.js";

const config = {
  server: {
    port: parseInt(process.env.PORT, 10),
    mode: process.env.NODE_ENV,
  },
  connectToDatabase: async function () {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db connected successfully");
      })
      .catch((err) => {
        console.error("Error connecting to the database:", err.message);
      } );
  },
  //   // seed the database
  //   if ( ( await User.find() ).length === 0 ) await User.insertMany( records.users );

  //   // create a cart for the user with the role of user
  //   const user = await User.findOne( { email: "doejane@gmail.com" } );
    
  //   await Cart.create( { user } );

  //   if ( ( await MenuItem.find() ).length === 0 ) await MenuItem.insertMany( records.menu );
  // },
  
  services: {
    jwt_secret: process.env.JWT_SECRET,
  },
  mailServices: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  // rootPath: path.resolve(__dirname)
  payStack: {
    live: {
      publicKey: process.env.PAYSTACK_LIVE_PUBLIC_KEY,
      secretKey: process.env.PAYSTACK_LIVE_SECRET_KEY,
    },
    sandbox: {
      publicKey: process.env.PAYSTACK_TEST_PUBLIC_KEY,
      secretKey: process.env.PAYSTACK_TEST_SECRET_KEY,
    },
  },
};


export default config