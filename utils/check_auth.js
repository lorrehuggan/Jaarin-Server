import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT = process.env.JWT;

export const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer
    const token = authHeader.split(' ')[0];
    if (token) {
      try {
        const user = jwt.verify(token, JWT);
        return user;
      } catch (error) {
        throw new Error('Invalid / Expired Token');
      }
    }
    throw new Error('Authentication token must be Bearer [token]');
  }
  throw new Error('Authorization header must be provided');
};
