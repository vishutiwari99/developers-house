const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class ActivateController {
  async activate(req, res) {
    const { name, avatar, gender } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required" });
    }
    // Image-Base64
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({
        message: "Could not process the image",
      });
    }
    const userId = req.user._id;
    // update user
    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      }
      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.gender = gender;
      user.save();
      res.json({
        user: new UserDto(user),
        auth: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went Wrong",
      });
    }
  }
}

module.exports = new ActivateController();
