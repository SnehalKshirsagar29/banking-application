import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Paper } from '@material-ui/core';
import axios from "axios";


const ViewLoan = () => {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "10px auto" }

    const [loan, setLoan] = useState({
        accId: "",
        loan_amount: "",
        tenure: "",
        status: "",
        loan_balance: "",
        tenure_balance: ""
    });

    //const { accId, loan_amount, tenure, status, loan_balance, tenure_balance} = loan; 

    const { id } = useParams();
    useEffect(() => {
        loadLoan();
    }, []);

    const loadLoan = async () => {
        console.log(id);
        const result = await axios.get(`http://localhost:3032/api/customer/${id}`);
        setLoan(result.data);
    };


    return (
        <div className="container py-4">
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <Link className="btn btn-primary" to="/custloanlistview">
                        back to Home
                    </Link>
                    {/*  <h1 className="display-4">User Id: {id}</h1> */}
                    <hr />
                    <center>
                    <ul className="list-group w-50" >
                        <li className="list-group-item">Account Number: {loan.accId}</li>
                        <li className="list-group-item">Loan ID: {loan.id}</li>
                        <li className="list-group-item">Loan Amount: {loan.loan_amount}</li>
                        <li className="list-group-item">Balance Amount: {loan.loan_balance}</li>
                        <li className="list-group-item">Tenure: {loan.tenure}</li>
                        <li className="list-group-item">Balance Tenure: {loan.tenure_balance}</li>
                        <li className="list-group-item">Status: {loan.status}</li>
                    </ul>
                    </center>
                </Paper>
            </Container>
        </div>
    );
};

export default ViewLoan;