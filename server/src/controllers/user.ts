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
import { sendEmail } from '../utils/sendEmail';
import { __prod__ } from '../utils/constants';
import { verify } from 'jsonwebtoken';
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

    return res.status(201).json({
      success: true,
      message: 'Sign Up Successfully.',
      user: {
        email: newUser.email,
        username: newUser.username,
        token: createAccessToken(newUser),
      },
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

    const token = createAccessToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login Successfully.',
      user: {
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const deleteUser: ControllerFn = async (req, res, next) => {
  try {
    const user = await User.findOne(req.payload?.userId);
    if (!user)
      return next(
        new ErrorResponse(
          `User with the ID: ${req.payload?.userId} doesn't exist.`
        )
      );

    await User.delete(req.payload!.userId);
    return res.status(200).json({
      success: true,
      message: `User ${user.username} has been deleted.`,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
export const forgotPassword: ControllerFn = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email))
      return next(new ErrorResponse('Invalid Email.', 400, 'email'));
    const user = await User.findOne({ where: { email } });
    if (!user)
      return next(new ErrorResponse("User Doesn't Exist.", 404, 'email'));
    const refreshToken = createRefreshToken(user);
    sendEmail(
      email,
      `
      <h2>Reset Password Confirmation</h2>
      <p>Click the link below to continue to process of recovering password.</p>
      <a href=${
        __prod__
          ? `${process.env.CORS_ORIGIN_PRODUCTION}/reset-password/${refreshToken}`
          : `${process.env.CORS_ORIGIN}/${refreshToken}`
      }>
     Reset Password</a>
    `
    );
    return res.send(`Verification Message Has Been Sent to: ${email}`);
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const resetPassword: ControllerFn = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!token) return next(new ErrorResponse('No Token Provided.', 401));

    const payload = verify(token, process.env.JWT_REFRESH_TOKEN_KEY!);
    req.payload = payload as any;

    const user = await User.findOne(req.payload?.userId);
    if (!user)
      return next(
        new ErrorResponse(
          `No User Found With the ID: ${req.payload?.userId}`,
          404
        )
      );

    if (!validatePasswordStrength(password))
      return next(new ErrorResponse('Too Weak Password', 400, 'password'));

    if (password !== confirmPassword)
      return next(
        new ErrorResponse("Passwords Don't Match.", 400, 'confirmPassword')
      );
    const hashedPassword = await hash(password, 12);
    await User.update(req.payload!.userId, { password: hashedPassword });

    return res.status(200).json({
      success: true,
      message: 'Password Updated.',
      user: {
        username: user.username,
        email: user.email,
        token: createAccessToken(user),
      },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const updateUserProfile: ControllerFn = async (req, res, next) => {
  try {
    const { username, email, password, newPassword, confirmNewPassword } =
      req.body;
    const user = await User.findOne(req.payload!.userId);
    if (user) {
      if (username) {
        const isInvalidUsername = validateUsername(username);
        if (isInvalidUsername)
          return next(new ErrorResponse(isInvalidUsername, 400, 'username'));
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser || username === user?.username)
          return next(
            new ErrorResponse('Username Already Exists.', 400, 'username')
          );
      }
      if (email)
        return next(
          new ErrorResponse('Email Cannot Be Changed.', 400, 'email')
        );

      if (password) {
        const isValidPassword = await compare(password, user!.password);
        if (!isValidPassword)
          return next(new ErrorResponse('Wrong Password.', 400, 'password'));
        if (newPassword !== confirmNewPassword)
          return next(
            new ErrorResponse(
              "Passwords Don't Match.",
              400,
              'confirmNewPassword'
            )
          );
        if (!validatePasswordStrength(newPassword))
          return next(new ErrorResponse('Too Weak Password.', 400, 'password'));
      }
      await User.merge(user, { username, password: newPassword }).save();
      return res.status(200).json({
        success: true,
        message: 'Profile Updated.',
        user: {
          username: user?.username,
          email: user?.email,
          token: createAccessToken(user),
        },
      });
    } else {
      return next(
        new ErrorResponse(
          `No User Found With the ID: ${req.payload?.userId}`,
          404
        )
      );
    }
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
