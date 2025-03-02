import Advertiser from '../models/advertiser.js'
// import apartments from '../models/apartments.js'
import Apartment from '../models/apartments.js'
import category from '../models/category.js';
import Category from '../models/category.js'
import City from '../models/city.js'
import mongoose from 'mongoose'; 


//פונקציה להוספת דירה חדשה
export const create = async (req, res) => {
    const { name, description, codeCategoty, cityCode, address, beds, adds, price, advertiserCode } = req.body;

    try {
        // חיפוש ה-ObjectId של הקטגוריה
        console.log(codeCategoty);
        
        const categoriesDoc = await Category.findOne({ nameC : codeCategoty });
        if (!categoriesDoc) {

            return res.status(400).send({ message: `categories not found: ${codeCategoty}` });
        }


        // חיפוש ה-ObjectId של העיר
        const cityDoc = await City.findOne({ cityName : cityCode });
        if (!cityDoc) {
            return res.status(400).send({ message: `City not found: ${cityCode}` });
        }

        // חיפוש ה-ObjectId של המפרסם
        const advertiserDoc = await Advertiser.findOne({ _id : advertiserCode });
        if (!advertiserDoc) {
            return res.status(400).send({ message: `advertiser not found: ${advertiserCode}` });
        }

        const newApartment = new Apartment({
            name,
            description,
            codeCategoty: categoriesDoc._id,
            cityCode: cityDoc._id,
            address,
            beds,
            adds,
            price,
            advertiserCode: advertiserDoc._id,
        });

        const apartment = await newApartment.save();

        // עדכון העיר להוסיף את הדירה החדשה
        const updatedCity = await City.findOneAndUpdate(
            { _id: cityDoc._id },
            { $push: { apartmentsArr : apartment } },
            { new: true }
        );
        if (!updatedCity) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update city failed!` });
        }

        const updatedCategories = await Category.findOneAndUpdate(
            { _id: categoriesDoc._id },
            { $push: { apartmentsArr : apartment } },
            { new: true }
        );
        if (!updatedCategories) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update categories failed!` });
        }

        const updatedAdvertiser = await Advertiser.findOneAndUpdate(
            { _id: advertiserDoc._id },
            { $push: { apartmentsArr: apartment } },
            { new: true }
        );
        if (!updatedAdvertiser) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update Advertiser failed!` });
        }

        return res.status(200).send({ message: `create apartment ${apartment._id} succeed!` });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}


//שליפות
//====================
//שליפת כל הדירות
export const getAll = (req, res) => {
    console.log(Apartment.schema.paths);
   // apartment.find().populate('codeCategoty').populate('cityCode').populate('advertiserCode')
   Apartment.find().populate('codeCategoty').populate('cityCode').populate('advertiserCode')

        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
//שליפת דירה לפי קוד


export const getById = (req, res) => {

    const cleanId = req.params.id.replace(/\s+/g, '');  // הסרת רווחים ותו חדש
    Apartment.findById(cleanId)
        .populate('codeCategoty')
        .populate('cityCode')
        .populate('advertiserCode')
        .then(a => {
            res.status(200).send(a);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}    
//שליפת דירות לפי קוד קטגוריה
export const getByCatgeory = (req, res) => {
    //const categoryId = new mongoose.Types.ObjectId(req.params.id);
    const categoryId = req.params.id?.trim();
    Apartment.find()
    .populate('codeCategoty')
    .where({ codeCategoty : categoryId } )
        .then(apartment => {
            res.status(200).send( apartment )
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירות לפי קוד עיר
export const getByCity = (req, res) => {
    const cityId = req.params.id?.trim(); // הסרת רווחים מיותרים

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
        return res.status(400).send({ error: 'Invalid city ID format' });
    }

    Apartment.find({ cityCode: cityId })
        // .populate('codeCategoty')
        // .populate('advertiserCode')
        .populate('cityCode')
        .then(apartment => {
            if (!apartment || apartment.length === 0) {
                return res.status(404).send({ error: 'No apartments found for this city' });
            }
            res.status(200).send( apartment );
        })
        .catch(err => {
            console.error('Error fetching apartments by city:', err.message);
            res.status(500).send({ error: err.message });
        });
};

//שליפת דירות לפי כמות מיטות (גדולה מ / קטנה מ / שווה ל פונקציות דומות, אבל עם תנאי שונה...)

export const getByBedsLt = (req, res) => {

    const beds = req.params.beds;
    console.log(req.params.beds);
    Apartment.find()
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .where({
            beds : {$lte :beds}
        })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//דירות עם פחות מ  ויותר   
export const getByBedseq = (req, res) => {

    const beds = req.params.beds;
    console.log(req.params.beds);
    Apartment.find({beds})
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//יותר מת
export const getByBedsBg = (req, res) => {

    const beds = req.params.beds;
    console.log(req.params.beds);
    
   Apartment.find({beds:{$gt :beds}})
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
       
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//פחות מ  💰 
export const getByPriceLt = (req, res) => {
//    const price = req.params.price;
  const price = parseFloat(req.params.price);
    Apartment.find()
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .where({
            price : {$lt :price}
        })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//בין  ל 
export const getByPriceMi = (req, res) => {
    const price = req.params.price;
    Apartment.find()
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .where({
            $and: [
                { price: { $gt: req } },
                { price: { $lte: req } }
            ]
        })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//יותר מ 2000 ללילה
export const getByPriceBg = (req, res) => {
    const price = req.params.price;
   Apartment.find()
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .where({
            price : {$gt :price}
        })
        // 
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפת דירות לפי קוד מפרסם
export const getByAdvertiser = (req, res) => {
   Apartment.find()
    .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
    .where({ $eq: { advertiser: req.params.id } })
        .then(apartments => {
            res.status(200).send({ apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//שליפה לפי מספר מיטות:

export const getByBeds = (req, res) => {
    if(req.params.num==0)
    Apartment.find()
        .where({ bed: { $eq: req.params.beds } }) .populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .then(a => {
            res.status(200).send(a)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
        
        else if(req.params.num>0)
       Apartment.find()
        .where({ beds: { $gt: req.params.beds } }).populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .then(a => {
            res.status(200).send(a)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

        else

        Apartment.find()
        .where({ beds: { $lte: req.params.beds-1 } }).populate('codeCategoty').populate('cityCode').populate('advertiserCode')
        .then(a => {
            res.status(200).send(a)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

//פונקציה למחיקת דירה
export const  remove= async (req, res) => {
    const { id } = req.params;

    try {
        // חיפוש הדירה
        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).send({ message: `Apartment not found: ${id}` });
        }

        // עדכון העיר, קטגוריות ומפרסם על מנת להסיר את ה-ID של הדירה
        await Promise.all([
            City.findByIdAndUpdate(apartment.cityCode, { $pull: { apartmentsArr: apartment._id } }),
            Category.findByIdAndUpdate(apartment.codeCategoty, { $pull: { apartmentsArr: apartment._id } }),
            Advertiser.findByIdAndUpdate(apartment.advertiserCode, { $pull: { apartmentsArr: apartment._id } }),
        ]);

        // מחיקת הדירה
        await Apartment.findByIdAndDelete(id);

        return res.status(200).send({ message: `Delete apartment ${apartment._id} succeeded!` });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};
//עידכון דירה
export const update = (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(403).send({ error: `update id is forbidden!` })
    }

    const { id } = req.params

   
    Apartment.findByIdAndUpdate(id, req.body)
        // האובייקט שנשלח כתשובה - לפני השינוי
        .then(async apartment => {
            
            const { Category } = req.body

            if (Category) {
                // article.category - החזרנו את האובייקט לפני שהשינוי- הקטגוריה הישנה
                let x = await Category.findByIdAndUpdate(apartment.codeCategoty, { $pull: { apartment: apartment._id } })
                // category - נשלח בגוף הבקשה - חדשה
                let y = await Category.findByIdAndUpdate(category, { $push: { apartment: apartment._id } })
                if (!x || !y) {
                    return res.status(200).send({ message: `update article ${apartment._id} succeed!, upadte categories failed!` })
                }
            }
            return res.status(200).send({ message: `update article ${apartment._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}


export const createWithPic = async (req, res) => {
    const { name, description, codeCategoty, cityCode, address, beds, adds, price, advertiserCode } = req.body;

    try {
        // חיפוש ה-ObjectId של הקטגוריה לפי שם הקטגוריה
        const categoriesDoc = await Category.findOne({ nameC: codeCategoty });
        if (!categoriesDoc) {
            return res.status(400).send({ message: `Category not found: ${codeCategoty}` });
        }

        // חיפוש ה-ObjectId של העיר
        const cityDoc = await City.findOne({ cityName: cityCode });
        if (!cityDoc) {
            return res.status(400).send({ message: `City not found: ${cityCode}` });
        }

        // חיפוש ה-ObjectId של המפרסם
        const advertiserDoc = await Advertiser.findOne({ _id: advertiserCode });
        if (!advertiserDoc) {
            return res.status(400).send({ message: `Advertiser not found: ${advertiserCode}` });
        }

        // העלאת התמונה
        const image = req.file ? req.file.buffer.toString('base64') : null; // שקול לשמור נתיב לקובץ במקום

        // יצירת הדירה החדשה
        const newApartment = new Apartment({
            name,
            description,
            codeCategoty: categoriesDoc._id,
            cityCode: cityDoc._id,
            address,
            beds,
            adds,
            price,
            advertiserCode: advertiserDoc._id,
            image,
        });

        const apartment = await newApartment.save();

        // עדכון העיר להוסיף את הדירה החדשה
        await City.findOneAndUpdate(
            { _id: cityDoc._id },
            { $push: { apartmentsArr: apartment._id } },
            { new: true }
        );

        // עדכון הקטגוריה להוסיף את הדירה החדשה
        await Category.findOneAndUpdate(
            { _id: categoriesDoc._id },
            { $push: { apartmentsArr: apartment._id } },
            { new: true }
        );

        // עדכון המפרסם להוסיף את הדירה החדשה
        await Advertiser.findOneAndUpdate(
            { _id: advertiserDoc._id },
            { $push: { apartmentsArr: apartment._id } },
            { new: true }
        );

        return res.status(200).send({ message: `Apartment ${apartment._id} created successfully!` });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};