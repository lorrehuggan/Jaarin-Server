import bcrypt from 'bcryptjs';

const emailRegEx =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const usernameRegEx = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

// export const loginValidate = (username, password) => {
//   if (!username || typeof username !== 'string') {
//     throw new UserInputError('username invalid', {
//       error: {
//         password: 'username invalid',
//       },
//     });
//   }

//   if (!password || typeof password !== 'string') {
//     throw new UserInputError('password invalid', {
//       error: {
//         password: 'password invalid',
//       },
//     });
//   }

//   if (password.length < 6) {
//     throw new UserInputError('password invalid', {
//       error: {
//         password: 'Password length must be 6 or more characters long',
//       },
//     });
//   }
// };

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

// export const newUsernameValidate = (username) => {
//   if (!username || typeof username !== 'string') {
//     throw new UserInputError('username invalid');
//   }
// };

// export const passwordValidate = async (password, user) => {
//   const pwCheck = await bcrypt.compare(password, user.password);

//   if (!pwCheck) {
//     throw new UserInputError('Very Bad Credentials');
//   }
// };
