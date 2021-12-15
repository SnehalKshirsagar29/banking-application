import axios from "axios";

const ACC_BASE_URL = 'http://localhost:3038/api'; 

class NotificationApis {

    // get customer wise notifications
    getNotificationsByCustomerId(customerId) {
        return axios.get(ACC_BASE_URL + '/notifications/customer/'+customerId);
    }

    // get all notifications present in database
    getAllNotifications() {
        return axios.get(ACC_BASE_URL + '/notifications');
    }
 
    //get customerwise specific notificatuion
    //  /customer/{customerid}/notification/{id}
    getNotificationByCustomerIdAndNotificationId(customerId,notificationId) {
        return axios.get(ACC_BASE_URL +  '/customer/'+customerId+  '/notification/' +notificationId);
    }

}

export default new NotificationApis();