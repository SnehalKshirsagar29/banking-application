import axios from "axios";

const ACC_BASE_URL = 'http://localhost:8080/api'; 

class NotificationApis {

    getAllNotifications() {
        console.log("api.getallnoti");
        return axios.get(ACC_BASE_URL + '/notifications');
    }
/* 
 getAllNotifications(accountNumber) {
        return axios.get(ACC_BASE_URL + '/' + accountNumber + '/statements');
    }
    doTransaction(transaction) {
        return axios.put( ACC_BASE_URL + '/transaction/' + transaction.accountNumber, transaction);
    }

    // debitAmount(transaction) {
    //     return axios.put(ACC_BASE_URL + '/transaction/' + transaction.accountNumber, transaction);
    // }

    getBalance(accountNumber) {
        return axios.get(ACC_BASE_URL + '/balance/' + accountNumber);
    }

    getAccountById(accountNumber) {
        return axios.get(ACC_BASE_URL+'/'+accountNumber);
    } */

}

export default new NotificationApis();
