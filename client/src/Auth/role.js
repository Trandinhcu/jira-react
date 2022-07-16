let user = localStorage.getItem('user') ;
let role = {};
if(user){
    user = JSON.parse(user);
    role = user.role;
}
export const isAdmin = role.name === "admin";
export const isPm = role.name === "pm";
export const isBa = role.name === "ba";
export const isDev = role.name === "dev";
export const isTester = role.name === "tester"