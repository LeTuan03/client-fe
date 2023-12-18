import axios from "axios";
const URL = "http://localhost:8080/volunteer-campaign-management/api/v1";
const donateApi = {
  async getDonate(data) {
    const url = URL + "/pay";
    try {
      const response = await axios.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    const url = URL + "/donor/list";
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async searchDonor(data) {
    const url = URL + "/searchDonor";
    let config = {
      params: {
        name: data,
      },
    };
    try {
      const response = await axios.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default donateApi;
