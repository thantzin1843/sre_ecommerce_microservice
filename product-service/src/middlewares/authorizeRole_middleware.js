
const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {

    try {

        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            return res.status(401).json({
                message: "Access token required"
            });
        }


        // Header format:
        // Authorization: Bearer <token>

        const token = authHeader.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }


        // 2. Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        /*
          decoded contains:

          {
            email:"admin@gmail.com",
            role:"ADMIN",
            iat:xxx,
            exp:xxx
          }

        */
       if(decoded.role !== requiredRole){

            return res.status(403).json({
                message:"Forbidden. Admin access required"
            });

        }



        // 3. Attach user information to request
        req.user = decoded;


        next();


    } catch(error){

        return res.status(401).json({
            message:"Invalid or expired token"
        });

    }

};


module.exports = authenticate;