import argon from "argon2";
import { log } from "console";

const hashPassword = async (password) => await argon.hash(password);


log(await hashPassword( "admin password" ));