import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Container, FormControl, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import registration from '../../images/Registration.png';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
toast.configure();

const LoanEdit = () => {
    //let history = useHistory();
    const { id } = useParams();
    const paperStyle = { padding: '50px 20px', width: 600, margin: "10px auto" }
    // const[acc_id,setAccountId]=useState('')
    // const[loan_amount,setloanamount]=useState('')
    // const[tenure,setTenure]=useState('')
    const [status, setStatus] = useState('')


    const [loan, setLoan] = useState({
        accId: "",
        loan_amount: "",
        tenure: ""
    });

    const { accId, loan_amount, tenure } = loan;
    const onInputChange = e => {
        setLoan({ ...loan, [e.target.accId]: e.target.value });
    };

    useEffect(() => {
        loadLoan();
    }, []);

    const loadLoan = async () => {
        console.log(id);
        const result = await axios.get(`http://localhost:3032/api/customer/${id}`);
        console.log(1);
        console.log(result.data);
        setLoan(result.data);
        setStatus(result.data.status);
    };
    const handleClick = (e) => {
        e.preventDefault()
        const LoanApplication = { id, accId, loan_amount, tenure, status }
        console.log(LoanApplication)
        fetch("http://localhost:3032/api/loans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(LoanApplication)
        }).then(() => {
            toast.success('You changed loan application status to : ' + status, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                autoClose: 2600
            });
            console.log("Submitted new loan Application!")
        }).catch((error) => {
            toast.error('Failed to change loan application status!', {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                autoClose: 4000
            });
        });
    }

    const Statuses = [
        {
            value: 'NEW',
            label: 'NEW',
        },
        {
            value: 'APPROVED',
            label: 'APPROVED',
        },
        {
            value: 'INPROCESS',
            label: 'IN-PROCESS',
        },
        {
            value: 'DECLINED',
            label: 'DECLINED',
        },
        {
            value: 'CLOSED',
            label: 'CLOSED',
        },
    ];

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Loan Decision</h1>
                <div>
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <div>
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField disabled id="account_id" label="Account Id" variant="standard"
                                                    value={accId}
                                                    onChange={e => onInputChange(e)} />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MonetizationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField disabled id="loan_amount" label="Loan Amount" variant="standard"
                                                    value={loan_amount}
                                                    onChange={e => onInputChange(e)} />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField disabled id="tenure" label="Tenure" variant="standard"
                                                    value={tenure}
                                                    onChange={e => onInputChange(e)} />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AddTaskIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"  required id="outlined-required"
                                                        name="Status" id="Status"
                                                        value={status}
                                                        label="Account Type"
                                                        onChange={e => setStatus(e.target.value)}
                                                    >
                                                        <MenuItem value="NEW">NEW</MenuItem>
                                                        <MenuItem value="APPROVED">APPROVED</MenuItem>
                                                        <MenuItem value="INPROCESS">INPROCESS</MenuItem>
                                                        <MenuItem value="DECLINED">DECLINED</MenuItem>
                                                        <MenuItem value="CLOSED">CLOSED</MenuItem>
                                                          
                                                    </Select>
                                                </FormControl>
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
                            </td> &nbsp; &nbsp; &nbsp;
                            {/* <td>
                                <Button variant="contained" padding="50, 20" onClick={handleCancel}>Cancel</Button>
                            </td> */}
                        </tr>
                    </table>
                </div>
            </Paper>
        </Container>
    );
};

export default LoanEdit;