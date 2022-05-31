const mongoose = require('mongoose');

const dbConnection= async()=>{

        try {
           await mongoose.connect( process.env.MOGODB_ATLAS,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex: true,
            //useFindAndModify:false
           });
           
           console.log("DB connect")
        } catch (error) {
                console.log(error)
                //throw new Error("Error al identificar la DB")
        }
}

module.exports={
    dbConnection
}