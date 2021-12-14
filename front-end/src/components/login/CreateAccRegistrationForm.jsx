import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import login from '../../images/login.png';
import { Container } from "react-bootstrap";
import { MenuItem, Paper, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AccountBalanceWalletRounded, 
        AppRegistrationOutlined, CodeOffRounded, MarkEmailReadRounded, MobiledataOffOutlined,
        PasswordOutlined} from "@mui/icons-material";
import AccountApis from "../accounts/AccountApis";
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import App from "../../App";
toast.configure();
const CreateAccRegistrationForm = () => {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "10px auto" }

    const [userRegistration, setUserRegistration] = useState({
        firstName: "",
        lastName: "",
        branchName: "",
        ifscCode: "",
        accountType: "",
        email: "",
        mobileNumber: "",
        password:"",
        retypePassword:""
    });
    //already existing records
    const [record, setRecords] = useState([]);
    const handelInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(name, value);
        setUserRegistration({ ...userRegistration, [name]: value })
    }



    const handelSubmit = (e) => {
        e.preventDefault();
        const newrecord = { ...userRegistration, id: new Date().getTime().toString() }
        console.log("newrecord : "+JSON.stringify(newrecord));
        AccountApis.createAccount(newrecord)
        .then(res => {
            console.log("Toast : Account created successfully!");
            toast.success('Account created successfully!', {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                autoClose:2600
            });

            ReactDOM.render(
                <App />,
                document.getElementById('root')
           );
        }).catch((error) => {
            console.log('Account creation failed! due to ' + JSON.stringify(error.response));
            toast.error('Account creation failed! due to ' + error.response.data.msg, {
                position: "top-right",
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                autoClose:4000
            });
        });
        console.log(record);
        setRecords([...record, newrecord]);
        console.log(record);
        setUserRegistration({
            firstName: "",
            lastName: "",
            branchName: "",
            ifscCode: "",
            accountType: "",
            email: "",
            mobileNumber: "",
            password:"",
            retypePassword:"",
        
        })
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Create Your Account With State Bank Of Mysore</h1>
                <div>
                    <form action="" onSubmit={handelSubmit}>
                        <table>
                            <tr>
                                <td>
                                    <div>
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>

                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField type="text" required label="FirstName" name="firstName" id="firstName"
                                                    value={userRegistration.firstName}
                                                    onChange={handelInput}
                                                />
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="LastName"
                                                    name="lastName" id="lastName" type="text"
                                                    value={userRegistration.lastName}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AppRegistrationOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormControl fullWidth>

                                                    <InputLabel id="demo-simple-select-label">Branch Name</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"  required id="outlined-required"
                                                        name="branchName" id="branchName"
                                                        value={userRegistration.branchName}
                                                        label="Branch Name"
                                                        onChange={handelInput}
                                                    >
                                                        <MenuItem value="Pune">Pune</MenuItem>
                                                        <MenuItem value="Banglore">Banglore</MenuItem>
                                                        <MenuItem value="Mumbai">Mumbai</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <CodeOffRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="IFSC Code"
                                                    name="ifscCode" id="ifscCode" type="text"
                                                    value={userRegistration.ifscCode}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountBalanceWalletRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"  required id="outlined-required"
                                                        name="accountType" id="accountType"
                                                        value={userRegistration.accountType}
                                                        label="Account Type"
                                                        onChange={handelInput}
                                                    >
                                                        <MenuItem value="Saving">Saving</MenuItem>
                                                        <MenuItem value="Current">Current</MenuItem>  
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MarkEmailReadRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="Email"
                                                    name="email" id="email" type="text"
                                                    value={userRegistration.email}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <MobiledataOffOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="Mobile"
                                                    name="mobileNumber" id="mobileNumber" type="text"
                                                    value={userRegistration.mobileNumber}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="New Password"
                                                    name="password" id="password" type="password"
                                                    value={userRegistration.password}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="Confirm Passworrd"
                                                    name="retypePassword" id="retypePassword" type="password"
                                                    value={userRegistration.retypePassword}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                        </Box>
                                    </div>
                                    <div className="form-group">
                                        <table calss="center">
                                            <tr>
                                                <td>
                                                    <Button variant="contained" padding="right :50px" color="success" padding="50, 20" type="submit">Registration</Button>
                                                </td>

                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td>
                                    <div className="mt-5" flex>
                                        <img src={login} alt="Not Found" className="rounded" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>

            </Paper>
        </Container>
    );
}
export default CreateAccRegistrationForm;