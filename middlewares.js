import jwt from "jsonwebtoken"
// import Category from "./models/category.js"
// import apartment from "./models/apartment.js"
import multer from "multer"
import path from "path"

// מידלוור כללי
// אין לו הגדרת ניתוב
// בהגדרת קריאת שרת שתרצה להשתמש בו - נשלח אליו
export const checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email && email.contains('@')) {
        return next()
    }
    res.status(400).send({ error: 'invalid email!' })
}

export const categoryExists = (req, res, next) => {

    const { category } = req.body

    if (!category && req.method == 'PATCH') {
        return next()
    }

    category.findById(category)
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: `catgory not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

// בדיקה האם נשלח טוקן והאם הוא תקין ותקף
export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        // אין הרשאה
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // האימות נכשל
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        if (decoded) {
            // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
            next()
        }
    })

}
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// export const upload = multer({
//     storage,limits:{
//         fileSize: 1024 * 1024 *2
//     },
//     fileFilter
// })


// import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // עד 2 מגה
    },
    fileFilter,
});







// export const upload = multer({
//     storage,
//     limits: {
//         fileSize: 1024 * 1024 * 2 // 2MB
//     },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb('Error: File upload only supports the following filetypes - ' + filetypes);
//     }
// });

// export const   upload= multer({
//        // dest: 'uploads/',
//        storage,
//        //הגדרות לגבי הקובץ המועלה
//        limits: {
//            //2MB הקובץ יכול להיות עד גודל של 
//            fileSize: 1024 * 1024 * 2
//        },
//        fileFilter
//    })


// //הוספת דירה עם תמונה: 
// import multer from 'multer';

// // הגדרת אחסון התמונה
// const storage = multer.memoryStorage();
// const upload = multer({ storage });