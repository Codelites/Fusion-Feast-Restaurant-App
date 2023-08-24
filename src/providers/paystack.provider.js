import axios from 'axios';
import config from '../config/main.config.js';
import { CustomError } from '../helpers/error.helper.js';

const { live, sandbox } = config.payStack;

export class Paystack
{
    constructor()
    {
        const key = (config.server.mode === 'production') ? live.secretKey : sandbox.secretKey;

        this.client = axios.create({
          baseURL: "https://api.paystack.co",
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
        });
    }

    async initializePayment ( email, amount )
    {
        const data = JSON.stringify({
          email: email,
          amount: amount * 100,
        });

        return await this.client.post("/transaction/initialize", data);
    }
    
    async webhook ()
    { }
    
    async handlePayment ( ref )
    {
        const transaction = await this.client.get( `/transaction/verify/${ref}` );

        if ( transaction.status !== 'success' ) throw new CustomError( "Transaction is not successful" );
        
        return transaction;
    }
}