import jwt from 'jsonwebtoken';
import fs from 'fs';
/* This is responsible for Handling User Authorization*/
/* This module makes or takes on the assumption:
    -> All and every call to the static or class methods
    will be allowed on the assumption, that the user was
    sucessfully authenticated, and has a valid account in the db
    -> Generate an Verify, Authorization token using JWT
 */


class AuthController {
    static secretKey = fs.readFileSync('/home/mariecurie/Desktop/blip/server/privatekey.pem', 'utf8');
    static publickey = fs.readFileSync('/home/mariecurie/Desktop/blip/server/publickey.pem', 'utf8');

    static generateJWT(req, res, userObj) {

        const payload = {
            userId: userObj._id,
            iat: Math.floor(Date.now() / 1000)
        };
        const options = {
            expiresIn: '24h',
            algorithm: 'RS256',
        };
        // Generate and return the JWT to the client
        const token = jwt.sign(payload, AuthController.secretKey, options);
        console.log(token)
        return token
    }

    static verifyJWT(token) {
        try {
            const decoded = jwt.verify(token, AuthController.publickey, options);

        }catch (error) {console.log(error);}
    }
}

export default AuthController;
