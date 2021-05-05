import axios from "axios";

export default {
  getRandomEmp: function() {
    return axios.get("https://randomuser.me/api/?results=12");
  }
};
