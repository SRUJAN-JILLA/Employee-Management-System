
export const environment = {
    production: false,
    /* All URLs related to Employee Service */
    baseURL: "http://localhost:8080/employees",
    subscribeUrl: "http://localhost:8080/subscribe",
    addEmployeeUrl:  "http://localhost:8080/employees/add",
    updateEmployeeUrl:"http://localhost:8080/employees/update",
    getNotificationsAfterDeleteUrl: "http://localhost:8080/employees/getNotificationsAfterDelete",
    getNotificationUrl: "http://localhost:8080/employees/notifications",
    deleteNotificationUrl: "http://localhost:8080/employees/notifications",
    loginAttemptsUrl: "http://localhost:8080/employees/loginAttempts",
    lockTimeUrl: "http://localhost:8080/employees/lockTime",
    lockTimeLeftUrl: "http://localhost:8080/employees/lockTimeLeft",
    emailExistsUrl: "http://localhost:8080/employees/emailExists",
    downloadUrl: "http://localhost:8080/employees/download",
    changePasswordUrl: "http://localhost:8080/employees/changePassword",
    changeActiveUrl: "http://localhost:8080/employees/changeActive",
    changeActiveMailUrl: "http://localhost:8080/employees/changeActive/mail",

    /* All URLs related to Login Service */
    generateTokenUrl: "http://localhost:8080/generate-token",
    currentUserUrl: "http://localhost:8080/current-user"
}   
