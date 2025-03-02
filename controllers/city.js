import city from '../models/city.js'
//ממשקים==========
//שליפת כל הערים
export const getAll = (req, res) => {
    city.find()
        .then(cities => {
            res.status(200).send(cities)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
//הוספת עיר
export const create = (req, res) => {

    const { cityName,apartmentsArr } = req.body

    const newCity = new city({
        cityName,
        apartmentsArr:[]
    })

    newCity.save()
        .then( city=> {
            return res.status(200).send({ message: `create city ${city._id} succeed!` })
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
}
//================
//Update
export const update = (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(405).send({ error: `update id is forbidden!` })
    }

    const { id } = req.params

    city.findByIdAndUpdate(id, req.body, { new: true })
        .then(city => {
            res.status(200).send({ message: `update city ${city._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}