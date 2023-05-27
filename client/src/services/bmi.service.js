import http from "../http-common";

class BMIDataService {
  getAll() {
    return http.get("/bmidata");
  }

  create(data) {
    return http.post("/bmidata", data);
  }
}

export default new BMIDataService();