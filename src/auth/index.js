import { updateAuthToken } from "../utils/requestMethod";
//check user
export const isLoggedIn = () => {
  let data = sessionStorage.getItem("authToken");
  if (data == null) {
    return false;
  } else {
    const tokenParts = data.split(".");
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload.exp) {
        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < payload.exp;
      }
    }
    return false;
  }
};
//do login
export const performLogin = (response, next) => {
  sessionStorage.setItem("authToken", JSON.stringify(response.data.token));
  updateAuthToken();
  next();
};
//do logout
export const performLogout = (next) => {
  sessionStorage.removeItem("authToken");
  updateAuthToken();
  next();
};
