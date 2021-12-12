import axios from "axios";

const ACC_BASE_URL = 'http://localhost:2222/api/account';
class AccountApis {

    getAllTransactions(accountNumber) {
        return axios.get(ACC_BASE_URL + '/' + accountNumber + '/statements');
    }

    doTransaction(transaction) {
        return axios.put( ACC_BASE_URL + '/transaction/' + transaction.accountNumber, transaction);
    }

    getBalance(accountNumber) {
        return axios.get(ACC_BASE_URL + '/balance/' + accountNumber);
    }

    getAccountById(accountNumber) {
        return axios.get(ACC_BASE_URL+'/'+accountNumber);
    }

    getSortedStatementBetweenDates(accountNumber, startDate, endDate) {
        return axios.get(ACC_BASE_URL + '/' + accountNumber + '/statements/sort',
         {
             //?start_date='+startDate+'&&end_date='+endDate+'&&sort=amount&&sort_order=asc&size=10&page=0
             params: {
               'start_date': startDate,
               'end_date': endDate,
               'sort': 'amount',
               'sort_order': 'asc',
               'size': 10,
               'page': 0
             }
         }
         );
    }

}

export default new AccountApis();