const hospitalauth = require('../../services/Hospital/auth')
const register= (req,res,next)=>{
    console.log(req.body)
    hospitalauth.hospitalRegister(req.body).then((data)=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })
}


module.exports={
    register
}
