const createTokenUser = (user) => {
  return {name: user.name, id: user.id, role: user.role, email: user.email};
};

export default createTokenUser;
