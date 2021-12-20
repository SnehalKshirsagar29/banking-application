import axios from "axios";

const ACC_BASE_URL = 'http://localhost:8080/api/account-service'; //http://sypulfkjbfg3.synechron.com:2222/api/account
class AccountApis {
    // headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})
    loginToAccount(username, passwd) {
        return axios.get(ACC_BASE_URL + '/login', {
            params: {
              'username': username,
              'password': passwd
            }
        });
    }

    getAllTransactions(accountNumber) {
        return axios.get(ACC_BASE_URL + '/accounts/' + accountNumber + '/get-all-transactions');
    }

    getAllUsers() {
        // const roles = ['Super Admin','Admin'];
        return axios.get(ACC_BASE_URL + '/get-all-users');
    }

    getAllAccounts() {
        return axios.get(ACC_BASE_URL + '/accounts/get-all-accounts');
    }

    doTransaction(transaction) {
        return axios.put( ACC_BASE_URL + '/accounts/'+transaction.accountNumber+'/transaction', transaction);
    }

    createAccount(account) {
        return axios.post( ACC_BASE_URL + '/accounts/add-account', account, {
            'Access-Control-Allow-Origin' : '*'
        });
    }

    addAdminUser(admin) {
        return axios.post( ACC_BASE_URL + '/add-admin-user', admin, {
            'Access-Control-Allow-Origin' : '*'
        }); 
    }

    getBalance(accountNumber) {
        return axios.get(ACC_BASE_URL + '/accounts/'+ accountNumber + '/balance');
    }

    getAccountById(accountNumber) {
        return axios.get(ACC_BASE_URL+'/accounts/'+accountNumber);
    }

    getSortedStatementBetweenDates(accountNumber, startDate, endDate) {
        return axios.get(ACC_BASE_URL + '/accounts/' + accountNumber + '/get-transactions/sort',
         {
             //?start_date='+startDate+'&&end_date='+endDate+'&&sort=amount&&sort_order=asc&size=10&page=0
             params: {
               'start_date': startDate,
               'end_date': endDate,
               'sort': 'amount',
               'sort_order': 'asc'
             }
         }
         );
    }

    sortAccounts(accountType) {
        return axios.get(ACC_BASE_URL + '/accounts/get-sorted-accounts/'+accountType);
    }

    getUsersByRole(role) {
        return axios.get(ACC_BASE_URL + '/get-users-by-role/' + role);
    }

}

export default new AccountApis();