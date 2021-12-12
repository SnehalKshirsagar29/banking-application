import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import login from '../images/login.jpg';
import { Container } from "react-bootstrap";
import { MenuItem, Paper, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AccountBalanceWalletRounded, AppRegistrationOutlined, CodeOffRounded, MailOutline, MarkEmailReadRounded, MobiledataOffOutlined, MoneyOffCsredRounded, Password, PasswordOutlined, PasswordRounded, PauseCircleOutlineRounded, PlayCircleFilledOutlined, PlayCircleFilledRounded, SupervisedUserCircleOutlined } from "@mui/icons-material";
const CreateAccRegistrationForm = () => {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "10px auto" }

    const [userRegistration, setUserRegistration] = useState({
        firstName: "",
        lastname: "",
        branch: "",
        ifsc: "",
        acctype: "",
        email: "",
        mobile: "",
        newPassword:"",
        retypePassword:"",



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
        console.log(record);
        setRecords([...record, newrecord]);
        console.log(record);
        setUserRegistration({
            firstName: "",
            lastname: "",
            branch: "",
            ifsc: "",
            acctype: "",
            email: "",
            mobile: "",
            newPassword:"",
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
                                                    name="lastname" id="lastname" type="text"
                                                    value={userRegistration.lastname}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AppRegistrationOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormControl fullWidth>

                                                    <InputLabel id="demo-simple-select-label">Branch Name</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"  required id="outlined-required"
                                                        name="branch" id="branch"
                                                        value={userRegistration.branch}
                                                        label="Branch Name"
                                                        onChange={handelInput}
                                                    >
                                                        <MenuItem value={10}>Pune</MenuItem>
                                                        <MenuItem value={20}>Banglore</MenuItem>
                                                        <MenuItem value={30}>Mumbai</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <CodeOffRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="IFSC Code"
                                                    name="ifsc" id="ifsc" type="text"
                                                    value={userRegistration.ifsc}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <AccountBalanceWalletRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"  required id="outlined-required"
                                                        name="acctype" id="acctype"
                                                        value={userRegistration.acctype}
                                                        label="Account Type"
                                                        onChange={handelInput}
                                                    >
                                                        <MenuItem value={1}>Saving</MenuItem>
                                                        <MenuItem value={2}>Current</MenuItem>  
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
                                                    name="mobile" id="mobile" type="text"
                                                    value={userRegistration.mobile}
                                                    onChange={handelInput}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <TextField required id="outlined-required" label="New Password"
                                                    name="newPassword" id="newPassword" type="password"
                                                    value={userRegistration.newPassword}
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
                <div>
                    {
                        record.map((currelem)=>{
                            return(
                                <div>
                                       <p>{currelem.firstName} </p>
                                       <p>{currelem.lastname} </p>
                                       <p>{currelem.bankname} </p>
                                       <p>{currelem.branch} </p>
                                       <p>{currelem.acctype} </p>
                                       <p>{currelem.ifsc} </p>
                                       <p>{currelem.mobile} </p>
                                       <p>{currelem.email} </p>

                                       
                                       
                                    </div>
                            )
                        }

                        )
                    }
                </div>

            </Paper>
        </Container>
    );
}
export default CreateAccRegistrationForm;