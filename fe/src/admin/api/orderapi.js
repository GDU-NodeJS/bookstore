import axios from "axios";
import CookieService from "./cookie";

const apiUrl = "http://localhost:8090/api/admin";

axios.defaults.withCredentials = true;

const orderApi = {
  getAllOrders: async () => {
    try {
      axios.defaults.withCredentials = true;
      const headers = await getRequestHeaders();
      const response = await axios.get(`${apiUrl}/order/getAll`, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      axios.defaults.withCredentials = true;
      const headers = await getRequestHeaders();
      const response = await axios.get(`${apiUrl}/order/${orderId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getUserOrders: async (userID) => {
    try {
      axios.defaults.withCredentials = true;
      const headers = await getRequestHeaders();
      const response = await axios.get(`${apiUrl}/order/user/${userID}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getOrderStatus: async () => {
    try {
      axios.defaults.withCredentials = true;
      const headers = await getRequestHeaders();
      const response = await axios.get(`${apiUrl}/order/status`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      axios.defaults.withCredentials = true;
      const headers = await getRequestHeaders();
      const response = await axios.post(
        `${apiUrl}/order/update/${orderId}?status=${status}`,
        {},
        { headers }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

const getRequestHeaders = async () => {
  let token = sessionStorage.getItem("jwt"); // Lấy token từ session
  if (!token) {
    // Nếu không tìm thấy token trong session, thử lấy từ cookie
    token = CookieService.getCookie("jwt");
  }
  if (!token) {
    console.error("Token not found in session or cookie.");
    throw new Error("Token not found in session or cookie.");
  }
  return { Authorization: `Bearer ${token}` };
};

export default orderApi;
