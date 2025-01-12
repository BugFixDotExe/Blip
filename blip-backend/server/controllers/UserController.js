import { User } from '../models/UserSignUpModel.js'
import dbClient from '../utils/dbClient.js';


class UserController {
    // This here function, handles the signup of a user
    static async postNew(req, res) {
        const { username, email, password } = req.body;
        console.log(req.body)
        try {
            if (dbClient.isAlive() === true) {console.log('isAlive')}
            await dbClient.insertUser(req.body)
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

    }
}


export default UserController;
