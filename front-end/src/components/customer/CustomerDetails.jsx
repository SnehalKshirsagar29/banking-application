import React, { Component,useState } from 'react';
import axios from "axios";

class CustomerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            customers:[],
        customerId:1   
        }
        this.onChange=this.onChange.bind(this);
        
    }
    onChange = (e) =>
    {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    componentDidMount(){
        console.log('customerId se'+this.state.customerId);
        axios.get('http://localhost:4040/api/customer/'+this.state.customerId).then((response)=> {
                this.setState({customers: response.data });
            });
            
    }


render() {
    return(
        <div className="customer-summary">
                <h2>Customer Details</h2>
                <table class="table border shadow">
                    <thead class="table-dark">
                        <tr>
                            <th>CustomerId</th>
                            <th>EmailAddress</th>
                            <th>Message</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map(
                                customer =>
                                    <tr key={customer.id}>
                                         <td>{customer.id}</td>
                                        <td>{customer.emailAddress}</td>
                                        <td>{customer.message} </td>
                                        <td>{customer.phone} </td>
                                        <td>{customer.status} </td>                                       
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div> 
    );
}
}
export default CustomerDetails;