export const host = "https://chatapp-backend-mg8c.onrender.com";
export const registerRoute = `${host}/api/auth/register`;  //this route matches with our register route in backend and so the post request made here will be transferred to backend server
export const loginRoute = `${host}/api/auth/login`;  //this route matches with our login route in backend and so the post request made here will be transferred to backend server
export const setAvatarRoute = `${host}/api/auth/setAvatarRoute`;  
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
