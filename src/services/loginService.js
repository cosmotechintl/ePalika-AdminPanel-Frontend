import { publicRequest } from "../utils/requestMethod";
export const loginAdmin = async (loginDetail) => {
  const response = await publicRequest.post("/authenticate", loginDetail);
  return response.data;
};
