module.exports = (userRole, role) => {
  if(!userRole){
    return false;
  }
  if(userRole.role !== role){
    return false;
  }
  return true;
}