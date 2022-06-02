const jwt = require('jsonwebtoken')
const jsonWebToken =(uid = "") =>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETKEY,{
            expiresIn:'10h'
        },(err, token) =>{
            if(err){
                console.log(err);
                reject("No se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
}
module.exports={
    jsonWebToken
}
