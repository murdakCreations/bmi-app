import http from "../http-common";

class BMIDataService {
  getAll() {
    return http.get("/bmidata");
  }
}

export default new BMIDataService();