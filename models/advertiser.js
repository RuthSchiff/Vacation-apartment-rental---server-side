import mongoose from "mongoose";
//יצירת אוביקט מפרסם
const advertiserSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
       
     
    },
    
    password: {
        type: String,
        require: true,
      

    },
    phone: {
        type: String,  
        maxLegth:20,
        require: true,

    },
    anotherPhone: {
        type: String,
        maxLegth:20
    },
    apartmentsArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'apartments',
        require: true
    }],

})
export default mongoose.model('advertiser', advertiserSchema)
