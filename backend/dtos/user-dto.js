class UserDto {
  id;
  name;
  avatar;
  gender;
  phone;
  activated;
  createdAt;
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.avatar = user.avatar ? `${process.env.BASEURL}${user.avatar}` : null;
    this.gender = user.gender;
    this.phone = user.phone;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
