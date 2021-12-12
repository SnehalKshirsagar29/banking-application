import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Container ,Paper} from '@material-ui/core';
import registration from '../../images/Registration.png';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import axios from "axios";

const LoanEdit = () => {
    //let history = useHistory();
    const { id } = useParams();
    const paperStyle={padding:'50px 20px', width:600,margin:"10px auto"}
    // const[acc_id,setAccountId]=useState('')
    // const[loan_amount,setloanamount]=useState('')
    // const[tenure,setTenure]=useState('')
     const[status,setStatus]=useState('')

    
  const [loan, setLoan] = useState({
    accId: "",
    loan_amount: "",
    tenure: ""
  });

  const { accId, loan_amount, tenure} = loan;
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
    const handleClick=(e)=>{
        e.preventDefault()
        const LoanApplication={id, accId,loan_amount, tenure, status}
        console.log(LoanApplication)
         fetch("http://localhost:3032/api/loans",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(LoanApplication)
        }).then(()=>{
            console.log("New loan Application added")
          })
    }

    const handleCancel=(e)=>{
       // history.push('/');
    }

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
                                                <TextField id="status" label="Status" variant="standard"
                                                    value={status}
                                                    onChange={e => setStatus(e.target.value)} />
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
                            </td>
                            <td>
                                <Button variant="contained" padding="50, 20" onClick={handleCancel}>Cancel</Button>
                            </td>
                        </tr>
                    </table>
                </div>
            </Paper>
        </Container>
    );
};

export default LoanEdit;