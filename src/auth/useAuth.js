import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Function to check if the token is expired
const checkTokenValidity = () => {
  let data = sessionStorage.getItem("authToken");
  if (data == null) {
    return false;
  } else {
    const tokenParts = data.split(".");
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < payload.exp;
      }
    }
    return false;
  }
};

// Hook for authentication
export const useAuth = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(checkTokenValidity);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkTokenValidity()) {
        navigate("/login");
        clearInterval(interval); // Clear interval once redirected
      } else {
        setIsValid(true);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [navigate]);

  return isValid;
};
