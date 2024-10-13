import jwt from 'jsonwebtoken'


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw new Error("Token Null");
    
    // console.log(token)
    // console.log("asdd")
    // console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        // console.log(user)
        req.user = user
        next()
    })
}

export default authenticateToken;
