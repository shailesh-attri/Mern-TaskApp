import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        // Extract token from browser cookie
        const cookies = req.headers.cookie;
        const token = cookies.split(';').find(cookie => cookie.trim().startsWith('userToken='));

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the decoded user ID to the request object for further use
        req.userID = decoded?.userID;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // If token is invalid or expired, return an error response
        return res.status(401).json({ message: "Invalid token or expired" });
    }
};

export default verifyToken;