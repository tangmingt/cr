const { MongoClient } = require('mongodb');

const mongodbUrl = 'mongodb://127.0.0.1:27017';


const api = {
    ap(id) {
        return new Promise((resolve,reject) => {
            MongoClient.connect(mongodbUrl,{useUnifiedTopology: true}, (err, client) => {
                if (err) throw err;
                const db = client.db('day');
                // console.log('数据库连接成功')
                const collection = db.collection('user_id');
                collection.find({ id:id }, {"_id": 0}).toArray((err, data) => {
                    if (err) {
                        reject(err)
                        client.close();
                    }else{
                        resolve(data)
                        client.close();
                    }
                    
                })
            })
        })
        
    }
}

module.exports = {
    api
}