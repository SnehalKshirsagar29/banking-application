import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import login from '../../images/login.png';
import { Container } from "react-bootstrap";
import { Paper } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import ReactDOM from 'react-dom';
import App from "../../App";

const LoginForm = () => {
    const paperStyle={padding:'50px 20px', width:700,margin:"10px auto"}
    const [username, setuserName] = useState('')
    const [passwd, setpassWord] = useState('')
    const [allentry] = useState([])

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Inside submitForm : username : "+username+" : passwd : "+passwd);
        axios.get('http://localhost:2222/api/login', {
            params: {
              'username': username,
              'password': passwd
            }
        }).then( response => {
            console.log("response.data : "+JSON.stringify(response.data));
            if(response.data.msg === 'Success') {
                console.log("inside codition.......");
               localStorage.setItem('user', JSON.stringify(response.data));
               ReactDOM.render(
                    <App  />,
                    document.getElementById('root')
               );
            }
        });
    }

    const register = () => {
        console.log("Inside register...");
        //window.location.assign('/register');
        ReactDOM.render(
            <App isRegister={true}/>,
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
            <tr>
                <td>
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField type="text"   required   label="UserName" name ="userName" id="username"
                            value={username}
                            onChange={(e)=>setuserName(e.target.value)}  
                        /> 
                    </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <VisibilityOffIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField required id="outlined-required" label="PassWord"
                        name="passWord" id="passWord" type="password"  value={passwd}
                        onChange={(e) => setpassWord(e.target.value)}
                        />
                    </Box>
                    </Box>
                </div>
               <div className="form-group">
            <table calss="center">
                <tr>
                    <td>
                    <Button variant="contained" padding ="right :50px"color="success" padding="50, 20" type="submit" onClick={submitForm}>Submit</Button>
                    </td>&nbsp; &nbsp;
                    <td>
                    <Button variant="contained" padding="50, 20" onClick={handelCancel}>Reset</Button>
                    </td>
                    <td>
                    <Button  color="success" onClick = {register} to={`/register`} block>Create Account</Button>
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
                allentry.map((currElemen)=>{
                    return(
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