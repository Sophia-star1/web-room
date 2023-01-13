export const openDoor = (userList) => {
  if (userList === [] || userList === null) {
    return false;
  }
  for (let user of userList) {
    if (user.score <= 85) {
      return true;
    }
  }
  return false;
};
