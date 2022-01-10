import balanceCheck from '../../images/SBM-Balance-Check.png';
import React, { Component } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import AccountApis from './AccountApis';
import { Paper, TextField } from "@mui/material";

const paperStyle={padding:'35px 20px', width:700,height:460,margin:"30px auto"}
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
        // console.log("componentDidMount : accountNumber : "+this.state.accountNumber)
        // AccountApis.getAccountById(this.state.accountNumber);
        AccountApis.getAccountById(this.state.accountNumber).then((response) => {
            this.setState({ 
                accountNumber: response.data.accountNumber,
                accountHolderName: response.data.firstName+" "+response.data.lastName,
                branchName: response.data.branchName,
                bankName: response.data.bankName,
                balance: response.data.balance,
                ifscCode: response.data.ifscCode
             });
        }).catch((error) => {
            console.log("error :" + error.response.data);
        });;
    }
    render() {
        const textStyle = {color:'purple'}
        const logoStyle = {height:55, padding:'12px 0px'}
        const imageStyle = {height:260, width: 380}
        return (
            <Paper elevation={3} style={paperStyle}>
                <form id="form" action="#" method="GET" >
                    <h4><b style={textStyle}>Account Details</b></h4> <br />
                                <div className="showbalanceImage" flex>
                                    <img style={imageStyle} src={balanceCheck} alt="Not Found" className="rounded" />
                                </div>
                                <div>
                                    <label><b style={textStyle}> Account Number : </b> {this.state.accountNumber} </label> <br /> <br />
                                    <label><b style={textStyle}> Account Holder Name : </b>{this.state.accountHolderName} </label> <br /> <br />
                                    <label><b style={textStyle}> Branch : </b>{this.state.branchName} </label> <br /> <br />
                                    <label><b style={textStyle}> Bank Name : </b>{this.state.bankName} </label> <br /> <br />
                                    <label><b style={textStyle}> IFSC Code : </b>{this.state.ifscCode} </label> <br /> <br />
                                    <label><b style={textStyle}>Available Balance(Rs) : </b> </label>
                                    <div class="form-group"><br />
                                        <TextField type="text" name="balance" placeholder="amount" value={this.state.balance.toFixed(1)} />{/* .toFixed(1) */}
                                        <span style={logoStyle} class="icon-case"><FaRupeeSign sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></span>
                                    </div>
                                    
                                </div>
                                
                </form>
            </Paper>
        );
    }
}

export default ShowBalanace;