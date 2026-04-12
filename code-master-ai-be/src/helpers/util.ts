import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    // Đã sửa thành bcrypt.compare để kiểm tra chính xác
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const generateVerificationCode = async (length = 5) => {
  const CHAR_SET = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHAR_SET.length);
    result += CHAR_SET[randomIndex];
  }
  return result;
};
