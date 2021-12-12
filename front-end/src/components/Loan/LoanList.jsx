import { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

class LoanList extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            loans:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3032/api/customer').then((response)=> {
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
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.loans.map(
                                loan =>
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>{loan.accId} </td>
                                        <td>{loan.loan_amount} </td>
                                        <td>{loan.loan_balance} </td>
                                        <td>{loan.tenure} </td>
                                        <td>{loan.tenure_balance} </td>
                                        <td>{loan.status} </td>
                                        <td><Link
                                            class="btn btn-outline-primary mr-2" to={`/edit/${loan.id}`}>
                                            Edit
                                         </Link>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div> 
    );
}
}
export default LoanList;