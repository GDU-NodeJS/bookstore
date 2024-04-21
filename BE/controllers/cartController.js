import CartService from "../services/CartService.js"

class cartController{
    constructor() {
        this._cartService = new CartService();
    }

    async addToCart(req, res) {
        try {
          const { bookId, quantity } = req.body;
          await this._cartService.addToCart(req, bookId, quantity);
          return res.status(200).json({ message: 'Add to cart successfully' });
        } catch (err) {
          console.error('Error adding to cart:', err);
          return res.status(500).json({ message: err.message });
        }
      }
    
    async getCart(req, res) {
    try {
        const cart = await this._cartService.getCart(req);
        return res.status(200).json({ data: cart, message: 'Get cart successfully' });
    } catch (err) {
        console.error('Error getting cart:', err);
        return res.status(500).json({ message: err.message });
    }
    }

    async removeFromCart(req, res) {
    try {
        const { bookId } = req.params;
        await this._cartService.removeFromCart(req, bookId);
        return res.status(200).json({ message: 'Remove from cart successfully' });
    } catch (err) {
        console.error('Error removing from cart:', err);
        return res.status(500).json({ message: err.message });
    }
    }

    async updateCart(req, res) {
    try {
        const { bookId } = req.params;
        const { quantity } = req.body;
        await this._cartService.updateCart(req, bookId, quantity);
        return res.status(200).json({ message: 'Update cart successfully' });
    } catch (err) {
        console.error('Error updating cart:', err);
        return res.status(500).json({ message: err.message });
    }
    }

    async clearCart(req, res) {
    try {
        await this._cartService.clearCart(req);
        return res.status(200).json({ message: 'Clear cart successfully' });
    } catch (err) {
        console.error('Error clearing cart:', err);
        return res.status(500).json({ message: err.message });
    }
    }
}
export default cartController;