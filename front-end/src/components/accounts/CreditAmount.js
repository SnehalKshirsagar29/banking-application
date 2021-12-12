import React, { Component } from 'react';
import AccountApis from './AccountApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
class CreditAmount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountNumber: '111103',
            transactionType: 'CREDIT',
            amount: '',
            comment: '',
            // transactionDate : '',
            //message: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault()
        let transaction = {
            accountNumber: this.state.accountNumber,
            transactionType: this.state.transactionType,
            amount: this.state.amount,
            comment: this.state.comment
        };
        console.log('transaction obj : '+JSON.stringify(transaction));
        AccountApis.doTransaction(transaction)
            .then(res => {
                toast.success('Transaction done successfully!', {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined
                  });
            }).catch((error) => {
                 toast.error('Transaction failed! due to '+error.response.status, {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined
                  });
             }
            // (error) => {
            //     if (error.response) {
            //       console.log("data : "+error.response.data);
            //       console.log("status : "+error.response.status);
            //       console.log("headers :"+error.response.headers);
            //     }
            //   }
            );
        this.setState({
            //accountNumber: '',
           // transactionType: '',
            amount: '',
            comment: '',
            //message: ''
        })
    }
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    resetState = (e) => {
        e.preventDefault()
             this.setState({
                 amount: '',
                 comment: '',
             });
        }

    render() {
        return (
            <div className="transaction-form">
                <form id="form" action="#" method="PUT" >
                    <h1>Credit Amount</h1>
                    <div id="otherInputs">
                        <input type="number" name="accountNumber" placeholder="Account Number" value={this.state.accountNumber} disabled /><br /> <br />
                        <input type="number" name="amount" placeholder="amount" value={this.state.amount} onChange={this.onChange} /> <br /> <br />
                        <textarea type="text" name="comment" placeholder="comment" value={this.state.comment} onChange={this.onChange} />
                        <br /> <br />
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit}> Submit </button> &nbsp; &nbsp;
                        <button type="submit" className="btn btn-secondary btn-block" onClick={this.resetState}> Reset </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreditAmount;
