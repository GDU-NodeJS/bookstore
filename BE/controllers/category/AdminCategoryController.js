import AdminCategoryService from "../../services/category/AdminCategoryService.js";
const adminCategoryService = new AdminCategoryService();

class AdminCategoryController{
    constructor(){}

    async getCategories(req, res){
        try{
            const categories = await adminCategoryService.getAllCategory();
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

    async getCategoryById(req, res){
        try{
            const categoryId = req.params.id;
            const category = await adminCategoryService.finById(categoryId);
            if (!category){
                return res.status(404).json({
                    status: 404,
                    message: "Category not found",
                });
            }
            return res.status(200).json({
                status: 200,
                message : "Successfully retrieved the category",
                data : category,
            });
        } catch(err){
            console.error("Error fetching the categoiy: ",err);
            return res.status(500).send("Error fetching the category");
        }
    }
    async addCategory(req, res){
        try{
            const newcategory = req.body;
            await adminCategoryService.addCategory(newcategory);
            return res.status(201).json({
                status: 201,
                message : "Category added successfully",
            });
        } catch(err){
            console.error("Error adding the category: ",err);
            return res.status(500).send("Error adding the category");
        }
    }
    async updateCategory(req, res){
        try{
            const categoryId = req.params.id;
            const updatecategory = req.body;
            await adminCategoryService.updateCategory(categoryId, updatecategory);
            return res.status(200).json({
                status: 200,
                message : "Category uppdated successfully",
            });
        } catch(err){
            console.error("Error updating the category: ",err);
            return res.status(500).send("Error updating the category");
        }
    }
    async removeCategory(req,res){
        try{
            const categoryId = req.params.id;
            await adminCategoryService.removeCategory(categoryId);
            return res.status(200).json({
                status: 200,
                message : "Category removed successfully",
            });
        } catch(err){
            console.error("Error removing the category: ",err);
            return res.status(500).send("Error removing the category");
        }
    }
}

export default AdminCategoryController;
