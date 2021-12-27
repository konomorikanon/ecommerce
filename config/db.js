const mongoose = require('mongoose');

const MongoseFunction = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log("data base corriendo...");
        
    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    MongoseFunction
}