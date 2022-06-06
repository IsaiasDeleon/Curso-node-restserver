const path = require('path')
const { v4: uuidv4 } = require('uuid');
const subirArchivos=async(files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta="")=>{
    return new Promise((resolve,reject)=>{4
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]
        //validar la extencion 
        if(!extensionesValidas.includes(extension)){
            return reject(`la extension ${extension} no es permitida, ${extensionesValidas}`)
        }
        
        const nombreTemp = uuidv4()+'.'+extension;
      
        const uploadPath =path.join( __dirname , '../uploads/' ,carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err)
          }
        resolve(nombreTemp)
        });
    });
}
module.exports={
    subirArchivos
}