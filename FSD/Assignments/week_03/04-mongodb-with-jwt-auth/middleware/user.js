import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config.js';

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization || req.headers.token || req.headers.Authorization; // Every thing will be converted to lowercase

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized User',
        });
    }

    // when we are accessing headers.
    const words = token.split(' '); // This will be converted into array ["Bearer", "token"]
    // We need token
    const jwtToken = words[1]; // This will be the token

    const decodedValue = jwt.verify(jwtToken, JWT_Secret);
    req.username = decodedValue.username;
    // Here we are not calling Database to verify the username and password. JWT Saves
    // database call
    if (!decodedValue.username) {
        return res.status(403).json({
            message: 'You are not authorized to access this resource',
        });
    }

    next();
}

export default userMiddleware;
