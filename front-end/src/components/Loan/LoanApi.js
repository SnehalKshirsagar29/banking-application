import axios from "axios";

const LOAN_BASE_URL = 'http://localhost:3032/api';
class LoanApi {

    getAllLoans() {
        return axios.get(LOAN_BASE_URL + '/loans');
    }
}

export default new LoanApi();