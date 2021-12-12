import React, { Component, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// import { Link } from "react-router-dom";

const TicketDetails = () => {
    let [cust, setCustemer] = React.useState('')
    let [txtvalue, setData] = React.useState('')
    const handleChange = (val) => {
        setData(val.target.value);
    }
    const ShowTicket = (e) => {
        e.preventDefault()
        axios.get('http://localhost:4040/api/customer/1/ticket/' + txtvalue).
            then(response => {
                setCustemer(response.data);
                console.log(response);
            }).catch((error) => {
                console.log("error loan Application added")
            });
    }
    return (
        <div className="customer-summary">
            <h2>Customer Ticket Details</h2>
            <div className="searchbar">
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField required name="ticketId" id="ticketId"
                         id="outlined-required" label="Enter Ticket Id"
                            // value={this.state.txtvalue}
                            onChange={handleChange} />
                             {/* <Button variant="contained"  paddinng="60,20" onClick={(e) => ShowTicket(e)}>search</Button> */}
                    </Box>
                </Box>
                <div className="form-group">
                    <table calss="center">
                        <tr>
                            <td>
                                <Button variant="contained" padding="60, 20" onClick={(e) => ShowTicket(e)}>Search</Button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <table class="table border shadow">
                <thead class="table-dark">
                    <tr>
                        <th>TicketId</th>
                        <th>EmailAddress</th>
                        <th>Message</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr key={cust.id}>
                            <td>{cust.id}</td>
                            <td>{cust.message}</td>
                            <td>{cust.emailAddress}</td>
                            <td>{cust.phone} </td>
                            <td>{cust.status} </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
export default TicketDetails;