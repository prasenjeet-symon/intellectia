import { NextFunction, Request, Response } from "express";

/** Verify the JSON WEB TOKEN */
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  
    const jwt = require("jsonwebtoken");
    // Get the authentication token from the request headers, query parameters, or cookies
    // Example: Bearer <token>
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : req.query.token;
  
    // Verify and decode the token
    try {
      // Verify the token using your secret key or public key
      const decodedToken = jwt.verify(token, JWT_SECRET);
  
      // Set the userId and email in the request object
      res.locals.userId = decodedToken.userId;
      res.locals.email = decodedToken.email;
      res.locals.isAdmin = decodedToken.isAdmin;
      // Move to the next middleware
      next();
    } catch (error) {
      // Token verification failed
      res.status(401).json({ error: "Invalid token" });
      return;
    }
  };