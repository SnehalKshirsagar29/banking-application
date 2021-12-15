import React, { Component } from 'react';
import AccountApis from './AccountApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@material-ui/core/Box';
import { Radio } from '@material-ui/core';
import { FaComment, FaRupeeSign } from 'react-icons/fa';
toast.configure();
class Transactions extends Component {
    constructor(props) {
        super(props);
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        this.state = {
            accountNumber: loggedInUser.accountNumber,
            transactionType: '',
            amount: '',
            comment: '',
            branchName: '',
            accountHolderName: '',
            bankName: '',
            ifscCode: '',
            accountType: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        AccountApis.getAccountById(this.state.accountNumber).then(response => {
            this.setState({ 
            accountNumber: response.data.accountNumber,
            transactionType: response.data.transactionType,
            branchName: response.data.branchName,
            accountHolderName: response.data.firstName+" "+response.data.lastName,
            bankName: response.data.bankName,
            ifscCode: response.data.ifscCode,
            accountType: response.data.accountType
         });
        });
    }

    onSubmit = (e) => {
        e.preventDefault()
        let transaction = {
            accountNumber: this.state.accountNumber,
            transactionType: this.state.transactionType,
            amount: this.state.amount,
            comment: this.state.comment
        };
        AccountApis.doTransaction(transaction)
            .then(res => {
                console.log("Toast : Transaction done successfully!");
                toast.success('Transaction done successfully!', {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    autoClose:2600
                });
            }).catch((error) => {
                console.log('Transaction failed! due to ' + JSON.stringify(error.response));
                toast.error('Transaction failed! due to ' + error.response.data.msg, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    autoClose:4000
                });
            });
        this.setState({
            // accountNumber: '',
            transactionType: '',
            amount: '',
            comment: ''
        })
    }
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    resetState = (e) => {
        e.preventDefault()
        this.setState({
            amount: '',
            comment: '',
            transactionType: ''
        });
    }
    render() {
        return (
            <div className="transaction-form">
                <form id="form" action="#" method="PUT" >
                    <Box className="transaction-outer-box" bgcolor="antiquewhite" p={1}>
                        <h3>Transactions</h3>
                        <Box className="transaction-inner-box" bgcolor="lightgray" p={1} >
                            <div class="leftcontact">
                                <div class="form-group">
                                    <span class="icon-case"><FaRupeeSign sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.onChange} />
                                </div> <br />
                                <div class="form-group">
                                    <span class="icon-case"><FaComment sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    <textarea name="comment" rows="2" placeholder="comment" value={this.state.comment} onChange={this.onChange}></textarea>
                                </div> <br />
                                <div>
                                    <Radio type="radio" name="transactionType" color= "Black" value="CREDIT" checked={this.state.transactionType === "CREDIT"}
                                        onChange={this.onChange} /> 
                                    <span><b>CREDIT</b></span>
                                    &nbsp; &nbsp; 
                                    <Radio type="radio" name="transactionType" color= "Black" value="DEBIT" checked={this.state.transactionType === "DEBIT"}
                                        onChange={this.onChange}  />
                                    <span><b>DEBIT</b></span> <br />
                                </div><br />

                                <div>
                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit}
                                    disabled={!this.state.amount || !this.state.transactionType} > Submit </button> &nbsp; &nbsp; &nbsp;
                                    <button type="submit" className="btn btn-secondary btn-block" onClick={this.resetState}
                                    disabled={!this.state.amount && !this.state.comment && !this.state.transactionType} > Reset </button>
                                </div>
                            </div>
                            <div class="rightcontact">
                                <div>
                                    <label><b> Account No : </b> {this.state.accountNumber} </label> <br /> <br />
                                    <label><b> Account Holder Name : </b>{this.state.accountHolderName} </label> <br /> <br />
                                    <label><b> Branch : </b>{this.state.branchName} </label> <br /> <br />
                                    <label><b> Bank Name : </b>{this.state.bankName} </label> <br /> <br />
                                    <label><b> IFSC Code : </b>{this.state.ifscCode} </label> <br /> <br />
                                    <label><b> Account Type : </b>{this.state.accountType} </label> <br /> <br />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </form>
            </div>
        )
    }
}

export default Transactions;