import crypto from 'crypto';
// ------------------------------------------------------

//  token hash 해주기
const hashToken = (token) => {
  return crypto.createHash('sha512').update(token).digest('hex');
};

//  verification token 생성
const createVerificationToken = () => crypto.randomBytes(40).toString('hex');

//  bcrypt compare password
const comparePassword = async (writtenPassword, realPassword) => {
  const isMatch = await bcrypt.compare(writtenPassword, realPassword);
  return isMatch;
};

//  export functions
export {createVerificationToken, hashToken, comparePassword};
