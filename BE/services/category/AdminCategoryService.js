import AddminCategoryServiceImp from "./AdminCategoryServiceImp";
const addminCategoryService = new AddminCategoryServiceImp();

class AddminCategoryService {
    async finById(id) {
        const category = await addminCategoryService.findById(id);
        return category;
    }
    async getAllCategory(){
        const categories = await addminCategoryService.getAllCategory();
        return categories;
    }
    async addCategory(category) {
        await addminCategoryService.addCategory(category);
    }
    async updateCategory(id,category) {
        await addminCategoryService.updateCategory(id,category);
    }
    async removeCategory(id) {
        await addminCategoryService.removeCategory(id);
    }
}

export default AddminCategoryService;