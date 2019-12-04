const { MongoClient } = require('mongodb');
const mongodbUrl = 'mongodb://127.0.0.1:27017';

// MongoClient.connect(mongodbUrl,{useUnifiedTopology: true}, (err, client) => {
// 	if (err) throw err;
//     const db = client.db('day');
//     console.log('数据库连接成功')
//     const collection = db.collection('user');
//     collection.insert({"username":"tang","str":[1,2,3],"age":25},(err)=>{
//         if (err) throw err;
//         console.log('chenggong')
//         client.close()
//     })
// })
 const seq = {
    remove: ()=>{
        MongoClient.connect(mongodbUrl,{useUnifiedTopology: true}, (err, client) => {
            	if (err) throw err;
                const db = client.db('day');
                console.log('数据库连接成功')
                const collection = db.collection('user');
                collection.remove({"username":"tang","str":[1,2,3],"age":25},(err)=>{
                    if (err) throw err;
                    console.log('chenggong')
                    client.close()
                })
            })
    }
};
export default seq
