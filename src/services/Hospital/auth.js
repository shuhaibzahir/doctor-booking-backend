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
    }
}