import mongoose from "mongoose";
//יצירת אוביקט דירה

const apartmentSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        maxLength: 5000,
        require: true
    }
    ,
    image: {
        type: String,
        // require:false,
        require:true
    }
    ,
    cityCode: {
        type: mongoose.Types.ObjectId,
        ref: 'city',
        require: true
    },

    address: {
        require: true,
        type: String,
    },
    beds:
    {
        type:Number,
        require:true,
        // numberOfBeds: Number
    },
    adds:
    {
        type:String,
        require: true,
        
        // maxLength: Number,
    },

    price:
    {
        type:Number,

        // thePrice: Number,

        // maxLength: Number,
        require: true,
    },
    advertiserCode:
    {

        type: mongoose.Types.ObjectId,
        ref: 'advertiser',
        require: true
    },
    codeCategoty:
    {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        // require: true,
    },
    
}
)

export default mongoose.model('apartment', apartmentSchema)