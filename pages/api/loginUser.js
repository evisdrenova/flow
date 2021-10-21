//code to auth a user

import { route } from 'next/dist/server/router';
import { useRouter, Router } from 'next/router'
import { redirect } from 'next/dist/server/api-utils';


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const jwtSecret = '089be9033ae38509957dc98a7a7986a3aafed345275506329e59afe27b463175'


const url = 'mongodb+srv://evisd:secure_db_password@cluster0.dmq8r.mongodb.net'
const dbName = 'flow'

const saltRounds = 10

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


function findUser(db, email, password, callback) {
    const collection = db.collection('user');
    collection.findOne({ email }, callback);
}



export default async(req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method == 'POST') {
            client.connect(function (err) {
                console.log("Connected to the MongoDb server =>")
                const email = req.body.email
                const password = req.body.password
                const db = client.db(dbName)
    
                 findUser(db, email, password, function (err, user) {
                    if (user) {
                        console.log(user)
                        const hash = bcrypt.hashSync(password, saltRounds)
                        const result = bcrypt.compareSync(password, user.password)
                        console.log(result)
                        if (result) {
                            const token = jwt.sign(
                                {userId: user.userId, email: user.email},
                                jwtSecret,
                                {expiresIn: 3000}, // 50 min 
                            )
                            //console.log(token) //finish implementing the jwt token validation
                             res.status(200).json({token})
                             resolve()                     
                        } else {
                           res.status(401).json({error:true, message:"incorrect username or email"})
                            resolve()
                        }
                    } else {
                        res.status(401).json({error:true, message:"incorrect username or email"})
                        resolve()
                    }
                })
    
            })
        }
    })
}