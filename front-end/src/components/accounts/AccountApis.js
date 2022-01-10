import axios from "axios";

const ACC_BASE_URL = '/api/account-service'; 
let loggedInUser = JSON.parse(localStorage.getItem('user'));
const config = {
    headers: {
        "authorization": loggedInUser!= null ? loggedInUser.authenticationToken : null//`Bearer ${Cookies.get("jwt")}`,
    },
};

class AccountApis {
    loginToAccount(username, passwd) {
        return axios.get(ACC_BASE_URL + '/login', {
            params: {
              'username': username,
              'password': passwd
            }
        });
    }

    getAllTransactions(accountNumber) {
        return axios.get(ACC_BASE_URL + '/accounts/' + accountNumber + '/get-all-transactions', config);
    }

    getAllUsers() {
        return axios.get(ACC_BASE_URL + '/get-all-users', config);
    }

    getAllAccounts() {
        return axios.get(ACC_BASE_URL + '/accounts/get-all-accounts', config);
    }

    doTransaction(transaction) {
        return axios.put( ACC_BASE_URL + '/accounts/'+transaction.accountNumber+'/transaction', transaction, config);
    }

    createAccount(account) {
        return axios.post( ACC_BASE_URL + '/accounts/add-account', account, config);
        //  {
        //     'Access-Control-Allow-Origin' : '*'
        // });
    }

    addAdminUser(admin) {
        return axios.post( ACC_BASE_URL + '/add-admin-user', admin, config);
        // {
        //     'Access-Control-Allow-Origin' : '*'
        // }); 
    }

    getBalance(accountNumber) {
        console.log("authenticationToken : "+loggedInUser.authenticationToken)
        return axios.get(ACC_BASE_URL + '/accounts/'+ accountNumber + '/balance', config);
    }

    getAccountById(accountNumber) {
        console.log("getAccountById : headerWithToken : "+JSON.stringify(config));
        return axios.get(ACC_BASE_URL+'/accounts/'+accountNumber, config);
    }

    getSortedStatementBetweenDates(accountNumber, startDate, endDate) {
        return axios.get(ACC_BASE_URL + '/accounts/' + accountNumber + '/get-transactions/sort',
         {
             headers: {
                 'authorization': loggedInUser.authenticationToken
             },
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
        return axios.get(ACC_BASE_URL + '/accounts/get-sorted-accounts/'+accountType, config);
    }

    getUsersByRole(role) {
        return axios.get(ACC_BASE_URL + '/get-users-by-role/' + role, config);
    }

}

export default new AccountApis();