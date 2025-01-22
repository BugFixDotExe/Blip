import { User } from '../models/UserSignUpModel.js'
import dbClient from '../utils/dbClient.js';
import AuthController from './AuthController.js'

class UserController {
    // This here function, handles the signup of a user
    static async postNew(req, res) {
        const { username, email, password } = req.body;
        if(!username){
            console.log('Missing Username or more')
            return res.status(400).json({error: 'Missing Username'})
        }
        if(!email){
            console.log('Missing Email')
            return res.status(400).json({error: 'Missing Email or more'})
        }
        if(!password){
            console.log('Missing Password')
            return res.status(400).json({error: 'Missing Password or more'})
        }
        try {
            if (dbClient.isAlive() === true) {
                console.log('isAlive')
                const isUser = await dbClient.isExistingUser(email);
                if (isUser){
                    console.log(isUser);
                    console.log('User with email exist');
                    return res.status(400).json({error: 'User with email exist'})
                }
                const saveStatus = await dbClient.insertUser(req.body)
                if(saveStatus){res.json({ok: 'Success'})}
            }
        }catch (err){
            console.log(err)
            res.status(401).json({error: err._message})
        }
    }

    // This here function handles the login of the user
    // if valid, the user is sent over for authorization.
    static async getUserLogin(req, res) {
        const {email, password } = req.body;
        console.log('login credentials', req.body)
        try {
            const isUser = await dbClient.isExistingUser(email);
            console.log(isUser)
            if (isUser !== null) {
                const token = AuthController.generateJWT(req, res, isUser._id)
                res.status(200).json({token: token})
            }
            else {
                res.json({failed:'failed to login'})
            }
        } catch(err){}
        }

}
export default UserController;
