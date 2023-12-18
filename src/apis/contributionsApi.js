import axiosClient from "./axiosClient";
import axios from "axios";

let URL = "http://localhost:8080/volunteer-campaign-management/api/v1";
const contributionsApi = {
  async getAll() {
    const url = URL + "/getAllContributions";
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async search(data) {
    const url = URL + "/search";
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

export default contributionsApi;
