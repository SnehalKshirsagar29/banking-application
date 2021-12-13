import React, {useState} from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
if (typeof window !== "undefined") {
    injectStyle();
}
const TicketDetails = () => {
    let [cust, setCustemer] = React.useState('');
    let [txtvalue, setData] = React.useState('');
    const [show, setShow] = useState('');

    const handleChange = (val) => {
        setData(val.target.value);
        setShow(false);
        setTxtError("");
    }
    const ShowTicket = (e) => {
        e.preventDefault()
        if (valid()) {
            axios.get('http://localhost:4040/api/customer/1/ticket/' + txtvalue)
                .then(response => {
                    console.log(response.data);
                    if (response.data) {
                        setCustemer(response.data);
                       setShow(true);
                        toast.dark("Your ticket Details is Generated 👋, for this Ticket Id:" + txtvalue);
                        setData("");
                        setTxtError("");
                    }
                    else {
                        setShow(false);
                        toast.dark("Please enter valid 👋,Ticket Id:"+txtvalue);
                        setData("");
                        setTxtError("");
                    }
                }).catch((error) => {
                    toast.dark("Some technical issue is facing 👋, for this Ticket Id:"+error.response.status);
                    setData("");
                    setTxtError("");
                });
        }
    }
    const [txtError, setTxtError] = useState('')
    const valid = () => {
        if (txtvalue === "") {
            setTxtError("Please Enter ticket Id");
        }
        else {
            return true;
        }
    }
    return (
        <div className="Customer-summary">
            <h2>Customer Ticket Details</h2>
            <div className="searchbar">
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField required name="ticketId" id="ticketId"
                            label="Enter Ticket Id" type="text"
                            value={txtvalue}
                            onChange={handleChange} />
                        <p style={{ color: "red", fontSize: "12px" }}>{txtError}</p>
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
            <ToastContainer />
            <div style={{display: show ? "block" : "none"}}>
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
        </div>
    );
}
export default TicketDetails;