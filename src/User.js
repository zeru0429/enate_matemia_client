import axios from "axios";

const BASE_URL = "http://localhost:8100"; // Replace this with your backend URL

export const getUserRole = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
