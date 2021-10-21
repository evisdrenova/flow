const jwt  = require('jsonwebtoken')
const jwtSecret = '089be9033ae38509957dc98a7a7986a3aafed345275506329e59afe27b463175'

export default(req,res) => {
    if(req.method == 'GET'){
        if(!('token' in req.cookies)){
            res.status(401).json({message: 'Unable to authenticate user'})
            return
        } 
    }
    let decoded;
    const token = req.cookies.token
    if(token){
        try{
            decoded = jwt.verify(token, jwtSecret)
        } catch(e){
            console.log('this is the error',e)
        }
    }
    if(decoded){
        res.json(decoded)
        return
    } else{
        res.status(401).json({message: 'unable to authenticate'})
    }

}