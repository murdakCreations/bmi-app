import http from "../http-common"

class StudentBMIDataService {
    getAll() {
        return http.get("/studentBMI")
    }

    create(data) {
        return http.post("/studentBMI", data)
    }
}

export default new StudentBMIDataService()