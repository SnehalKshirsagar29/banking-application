import React, { Component } from 'react';
import AccountApis from './AccountApis';
import { toast } from 'react-toastify';
import { Paper, TextField } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { Radio } from '@material-ui/core';
import { FaComment, FaRupeeSign } from 'react-icons/fa';
import logo from '../../images/sbm.png'
toast.configure();

const paperStyle={padding:'35px 20px', width:700,height:430,margin:"30px auto"}
const textareaStyle = {width:225}
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

    onChangeNumber = (e) => {
        const regex = /^[+]?\d+([.]\d+)?$/;// /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    resetState = (e) => {
        e.preventDefault()
        this.setState({
            amount: '',
            comment: '',
            transactionType: ''
        });
    }
    render() {
        const logoStyle = {height:55, padding:'12px 0px'}
        const textStyle = {color:'purple'}
        const imageStyle = {height:40, width: 40}
        return (
            <Paper elevation={3} style={paperStyle}>
                 <h4 style={textStyle}><img style={imageStyle} src={logo} alt="Not Found" className="rounded" />
                 <b> Transactions with SBM is completely Safe and Secure</b></h4><br />
                <div class="leftcontact">
                                <div class="form-group">
                                    <span style={logoStyle} class="icon-case"><FaRupeeSign sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    <TextField type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.onChangeNumber} />
                                </div> <br />
                                <div class="form-group">
                                    <span style={logoStyle} class="icon-case"><FaComment sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    <textarea style={textareaStyle} name="comment" rows="3" placeholder="comment" value={this.state.comment} onChange={this.onChange} />
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
                                    disabled={this.state.amount <= 0 || !this.state.transactionType} > Submit </button> &nbsp; &nbsp; &nbsp;
                                    <button type="submit" className="btn btn-secondary btn-block" onClick={this.resetState}
                                    disabled={!this.state.amount && !this.state.comment && !this.state.transactionType} > Reset </button>  &nbsp; &nbsp;
                                </div>
                            </div>
                            <div class="rightcontact">
                                <div>
                                    <label><b style={textStyle}> Account No : </b> {this.state.accountNumber} </label> <br /> <br />
                                    <label><b style={textStyle}> Account Holder Name : </b>{this.state.accountHolderName} </label> <br /> <br />
                                    <label><b style={textStyle}> Branch : </b>{this.state.branchName} </label> <br /> <br />
                                    <label><b style={textStyle}> Bank Name : </b>{this.state.bankName} </label> <br /> <br />
                                    <label><b style={textStyle}> IFSC Code : </b>{this.state.ifscCode} </label> <br /> <br />
                                    <label><b style={textStyle}> Account Type : </b>{this.state.accountType} </label> <br /> <br />
                                </div>
                </div>
            </Paper>
        )
    }
}

export default Transactions;