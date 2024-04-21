import Cart from "../../models/cart/cart.js"
class cartRepository{
    contructor (){}
    async findCartByUserId(userId)
    {
        try{
            const cart = await Cart.findOne({user: userId}).populate('cartItems');
            return cart;
        } catch( err)
        {
            console.error(err);
            thorw 
        }
    }
    async saveCart(cart)
    {
        return await cart.save();
    }
    async deleteCart(cartId)
    {
        
    }
}