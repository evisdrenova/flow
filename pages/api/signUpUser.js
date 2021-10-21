//code for signing up a user

import { route } from 'next/dist/server/router';
import { useRouter, Router } from 'next/router'
import { redirect } from 'next/dist/server/api-utils';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const uuid = require('uuid').v4

const jwt = require('jsonwebtoken')
const jwtSecret = '089be9033ae38509957dc98a7a7986a3aafed345275506329e59afe27b463175'



const url = 'mongodb+srv://evisd:secure_db_password@cluster0.dmq8r.mongodb.net'
const dbName = 'flow'

const saltRounds = 10

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


function createUser(db, first_name, last_name, email, company, password, callback) {
    const collection = db.collection('user');
    collection.insertOne({
        userId: uuid(),
        first_name,
        last_name,
        email,
        company,
        password
    }, callback)
}


function findUser(db, email, callback) {
    const collection = db.collection('user');
    collection.findOne({ email }, callback);
}


export default async (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method == 'POST') {
            client.connect(function (err) {
                console.log("Connected to the MongoDb server =>")
                const first_name = req.body.first_name
                const last_name = req.body.last_name
                const company = req.body.company
                const email = req.body.email
                const password = bcrypt.hashSync(req.body.password, saltRounds)
                const db = client.db(dbName)
                findUser(db, email, function(err, user) {
                    if (user) { 
                        res.status(401).json({error: true, message:"User already exists"})
                        resolve()
                    }
                    else{
                        createUser(db, first_name, last_name, email, company, password, function (err, user) {
                            if (user) {
                                const token = jwt.sign({userId: user.userId, email: user.emailId},
                                    jwtSecret,{expiresIn: 3000,})
                                    res.status(200).json({token})
                                resolve()
                            } else {
                                res.status(401).json({ error: true, message: "Error creating the user" })
                                resolve()
                            }
                        })
                    }
                })
            })
        }
    })
}

