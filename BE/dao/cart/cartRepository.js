import Cart from "../../models/cart/cart.js"
class cartRepository{
    contructor (){}
    async findCartByUserId(user)
    {
        try{
            const cart = await Cart.findOne({user})
        } catch( err)
        {
            
        }
    }
}