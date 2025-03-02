import mongoose from "mongoose";
//יצירת קטגוריה

const categorySchema = new mongoose.Schema({

    nameC: {
        type: String,
        require: true,
    },
    apartmentsArr:[{
        type: mongoose.Types.ObjectId,
        ref:'apartments',
        require:true
    }],
})

export default mongoose.model('category', categorySchema)