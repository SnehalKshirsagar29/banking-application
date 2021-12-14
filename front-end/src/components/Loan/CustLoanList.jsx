import { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

class CustLoanList extends Component{
    constructor(props){
        super(props)
         let loginuser=JSON.parse(localStorage.getItem("user"));

        this.state = {
            loans:[],
            acc_id: loginuser.accountNumber
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3032/api/customer/' +this.state.acc_id+ '/loans').then((response)=> {
                this.setState({loans: response.data });
            });
            console.log('response');
    }


render() {
    return(
         <div className="Loan-summary">
                <h2>Loan Applications</h2>
                <table class="table border shadow">
                    <thead class="table-dark">
                        <tr>
                            <th>Loan Id</th>
                            <th>AccountNumber</th>
                            <th>Amount</th>
                            <th>Amount Balance</th>
                            <th>Tenure</th>
                            <th>Tenure Balance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.loans.map(
                                loan =>
                                    <tr key={loan.id}>
                                        <td><Link to={`/loans/viewloan/${loan.id}`}> {loan.id}</Link></td>
                                        <td>{loan.accId} </td>
                                        <td>{loan.loan_amount} </td>
                                        <td>{loan.loan_balance} </td>
                                        <td>{loan.tenure} </td>
                                        <td>{loan.tenure_balance} </td>
                                        <td>{loan.status} </td>
                                        {/* <td><Link
                                            class="btn btn-outline-primary mr-2" to={`/edit/${loan.id}`}>
                                            Edit
                                         </Link>
                                        </td> */}
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div> 
    );
}
}
export default CustLoanList;