
const mongoose = require('mongoose')
const Song = require('../../../models/Song')

const url = 'mongodb://localhost:27017/Song'
mongoose.connect(url).then(() => {
    console.log("Connected")
}).catch((err) =>{ console.log(err)}
)

export default async function handler(req, res){
    const {method} = req;

    switch(method){
        case 'GET':
            const song = await Song.findById(req.query.id)
            res.status(200).json({data : song})
        break;
        case 'DELETE':
            try {
                const song = await Song.findByIdAndDelete(req.query.id)

                res.status(200).json({data : song})
            } catch (err) {
                res.status(203).json({data : err})
            }
        break;
        default:
            res.status(203).json({data : err})
        break;

    }
}