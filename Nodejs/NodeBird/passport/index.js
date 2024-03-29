const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy.js");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // session에 user의 id만 저장
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
