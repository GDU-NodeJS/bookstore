import Category from "../models/category";

class CategoryRepository{
    constructor(){

    }

    async findAll() {
        try{
            const categories = await Category.find();
            return categories;
        }
        catch(err){
            console.error(err);
            throw new Error("Not finding all categories " );
        }
    }

    async findByName(name) {
        try{
            const category = await Category.findOne(name);
            return category;
        }
        catch(err){
            console.error(err);
            throw new Error("Not finding by name category ");
        }
    }

    async findById(id) {
        try{
            const category = await Category.findById(id);
            return category;
        }
        catch(err){
            console.error(err);
            throw new Error("Not finding by id category ");
        }
    }
    
}

export default CategoryRepository;