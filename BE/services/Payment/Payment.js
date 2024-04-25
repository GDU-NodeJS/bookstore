import paypal from 'paypal-rest-sdk';

const configure = paypal.configure;
const _payment = paypal.payment;

configure({
    'mode': 'sandbox',
    'client_id': 'AQCeNQlg53rHTVSIkLs4VmOebVsQLRergsq9ll9do5juRL_dJxyuI0n4OV2mN8OtgAGF32rUp9hMXVYH',
    'client_secret': 'ECogPd5-KYqwc6M8NLT0LX7siK3ktpgSiy6g13nkYO5CN2jtXf7SVew4_LPOZ3fc-Hr5ZhYwutptBhRY'
});

class Payment {

    async payProduct(book, quantity, req, res) {

        try {
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000/success",
                    "cancel_url": "http://localhost:3000/cancel"
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
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                            
                        }
                    }
                }
            });

        } catch (error) {
            console.log(error.message);
        }

    }
}

export default Payment;