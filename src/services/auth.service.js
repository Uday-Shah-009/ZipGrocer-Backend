import bcrypt from "bcrypt"
import { addUser, findByID, findUserByEmail } from "../DOA/auth.doa.js"
import { sign_jwt } from "../utils/jwtHelper.js";

const saltRounds = 10;
export const registerUserService = async(user) => {
    const existinguser = await findUserByEmail(user.email);
    if(existinguser){
        throw new Error("user already registered");
    }
    const hash = await bcrypt.hash(user.password,saltRounds);
    const userToSave = {
    ...user,
    password: hash,
  };
    const createdUser = await addUser(userToSave);
    const token = sign_jwt({id: createdUser._id, role: createdUser.role});
    return {createdUser,token};
};


export const loginUserService = async(user) => {
  const existinguser = await findUserByEmail(user.email);
  const isMatch = await bcrypt.compare( user.password, existinguser.password);
  if(!existinguser || !isMatch){
     throw new Error("Invalid Credentails");
  }
  const token = sign_jwt({id: existinguser._id, role: existinguser.role})
  return {token, existinguser};
}

export const userProfileService = async(id) => {
  const user = await findByID(id);
  return user;
}