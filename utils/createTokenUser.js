const createTokenUser = (user) => {
  return {name: user.name, id: user.id, role: user.role};
};

export default createTokenUser;
