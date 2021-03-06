const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    console.log(phone);
    if (!phone) {
      res.status(400).json({
        msg: "Phone field is requied",
      });
    }
    const otp = await otpService.generateOtp();
    // hash otp
    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send otp
    try {
      // await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone: phone,
        otp: otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "message sending failed",
      });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({
        message: "OTP expired",
      });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json({
        message: "Invalid otp",
      });
    }
    let user;
    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "DB error" });
    }
    // token
    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });
    // save refresh token in DB
    tokenService.storeRefreshToken(refreshToken, user._id);
    // store resfresh token in cookies
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }
  async refresh(req, res) {
    // Get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // Check if token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
    // check if token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Internal error",
      });
    }
    // check if valid user
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Generate new token
    const { refreshToken, accessToken } = tokenService.generateToken({
      _id: userData._id,
    });
    // update refreshToken
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({
        message: "Internal error",
      });
    }
    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }
  async logout(req, res) {
    // delete refresh token from db
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);
    // delete cookie
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({
      user: null,
      auth: false,
    });
  }
}
module.exports = new AuthController();
