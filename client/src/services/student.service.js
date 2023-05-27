import http from "../http-common"

class StudentBMIDataService {
    getAll() {
        return http.get("/studentBMI")
    }

    get(studentID) {
        return http.get(`/studentBMI/${studentID}`)
    }

    create(data) {
        return http.post("/studentBMI", data)
    }

    update(studentID, data) {
        return http.put(`/studentBMI/${studentID}`, data)
    }

    delete(studentID) {
        return http.delete(`/studentBMI/${studentID}`)
    }

    deleteAll() {
        return http.delete(`/studentBMI`)
    }

}

export default new StudentBMIDataService()