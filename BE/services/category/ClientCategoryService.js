import ClientCategoryServiceImp from "./ClientCategoryServiceImp";
const clientCategoryService = new ClientCategoryServiceImp();

class ClientCategoryService {
    async getAllCategories (){
        const categories = await clientCategoryService.getAllCategory();
        return categories;
    }
}

export default ClientCategoryService;