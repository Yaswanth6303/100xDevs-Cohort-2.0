import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config.js';

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization || req.headers.token || req.headers.Authorization; // Check both authorization and token headers
    // when we are accessing headers.
    // console.log("All headers:", req.headers);
    // console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized Admin',
        });
    }

    const words = token.split(' '); // This will be converted into array ["Bearer", "token"]
    // We need token
    const jwtToken = words[1]; // This will be the token

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_Secret);
        // Here we are not calling Database to verify the username and password. JWT Saves
        // database call
        if (!decodedValue.username) {
            return res.status(403).json({
                message: 'You are not authorized to access this resource',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
}

export default adminMiddleware;
