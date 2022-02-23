const Clarifai = require('clarifai');
const dotenv = require('dotenv');
dotenv.config();

const app = new Clarifai.App({
    apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.statu(400).json('Unable to work with API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    
    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(user => {
            res.json(user[0].entries);
        })
        .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}