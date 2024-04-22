import OrderRepository from "../../dao/OrderRepository.js";
const orderRepository = new OrderRepository();

class ClientOrderService{
    async getOrderById(orderId) {
      try {
        const order = await orderRepository.findById(id);
        return order;
      } catch (err) {
        console.error(err);
        throw new Error('Error getting order by id');
      }
      }
    
      async getOrdersByUserId(userId) {
        try {
          const orders = await orderRepository.findByUser(userId);
          return orders;
        } catch (err) {
          console.error(err);
          throw new Error('Error getting orders by user');
        }
      }
      async getAllOrder(){
        try{
          const orders = await orderRepository.findAll();
          return orders;
        }catch (err){
          console.error(err);
          throw new Error("Not getting all orders");
      }
      }
}
export default ClientOrderService;