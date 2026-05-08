const mongoose = require("mongoose")



const  connectDB = async () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("mongodb connctesd succesfully!")
        })
        .catch(err => {
            console.log("Error connecting to DB")
            process.exit(1)
        })

}


module.exports = connectDB