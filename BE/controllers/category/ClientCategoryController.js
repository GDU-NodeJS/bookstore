import ClientCategoryService from "../../services/category/ClientCategoryService.js";
const clientCategoryService = new ClientCategoryService();

class ClientCategoryController {
    constructor(){}

    async getCategories(req, res){
        try{
            const categories = await clientCategoryService.getAllCategories();
            return res.status(200).json({
                status: 200,
                message : "Successfully retrieved data",
                data : categories,
            });
        } catch(err){
            console.error("Error fetching categoies: ",err);
            return res.status(500).send("Error fetching categories");
        }
    }
}
export default ClientCategoryController;