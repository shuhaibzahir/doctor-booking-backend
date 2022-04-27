const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hospitalSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    registerNo:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})

hospitalSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
hospitalSchema.methods.comparePassowrd = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
     
module.exports = mongoose.model('hospital',hospitalSchema)
