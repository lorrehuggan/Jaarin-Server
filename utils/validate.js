import jwt from 'jsonwebtoken';
import { JWT } from './check_auth.js';

const emailRegEx =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const usernameRegEx = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

export const loginValidate = (username, password) => {
  if (!username || typeof username !== 'string') {
    throw new Error('username invalid');
  }

  if (!password || typeof password !== 'string') {
    throw new Error('password invalid', {
      error: {
        password: 'password invalid',
      },
    });
  }

  if (password.length < 6) {
    throw new Error('password invalid', {
      error: {
        password: 'Password length must be 6 or more characters long',
      },
    });
  }
};

export const signupValidate = (
  password,
  confirmPassword,
  username,
  email,
  currency
) => {
  if (!currency || typeof currency !== 'string') {
    throw new Error('Currency invalid');
  }
  if (!password || typeof password !== 'string') {
    throw new Error('Password Invalid');
  }

  if (password.length < 6) {
    throw new Error('Password must be 6 or more characters long');
  }

  if (!confirmPassword || password !== confirmPassword) {
    throw new Error('passwords dont match please retry');
  }

  if (!emailRegEx.test(email)) {
    throw new Error('Email is not valid');
  }

  if (!usernameRegEx.test(username)) {
    throw new Error(
      'Username must be between 3-15 characters. Letters and numbers only'
    );
  }
};

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      currency: user.currency,
    },
    JWT,
    { expiresIn: '1h' }
  );
};
