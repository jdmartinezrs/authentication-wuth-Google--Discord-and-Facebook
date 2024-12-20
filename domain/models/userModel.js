

const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");

class User{
 

    async aggregate (data) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const res = await collection.aggregate([...data]).toArray();
        return res;
    }

}

module.exports = User;