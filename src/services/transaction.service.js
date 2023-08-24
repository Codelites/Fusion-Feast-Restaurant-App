import { Paystack } from "../providers/paystack.provider.js";
import { Transaction } from "../models/transaction.model.js";
import Order from "../models/order-model.js";
import { CustomError } from "../helpers/error.helper.js";

const paystack = new Paystack();

export const initializeTransaction = async function ( payload )
{
    const { email, orderId } = payload;

  // get the order record from the database
  const order = await Order.findById(orderId);

  if (!order) throw new CustomError("The requested order does not exist", 404);

  const { data } = await paystack.initializePayment(email, order.totalAmount);

  const paymentInfo = await data.data;

  /* 
    {
  authorization_url: 'https://checkout.paystack.com/2i6dgs9zavbq4o8',
  access_code: '2i6dgs9zavbq4o8',
  reference: 'rcqnwgfptw'
}
    */

  // create a record of the payment in the database
  await Transaction.create({
    order: order,
    reference: paymentInfo.reference,
    authorizationUrl: paymentInfo.authorization_url,
    amount: order.totalAmount,
  } );
    
    return paymentInfo.authorization_url;
};

export const transactionWebhook = async function (payload) {
  const { ref } = payload;
};

export const verifyTransactionStatus = async function (ref) {
  return await paystack.handlePayment(ref);
};
