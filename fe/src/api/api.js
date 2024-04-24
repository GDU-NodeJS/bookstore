import axios from 'axios';
import Cookies from 'universal-cookie';
const apiUrl = 'http://localhost:8090/api'
const cookies = new Cookies
const request = async ({ url, params = {}, method = 'get', data = {} }) => {
    try {
        const response = await axios({ method, url, params, data });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Xử lý các lỗi từ phía máy chủ
            throw error.response.data;
        } else if (error.request) {
            // Xử lý các lỗi kết nối
            throw 'Kết nối không thành công. Vui lòng kiểm tra lại mạng của bạn.';
        } else {
            // Xử lý các lỗi khác
            throw error.message;
        }
    }
};
const requestWithToken = async (url, params = {}, method = 'get', data = {}) => {
  const token = cookies.get('token');
  if (!token) {
    console.error("Token not found in cookie.");
    return Promise.reject("Token not found in cookie.");
  }
  const headers = { Authorization: `Bearer ${token}` };
  try {
    return await axios({ method, url, params, data, headers });
  } catch (error) {
    throw error.response.data || error.message;
  }
};
const handleRequestError = (error) => {
    console.error("Request error:", error);
    throw error;
};
const bookApi = {
    getAll: async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/guest/book/getAll`)
        return response.data;
      } catch (error) {
        handleRequestError(error);
      }
    },
    getById: async (id) => {
      try {
        const response = await axios.get(`http://localhost:8090/api/guest/book/${id}`);
        return response.data;
      } catch (error) {
        handleRequestError(error);
      }
    },
};
const categoryApi = {
  getAll: async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/guest/category/getAll`)
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },
}
const authenticateApi = {
  authen: async (params) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/guest/auth/authenticate`,params)
      return response.data;
    } catch (error) {
      handleRequestError(error)
    }
  }
}
const orderApiForCustomer = {
  getAll: async (token) => {
    try {
      console.log('token gui di: ', token)
      axios.defaults.withCredentials = true
      const response = await axios.get(`http://localhost:8090/api/customer/order/getAll`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  cancel: async (id) => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.get(`http://localhost:8090/api/customer/order/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  }
}
const cartApi = {
  getAll: async () => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.get(`http://localhost:8090/api/customer/cart/getAll`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  getAllNoToken: async () => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.get(`http://localhost:8090/api/guest/cart/getAll`)
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  add: async (id) => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/customer/cart/add/${id}`,null,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  addHaveQuantity: async (id,quantity) => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/customer/cart/add/${id}/${quantity}`,null,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  addNoToken: async (id) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/guest/cart/add/${id}`)
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  addNoTokenHaveQuantity: async (id,quantity) => {
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/guest/cart/add/${id}/${quantity}`)
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  delete: async (id) =>{
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/customer/cart/delete/${id}`,null,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  deleteNoToken: async (id) =>{
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/guest/cart/delete/${id}`)
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  update: async (id,quantity) => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/customer/cart/update/${id}/${quantity}`,null,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  },
  updateNoToken: async (id,quantity) => {
    const token = cookies.get('token')
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(`http://localhost:8090/api/guest/cart/update/${id}/${quantity}`)
      return response.data
    } catch (e) {
      handleRequestError(e)
    }
  }
}
export {bookApi, categoryApi, authenticateApi, orderApiForCustomer, cartApi}
