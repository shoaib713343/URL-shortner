import { validateUserToken } from "../utils/token.js";

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']; // Corrected line

    if (!authHeader) return next();

    if (!authHeader.startsWith('Bearer')) {
        return res.status(400).json({ error: 'Authorization header must start with Bearer' });
    }

    const [_, token] = authHeader.split(" ");

    try {
        const payload = validateUserToken(token);
        req.user = payload;
        next();
    } catch (error) {
        // Handle token validation errors gracefully
        console.error("Token validation error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export function ensureAuthenticated(req, res, next){
    if(!req.user || !req.user.id){
        return res.status(401).json({ error: "You must be logged in to access this resource" });
    }
    next();
}