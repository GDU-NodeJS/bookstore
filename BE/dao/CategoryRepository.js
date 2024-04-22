import Category from "../models/category.js";

class CategoryRepository{
    constructor(){
    }

    async findAll() {
        const categories = await Category.find();
        return categories;

    }

    async findByName(name) {
        try{
            const category = await Category.findOne({ name: name });
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
    async create(categoryData) {
        try {
            const newCategory = new Category(categoryData);
            const savedCategory = await newCategory.save();
            return savedCategory;
        } catch (err) {
            console.error(err);
            throw new Error("Error adding the category");
        }
    }
    async findByIdAndUpdate(id, categoryData) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
            return updatedCategory;
        } catch (err) {
            console.error(err);
            throw new Error("Error updating the category");
        }
    }

    async findByIdAndDelete(id) {
        try {
            await Category.findByIdAndDelete(id);
        } catch (err) {
            console.error(err);
            throw new Error("Error deleting the category");
        }
    }
}

export default CategoryRepository;