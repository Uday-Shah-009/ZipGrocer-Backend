import { verify_jwt } from "../utils/jwtHelper.js";

export const authMiddleware = (req,res,next) => {
  const token = req.cookies.token;
  if(!token) res.status(401).json({message: "unauthorized"});
  const decoded = verify_jwt(token);
  req.user = decoded;
  next();
}