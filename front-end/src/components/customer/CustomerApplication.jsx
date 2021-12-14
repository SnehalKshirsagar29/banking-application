import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@material-ui/core';
import registration from '../../images/Registration.png';
import Button from '@mui/material/Button'
import { MarkEmailUnreadOutlined, MessageOutlined, PhoneAndroid, QueryStatsOutlined } from '@mui/icons-material';
import axios from 'axios';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
if (typeof window !== "undefined") {
    injectStyle();
}
export default function CustomerApplication() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "10px auto" }
    let loginuser = JSON.parse(localStorage.getItem("user"));
    const [customerId, setCustomerId] = useState(loginuser.accountNumber)
    const [emailAddress, setemailAdress] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState('NEW')
    const handelCancel = () => {
        // setCustomerId("");
        setemailAdress("");
        setPhone("");
        // setStatus("");
        setMessage("");
    }
    const handleClick = (e) => {
        e.preventDefault()
        setMessageError("");
        setEmailError("");
        setPhoneError("");
        setStatusError("");
        const CustomerApplication = {customerId, emailAddress, message, phone, status };
        if (valid()) {
            return axios.post('http://localhost:4040/api/ticket/customer/' + CustomerApplication.customerId, CustomerApplication)
                .then(response => {
                    toast.dark("Your ticket is Generated 👋, for Customer Id:" + CustomerApplication.customerId);
                    // setCustomerId("");
                    setemailAdress("");
                    setPhone("");
                    // setStatus("");
                    setMessage("");
                }).catch((error) => {
                    toast.dark("Hello 👋, your ticket is not generated sucessfully!" + error.response.status);
                    setCustomerId("");
                    setemailAdress("");
                    setPhone("");
                    // setStatus("");
                    setMessage("");
                }
            );
        }
    }
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [statusError, setStatusError] = useState('');

    const valid = () => {
        console.log("in validation");
        if (emailAddress === "") {
            setEmailError("Please Enter EmailAddress");
        }
        else if (message === "") {
            setMessageError("Please Enter Message");
        }
        else if (phone === "") {
            setPhoneError("Please Enter Phone");
        }
        else {
            return true;
        }
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Create Customer Ticket</h1>
                <div>
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <div>
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                            {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="customer_id" label="Customer Id" variant="standard"
                                                    value={id}
                                                    onChange={(e) => setCustomerId(e.target.value)} />
                                            </Box> */}
                                            {/* <p style={{ color: "red", fontSize: "12px" }}>{ticketIdError}</p> */}
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MarkEmailUnreadOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="email_address" label="Email Address" variant="standard"
                                                    value={emailAddress}
                                                    onChange={(e) => setemailAdress(e.target.value)} />
                                            </Box>
                                            <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MessageOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="msg" label="Message" variant="standard"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)} />
                                            </Box>
                                            <p style={{ color: "red", fontSize: "12px" }}>{messageError}</p>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <PhoneAndroid sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="phn" label="Phone" variant="standard"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)} />
                                            </Box>
                                            <p style={{ color: "red", fontSize: "12px" }}>{phoneError}</p>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <QueryStatsOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField id="status" label="Status" variant="standard"
                                                    value={status}
                                                    // onChange={(e) => setStatus(e.target.value)}
                                                     />
                                            </Box>
                                           
                                        </Box>
                                    </div>
                                </td>
                                <td>
                                    <div className="mt-5" flex>
                                        <img src={registration} alt="Not Found" className="rounded" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div className="form-group">
                    <table calss="center">
                        <tr>
                            <td>
                                <Button variant="contained" padding="50, 20" onClick={handleClick}>Apply</Button>
                            </td>&nbsp; &nbsp; &nbsp;
                            <td>
                                <Button variant="contained" padding="50, 20" onClick={handelCancel}>Reset</Button>
                            </td>
                        </tr>
                    </table>
                </div>
                <ToastContainer />
            </Paper>
        </Container>
    );
}