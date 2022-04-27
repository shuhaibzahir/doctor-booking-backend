const Hospital = require('../../models/Hospital/hospital')
const rejectMsg = require("../../config/rejectMessages")
module.exports={
    /* -------------- to register hospital with some required data -------------- */
    hospitalRegister:(data)=>{
        return new Promise(async(resolve,reject)=>{
           const isExistHospital =  await Hospital.findOne({$or:[{email:data.email},{phone:data.phone},{registerNo:data.registerNo}]})
           if(isExistHospital){
               reject(rejectMsg.hospitalExist)
           }else{
               const hospitalData = new Hospital({...data})
               hospitalData.save().then((result)=>{
                   resolve(result)
               }).catch(err=>{
                   reject(err)
               })
           }
        })
    },

    /* ---------------------------- to hospital login --------------------------- */
    hospitalLogin:(data)=>{
        return new Promise((resolve,reject)=>{
            const {email,registerNo,password}= data
            Hospital.findOne({$or:{email,registerNo}}).then(result=>{
                if(result){
                    result.comparePassword(password,(err,success)=>{
                         if(err) console.err(err)
                         else{
                             if(success){
                                 resolve(result)
                             }else{
                                 reject(rejectMsg.hospitalLoginError)
                             }
                         }
                    })
                }
            })
        })
    }
}