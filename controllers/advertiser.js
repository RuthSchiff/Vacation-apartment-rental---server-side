import jwt from 'jsonwebtoken'
import advertiser from '../models/advertiser.js'


export const login = (req, res) => {
    // שליפה לפי שם מפתח
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: `email and password are required!` });
    }

    advertiser.find()
        // חיפוש לפי אימייל
        .where({ email: { $eq: email } })
        .then(async advertisers => {
            // לא נמצאו משתמשים מתאימים
            if (advertisers.length === 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` });
            }

            // מערך - שליפה לפי מיקום
            let [advertiser] = advertisers;

            // הסיסמה לא תואמת
            if (advertiser.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` });
            }

            try {
                // יצירת טוקן:
                const token = jwt.sign(
                    { advertiserId: advertiser._id, email: advertiser.email }, // מידע מקודד בטוקן
                    process.env.SECRET, // מחרוזת סודית (להגדיר בקובץ .env)
                    { expiresIn: '1h' } // זמן תפוגה של הטוקן
                );

                // המשתמש נמצא - נשלח חזרה לצד לקוח
                res.status(200).send({ advertiser, token });
            } catch (error) {
                console.error('Error generating token:', error.message);
                res.status(500).send({ error: 'Failed to generate token' });
            }
        })
        .catch(err => {
            console.error('Database error:', err.message);
            res.status(500).send({ error: err.message });
        });
};

// הרשמה - signup
export const register = (req, res) => {

    console.log(req.body)
    const { email, password ,phone ,anotherPhone , apartmentsArr} = req.body
    console.log("email, password ,phone ,anotherPhone , apartmentsArr");
    
    advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertisers => {
            if (advertisers.length > 0) {
                return res.status(400).send({ error: 'email has been exists already!' })
            }
            const newAdvertiser = new advertiser({
                
                email,
                password,
                phone,
                anotherPhone,
                apartmentsArr,
                // token
            })

            newAdvertiser.save()
                .then(async newAdvertiser => {
                    // יצירת טוקן:
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - לא חובה
                    const token = await jwt.sign(
                        { phone: newAdvertiser.phone, email },
                        process.env.SECRET,
                        console.log(process.env.SECRET),
                        
                        {
               
                            expiresIn: '1hr' // hours
                
                        }
                    )
            
                return res.status(200).send({ newAdvertiser_id: newAdvertiser._id, token  })
            })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        })
        }




//
export const getAll = (req, res) => {
    advertiser.find()
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//update
export const update = (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(405).send({ error: `update id is forbidden!` })
    }

    const { id } = req.params

    advertiser.findByIdAndUpdate(id, req.body, { new: true })
        .then(advertiser => {
            res.status(200).send({ message: `update category ${advertiser._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
//הוספת token

export const addTokensToAdvertisers = async (req, res) => {
    try {
        // שליפת כל המפרסמים
        const advertisers = await advertiser.find();

        // בדיקה אם אין מפרסמים
        if (advertisers.length === 0) {
            return res.status(404).send({ message: 'No advertisers found.' });
        }

        // עדכון לכל מפרסם
        for (let adv of advertisers) {
            // יצירת טוקן עבור המפרסם
            const token = jwt.sign(
                { advertiserId: adv._id, email: adv.email }, // מידע מקודד
                process.env.SECRET, // מחרוזת סודית
                { expiresIn: '1h' } // זמן תפוגה
            );

            // עדכון הטוקן במסמך של המפרסם
            adv.token = token;
            await adv.save();
        }

        res.status(200).send({ message: 'Tokens added to all advertisers successfully.' });
    } catch (error) {
        console.error('Error updating tokens:', error.message);
        res.status(500).send({ error: 'Failed to update tokens.' });
    }
};
