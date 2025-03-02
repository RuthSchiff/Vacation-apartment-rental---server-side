// יבוא של המודל
import category from "../models/category.js";
import Category from "../models/category.js"
//ממשקים
//================
//הוספה
export const create = (req, res) => {    
   
    const newCategory=new Category(req.body)
    console.log(newCategory);
    
    newCategory.save()
    // const {name , apartmentsArr} = req.body
      
       
    // קטגוריה חדשה

        .then(category => {
            res.status(200).send({ message: `create category ${category._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
export const getAll = (req, res) => {
    category.find()
        .then(categorys => {
            res.status(200).send(categorys)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

//update
export const updateC = (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(405).send({ error: `update id is forbidden!` })
    }

    const { id } = req.params

    Category.findByIdAndUpdate(id, req.body, { new: true })
        .then(category => {
            res.status(200).send({ message: `update category ${category._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
//====================
