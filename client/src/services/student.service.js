import http from "../http-common"

class StudentBMIDataService {
    getAll() {
        return http.get("/studentBMI")
    }
}

export default new StudentBMIDataService()