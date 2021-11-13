import { ControllerFn } from '../utils/types';
import {
  validateEmail,
  validatePasswordStrength,
  validateUsername,
} from '../utils/validation';
import { createAccessToken, createRefreshToken } from '../utils/token';
import { User } from '../models/User';
import { compare, hash } from 'bcryptjs';
import { ErrorResponse } from '../utils/ErrorResponse';
export const signup: ControllerFn = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ where: [{ username }, { email }] });
    const usernameError = validateUsername(username);
    if (usernameError)
      return next(new ErrorResponse(usernameError, 400, 'username'));

    if (user)
      return next(
        new ErrorResponse('Username Already Exists', 400, 'username')
      );

    if (!validateEmail(email))
      return next(new ErrorResponse('Invalid Email', 400, 'email'));

    if (!validatePasswordStrength(password))
      return next(new ErrorResponse('Too Weak Password.', 400, 'password'));

    if (password !== confirmPassword)
      return next(
        new ErrorResponse("Passwords Don't Match.", 400, 'confirmPassword')
      );

    const newUser = await User.create({
      email,
      username,
      password: await hash(password, 12),
    }).save();

    res.cookie('jid', createRefreshToken(newUser), { httpOnly: true });

    return res.status(201).json({
      success: true,
      message: 'Sign Up Successfully.',
      user: {
        email: newUser.email,
        username: newUser.username,
      },
      token: createAccessToken(newUser),
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const login: ControllerFn = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    let user: User | undefined;

    if (!usernameOrEmail.includes('@')) {
      user = await User.findOne({ where: { username: usernameOrEmail } });
    } else {
      user = await User.findOne({ where: { email: usernameOrEmail } });
    }

    if (!user)
      return next(
        new ErrorResponse("User Doesn't Exist.", 404, 'usernameOrEmail')
      );

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword)
      return next(new ErrorResponse('Wrong Password.', 400, 'password'));

    res.cookie('jid', createRefreshToken(user), { httpOnly: true });

    const token = createAccessToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login Successfully.',
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const deleteUser: ControllerFn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne(parseInt(id));
    if (!user) return next(new ErrorResponse(`No User Found With ID: ${id}`));

    await User.delete(id);
    return res.status(200).json({
      success: true,
      message: `User With the ID: ${id} Has Been Deleted.`,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
