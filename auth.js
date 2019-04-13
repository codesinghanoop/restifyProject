const bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

export const authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({email});
            bcrypt.compare(password, user.password, (err, isMatch) => {
             if(err) throw err;
             if(isMatch) {
                 resolve(user)
             }
             else {
                reject('Authentication Failed');
             }
            })
        } catch (error) {
            reject('Authentication Failed');
        }
    })
}
