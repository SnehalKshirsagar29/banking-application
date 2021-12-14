import { Box } from '@material-ui/core';
import React, { Component } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import AccountApis from './AccountApis';

class ShowBalanace extends Component {
    constructor(props) {
        super(props)
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        this.state = {
            accountNumber : loggedInUser.accountNumber,
            accountHolderName:'',
            bankName:'',
            branchName:'',
            ifscCode:'',
            balance:0.0
        }
    }
    componentDidMount() {
        AccountApis.getAccountById(this.state.accountNumber).then((response) => {
            this.setState({ 
                accountNumber: response.data.accountNumber,
                accountHolderName: response.data.firstName+" "+response.data.lastName,
                branchName: response.data.branchName,
                bankName: response.data.bankName,
                balance: response.data.balance,
                ifscCode: response.data.ifscCode
             });
        });
    }
    render() {
        return (
            <div className="display-balance">
                <form id="form" action="#" method="GET" >
                <h2>Balance Details:</h2>
                <Box className="transaction-inner-box" bgcolor="lightgray" p={1} >
                            <div class="leftcontact-test">
                                <div>
                                    <label><b> Account Number : </b> {this.state.accountNumber} </label> <br /> <br />
                                    <label><b> Account Holder Name : </b>{this.state.accountHolderName} </label> <br /> <br />
                                    <label><b> Branch : </b>{this.state.branchName} </label> <br /> <br />
                                    <label><b> Bank Name : </b>{this.state.bankName} </label> <br /> <br />
                                    <label><b> IFSC Code : </b>{this.state.ifscCode} </label> <br /> <br />
                                    <label><b>Available Balance(Rs) : </b> </label>
                                    <div class="form-group">
                                    <input type="text" name="balance" placeholder="amount" value={this.state.balance.toFixed(2)} />
                                    <span class="icon-case"><FaRupeeSign sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    
                                    </div>
                                    {/* </label> */}
                                </div>
                            </div>
                        </Box>



                    {/* <fieldset>
                        <h1>Balance Details </h1>
                        <div id="otherFields">
                            <p> Account Number : {this.state.accountNumber}</p>
                            <p> Account Holder Name : {this.state.firstName} {this.state.lastName}</p>
                            <p> Bank Name : {this.state.bankName}</p>
                            <p> Available Balance : {this.state.balance}</p>
                        </div>
                    </fieldset> */}
                </form>
            </div>
        );
    }
}

export default ShowBalanace;