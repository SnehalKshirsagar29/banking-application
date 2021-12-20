import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Container } from "react-bootstrap";
import { MenuItem, Paper, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppRegistrationOutlined, ContactPhone, EmailOutlined, Group, PasswordOutlined
} from "@mui/icons-material";
import AccountApis from "../accounts/AccountApis";
import { toast } from 'react-toastify';
toast.configure();

const paperStyle = { padding: '40px 30px', width: 800, margin: "10px auto", color: 'purple' }

class AdminRegister extends Component {

    constructor(props) {
        super(props)
        this.state = {
            admin: {
                firstName: '',
                middleName: '',
                lastName: '',
                emailId: '',
                contactNumber: '',
                age: '',
                roleName:'',
                password:'',
                conformPassword:''
            }
        }
        this.addAdmin = this.addAdmin.bind(this);
      }
    onChange = (e) => {
        const admin = {...this.state.admin};
              admin[e.target.name] = e.target.value;
        this.setState({ admin });
    }

    addAdmin = (e) => {
        e.preventDefault()
        console.log("Register admin state : "+JSON.stringify(this.state.admin));
         AccountApis.addAdminUser(this.state.admin).then(response => response.data)
             .then(user => {
               this.setState({
                 admin : {}
               });
                 console.log("user : "+user);
                 toast.success(user.firstName+' '+user.lastName+ ' is added successfully as '+user.roleName, {
                     position: "top-right",
                     pauseOnHover: true,
                     draggable: false,
                     progress: undefined,
                     autoClose:2600
                 });
             }).catch((error) => {
               console.log('Add admin user failed! due to ' + JSON.stringify(error.response));
                 toast.error('Add new admin failed! due to ' + error.response.data.msg, {
                     position: "top-right",
                     pauseOnHover: true,
                     draggable: false,
                     progress: undefined,
                     autoClose:4000
                 });
             });
             this.setState({
                admin: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    emailId: '',
                    contactNumber: '',
                    age: '',
                    roleName:'',
                    password:'',
                    conformPassword:''
                }
            });
             console.log("In addAdmin : setEmptyState : "+JSON.stringify(this.state));
    }

    render() {
        return (
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1>Create new admin for State Bank Of Mysore</h1>
                    <div>
                        <form>
                            <table>
                                <tr>
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField required id="outlined-required" label="First Name" type="text"
                                            name="firstName"
                                            value={this.state.admin.firstName}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField id="outlined-required" label="Middle Name" type="text"
                                            name="middleName"
                                            value={this.state.admin.middleName}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField required id="outlined-required" label="Last Name" type="text"
                                            name="lastName"
                                            value={this.state.admin.lastName}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>
                                </tr><br />
                                <tr>
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <EmailOutlined sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField required id="outlined-required" label="Email Id" type="text"
                                            name="emailId"
                                            value={this.state.admin.emailId}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <ContactPhone sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField required id="outlined-required" label="Contact Number" type="text"
                                            name="contactNumber"
                                            value={this.state.admin.contactNumber}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Group sx={{ color: 'action.active', mr: 1, my: 2 }} />
                                            <TextField required id="outlined-required" label="Age" type="text"
                                            name="age"
                                            value={this.state.admin.age}
                                            onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>
                                </tr><br />
                                <tr>
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AppRegistrationOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <FormControl fullWidth>
                                                <InputLabel required id="demo-simple-select-label">Role Name</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label" required id="outlined-required"
                                                    name="roleName"
                                                    value={this.state.admin.roleName}
                                                    label="Role Name"
                                                onChange={this.onChange}
                                                >
                                                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                                                    <MenuItem value="Admin">Admin</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField required id="outlined-required" label="New Password"
                                                name="password" type="password"
                                                value={this.state.admin.password}
                                                onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>&nbsp;
                                    <td>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField required id="outlined-required" label="Confirm Password"
                                                name="conformPassword" type="password"
                                                value={this.state.admin.conformPassword}
                                                onChange={this.onChange}
                                            />
                                        </Box>
                                    </td>
                                </tr><br />
                            </table>
                            <div>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" color="success" type="submit" onClick={this.addAdmin}>Register</Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" type="reset">Reset</Button>
                                </p>
                            </div>
                        </form>
                    </div>

                </Paper>
            </Container>
        );
    }
}

export default AdminRegister;