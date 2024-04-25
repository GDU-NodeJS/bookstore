import { configure, payment as _payment } from 'paypal-rest-sdk';

const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

configure({
  'mode': PAYPAL_MODE,
  'client_id': PAYPAL_CLIENT_KEY,
  'client_secret': PAYPAL_SECRET_KEY
});

const payProduct = async(book, quantity, req, res)=>{

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
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                  }
                }
            }
          });

    } catch (error) {
        console.log(error.message);
    }

}
export default {
    payProduct
}