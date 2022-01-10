import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import login from '../../images/login.png';
import { Container } from "react-bootstrap";
import { Paper } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReactDOM from 'react-dom';
import App from "../../App";
import AccountApis from "../accounts/AccountApis";

const LoginForm = () => {
    const paperStyle = { padding: '50px 20px', width: 700, margin: "10px auto" }
    const buttonStyle = { margin: "20px 40px" }
    const [username, setuserName] = useState('')
    const [passwd, setpassWord] = useState('')
    const [allentry] = useState([])

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Inside submitForm : username : " + username + " : passwd : " + passwd);
        AccountApis.loginToAccount(username, passwd).then(response => {
            console.log("response.data : " + JSON.stringify(response.data));
            if (response.data.msg === 'Success') {
                console.log("inside codition.......");
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.assign('/home/');
            }
        });
    }

    const register = () => {
        console.log("Inside register...");
        //window.location.assign('/register');
        ReactDOM.render(
            <App isRegister={true} />,
            document.getElementById('root')
        );
    }

    const handelCancel = () => {
        setuserName("");
        setpassWord("");
    }


    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Sign into Bank of Mysore</h1>
                <div>
                    <form action="">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                    <TextField type="text" required label="UserName" name="userName" id="username"
                                                        value={username}
                                                        onChange={(e) => setuserName(e.target.value)}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                    <VisibilityOffIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                    <TextField required id="outlined-required" label="PassWord"
                                                        name="passWord" id="passWord" type="password" value={passwd}
                                                        onChange={(e) => setpassWord(e.target.value)}
                                                    />
                                                </Box>
                                            </Box>
                                        </div>
                                        <div style={buttonStyle}>
                                            <Button variant="contained" color="success" type="submit" onClick={submitForm}>Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button variant="contained" onClick={handelCancel}>Reset</Button>
                                            <Button onClick={register} block>Create New Account</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mt-5" flex>
                                            <img src={login} alt="Not Found" className="rounded" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div>
                    {
                        allentry.map((currElemen) => {
                            return (
                                <div className="showdata">
                                    <p>{currElemen.username}</p>
                                    <p>{currElemen.passwd}</p>
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
export default LoginForm;