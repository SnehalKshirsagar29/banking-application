//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Container ,Paper} from '@material-ui/core';
import registration from '../../images/LoanApp.png';
import Button from '@mui/material/Button';
// import { useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
toast.configure();

export default function LoanApplication() {
    const paperStyle={padding:'50px 20px', width:600,margin:"10px auto"}
    let loggedInUser = JSON.parse(localStorage.getItem('user'));

    const[accId,setAccountId]=useState(loggedInUser.accountNumber)
    const[loan_amount,setloanamount]=useState('')
    const[tenure,setTenure]=useState('')
    const[status,setStatus]=useState('NEW')
    
    const[accIdError,setaccIdError]=useState('')
    const[loanAmtError,setloanAmtError]=useState('')
    const[tenureError,setTenureError]=useState('')
    const[errorMsg,setErrorMsg]=useState('')

    const[creaditScore,setcreaditScore]=useState('889')
    const[accBalance,setaccBalance]=useState('300000')

    //let history = useHistory();

    //const { id } = useParams();
    // useEffect(() => {
    //     loadLoan();
    // }, []);

    // const loadLoan = async () => {
    //     console.log(accId);
    //     const result = await axios.get(`http://localhost:3032/api/customer/${accId}`);
    //     setcreaditScore(result.data.creaditScore);
    //     setaccBalance(result.data.accBalance);
    // };

    const valid=()=>{
        console.log("in validation");
            if (accId===""){
                setaccIdError("Please Enter Account Id");         
            }
            else if (loan_amount===""){
                setloanAmtError("Please Enter Loan Amount");
            }
            else if (tenure===""){
                setTenureError("Please Enter Tenure");
            }
            else if(accBalance<200000){
                setErrorMsg("Account balance should be greater than 200000");
            }
            else if(creaditScore<800){
                setErrorMsg("Creadit score should be greater than 800");
            }
            else{
                return true;
            }
        
    }

    const handleClick=(e)=>{
        e.preventDefault()
        setaccIdError("");  
        setloanAmtError("");
        setTenureError("");
        const LoanApplication={accId,loan_amount, tenure, status}
        console.log(LoanApplication)
        if(valid())
        {
            fetch("http://localhost:3032/api/loans",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(LoanApplication)
            }).then(()=>{
                console.log("New loan Application added")
                toast.success('Loan application submitted successfully!', {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    autoClose:2600
                });
                setloanamount("");
                // setAccountId("");
                setTenure("");

            }).catch((error) => {
                toast.error('Failed to submit loan application!', {
                    position: "top-right",
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    autoClose:4000
                });
            });
        }
        
    }

    const handleCancel=(e)=>{
        setloanamount("");
                // setAccountId("");
        setTenure("");
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
         <h1>Loan Application</h1>
          <div>
        <form>
            <table>
                <tr>
                <td>
                    <div>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField required id="account_id" label="Account Id" variant="standard" 
                            value={accId}
                            /* onChange={(e)=>setAccountId(e.target.value)} *//>
                        </Box>
                            <p style={{color:"red", fontSize:"12px"}}>{accIdError}</p>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <MonetizationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="loan_amount" label="Loan Amount" variant="standard" 
                            value={loan_amount}
                            onChange={(e)=>setloanamount(e.target.value)}/>
                        </Box>
                        <p style={{color:"red", fontSize:"12px"}}>{loanAmtError}</p>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="tenure" label="Tenure" variant="standard"
                            value={tenure}
                            onChange={(e)=>setTenure(e.target.value)} />
                        </Box>
                           <p style={{color:"red", fontSize:"12px"}}>{tenureError}</p>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AddTaskIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="status" label="Status" variant="standard" 
                            value={status}
                            /* onChange={(e)=>setStatus(e.target.value)} *//>
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
            <p style={{color:"red", fontSize:"12px"}}>{errorMsg}</p>
        </form> 
        </div>
        <div className="form-group">
            <table calss="center">
                <tr>
                    <td>
                        <Button variant="contained" padding="50, 20" onClick={handleClick}>Apply</Button>
                    </td> &nbsp; &nbsp;
                    <td>
                        <Button variant="contained" padding="50, 20" onClick={handleCancel}>Cancel</Button>
                    </td>
                </tr>
            </table>
        </div>
        </Paper>
    </Container>
  );
}