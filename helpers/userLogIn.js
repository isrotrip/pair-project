return (user) => {
  if(!user){
    return 'guest';
  }
  else {
    return user.role
  }
}