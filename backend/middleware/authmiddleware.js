
import jwt from "jsonwebtoken"

 export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Access Denied. No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, "secretkey"); 
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token" });
    }
};

export default  authMiddleware;
