import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT = process.env.JWT;

export const checkAuth = (auth) => {
  const authHeader = auth;
  if (authHeader) {
    const token = authHeader.split(' ')[0];
    const user = jwt.verify(token, JWT);
    return user;
  } else {
    console.log({ error: 'Authorization not provided' });
    return;
  }
};
