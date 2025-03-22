import jwt from "jsonwebtoken";
import ms from "ms";

export const generateTokenAndSetCookie = (res, user) => {
  const tokenData = { _id: user._id };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

  res.cookie("token", token, {
    expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES)),
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
// secure: process.env.NODE_ENV === "production",

  return token;
};
