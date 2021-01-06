const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true, // these 3 are depricational warnings from mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// creating and saving and console.log the new document here and if it's array done within promise chain and everything is happening in sequence
connect.then(() => {

    console.log('Connected correctly to server');

    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    newCampsite.save()
        .then(campsite => {
            console.log(campsite);
            return Campsite.find();
        })
        .then(campsites => {
            console.log(campsites);
            return Campsite.deleteMany();
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch(err => { //console log err msg in catch blog
            console.log(err);
            mongoose.connection.close();
        });
});