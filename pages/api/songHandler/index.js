const mongoose = require('mongoose')
const Song = require('../../../models/Song')

const url = 'mongodb://localhost:27017/Song'
mongoose.connect(url).then(() => {
    console.log("Connected")
}).catch((err) =>{ console.log(err)}
)

export default async function handler(req, res) {
    const { method } = req;

    switch(method){
        case 'GET':
            try {
                const songs = await Song.find({})
                
                res.status(200).json({data : songs})
            } catch (err) {
                res.status(203).json({data : err})
            }
        break;
        case 'POST':
            try {
                const song = await Song.create(req.body)
                console.log("test")
                if(!song){
                     res.status(203).json({data : "Not Found"})
                }
                res.status(200).json({data : song})
            } catch (err) {
                res.status(203).json({data : err})
            }
        break;
        case 'DELETE':
            try {
                const song = await Song.deleteMany({})

                res.status(200).json({data : song})
            } catch (err) {
                res.status(203).json({data : err})
            }
        break;
        default:
            res.status(403).json({name : "Forbidden"})
        break;
    }
}
