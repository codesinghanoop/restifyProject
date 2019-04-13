import RestifyError from 'restify-errors'
import jwt from 'jsonwebtoken'
import Bcrypt from 'bcryptjs'
import Users from '../models/users'
import Config from '../config'
import { authenticate } from '../auth'

const users = (Server) => {
    //To register user
    Server.post('/register', (req, res, next) => {
        const { email, password } = req.body;
        const user = new Users({
            email,
            password
        })
        Bcrypt.genSalt(12, (err, salt) => {
            Bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;
                //save the user
                try {
                    const newUser = await user.save();
                    res.send({ message: 'registered successfully' });
                    next();
                } catch (error) {
                    return next(new RestifyError.InternalError(err.message));
                }
            })
        })
    })
    //Authenticate user
    Server.post('/auth',async (req, res, next) => {
        const { email, password } = req.body
        try {
            const user =await authenticate(email, password);
            const token = jwt.sign(user.toJSON(), Config.JWT_SECRET, {
                expiresIn: '15m'
            });
            const { iat, exp } = jwt.decode(token);
            res.send({ iat, exp, token })
            next();
        } catch (error) {
            return next(new RestifyError.UnauthorizedError(error));
        }
    })
}

export default users
