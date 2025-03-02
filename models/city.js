import mongoose from "mongoose";
// יצירצ אוביקט עיר
const citytSchema = new mongoose.Schema({
    cityName:
    {
        type: String,
        require: true,
        // maxLength: 50
    },
    apartmentsArr: [{
        type: mongoose.Types.ObjectId,
        ref: 'apartment',
        require: true
    }],
})

export default mongoose.model('city', citytSchema)
