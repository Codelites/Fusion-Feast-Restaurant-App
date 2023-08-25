import Order from '../models/order-model.js';
import User from '../models/user-model.js';
import * as transactionService from '../services/transaction.service.js';

export const initializeTransaction = async function ( req, res, next )
{
    try
    {
        const { userId } = req.user.body;

        // pull the user details
        const user = await User.findById(userId);

        const { orderId } = req.params;

        console.log(orderId, "controller")

        const payload = {
            email: user.email,
            orderId: orderId
        };

        const paymentUrl = await transactionService.initializeTransaction( payload );

        return res.status( 201 ).json( {
            success: true,
            message: 'Your ordere transaciton has been created',
            data: {
                url: paymentUrl
            }
        } );
    } catch (e) {
        next( e );
        console.log(e)
    }
}