import jwt from 'jsonwebtoken';

//middleware->if user is logged in then only certain actions can be performed(authorization)

export const verifyToken = async(req,res,next) => {
    try {
        let token = req.header("Authorization");//from frontend authorization header will be grabbed

        if(!token) {
            return res.status(403).send("Access denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();// (Bearer ) in 7 letters k age token lagega-> Bearer (token)
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET);

        req.user = verified;
        next();
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}