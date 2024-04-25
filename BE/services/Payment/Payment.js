import paypal from 'paypal-rest-sdk';

import ClientBookSerivce from "../../services/book/ClientBookService.js"
import ClientOrderService from "../../services/order/ClientOrderService.js";
const bookService = new ClientBookSerivce();
const clientOrderService = new ClientOrderService();

const configure = paypal.configure;
const _payment = paypal.payment;

configure({
    'mode': 'sandbox',
    'client_id': 'AQCeNQlg53rHTVSIkLs4VmOebVsQLRergsq9ll9do5juRL_dJxyuI0n4OV2mN8OtgAGF32rUp9hMXVYH',
    'client_secret': 'ECogPd5-KYqwc6M8NLT0LX7siK3ktpgSiy6g13nkYO5CN2jtXf7SVew4_LPOZ3fc-Hr5ZhYwutptBhRY'
});

class Payment {

    async payProduct(book, quantity, req, res) {
        return new Promise((resolve, reject) => {
            try {
                const create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "http://localhost:8090/cart/success",
                        "cancel_url": "http://localhost:3000/cart"
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": book.name,
                                "sku": "001",
                                "price": book.price,
                                "currency": "USD",
                                "quantity": quantity
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": book.price * quantity
                        },
                        "description": "Hat for the best team ever"
                    }]
                };

                _payment.create(create_payment_json, function (error, payment) {
                    if (error) {
                        reject(error);
                    } else {
                        let paymentLink;
                        for (let i = 0; i < payment.links.length; i++) {
                            if (payment.links[i].rel === 'approval_url') {
                                res.paymentUrl = payment.links[i].href; 
                                paymentLink = payment.links[i].href;
                                resolve(paymentLink);
                            }
                        }
                    }
                });
            } catch (error) {
                console.log(error.message);
                reject(error);
            }
        });
    }
    async handleSuccessfulPayment(req, res) {
        try {
            const paymentId = req.query.paymentId;
            const payerId = req.query.PayerID;
            const paymentDetails = _payment.execute(paymentId, payerId);

            if (paymentDetails.state === 'approved') {
                const userId = this.getUserId(req);
                const cartItem = req.session.cartItem; 
                const order = await clientOrderService.createOrder(userId, cartItem, req);

                req.session.paymentUrl = null;
                req.session.cartItem = null;

                return res.status(200).json({ message: 'Payment successful, order created', order });
            } else {
                return res.status(400).json({ message: 'Payment failed' });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Error processing payment' });
        }
    }
}

export default Payment;