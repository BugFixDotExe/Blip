import mongodb from 'mongodb';
import dotenv from 'dotenv'; // ES Module import

dotenv.config();


class DBClient{
    constructor()
    {
        const uri = 'mongodb+srv://bugfixdotexe:kotlin101%403rdworld@cluster0.5j2yh.mongodb.net/?retryWrites=true&w=majority';
        this.client = new mongodb.MongoClient(uri,  { useUnifiedTopology: true })
        this.isConnected = false;
    }
    isAlive() {
        return this.isConnected;
    }
     async run() {
        try {
            await this.client.connect();
            this.db = this.client.db('User')
            this.collection =this.db.collection('user')
            this.isConnected = true;
        }catch (err){console.log(err)}
    }

    async isExistingUser(){}
    async isExistingEmail(){}
    async insertUser(userObj) {
        this.collection.insertOne(userObj)
    }
}

const dbClient = new DBClient()
export default dbClient
