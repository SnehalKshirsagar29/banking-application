import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./components/home/Home";
import Accounts from "./components/accounts/Accounts";
import ShowBalance from "./components/accounts/ShowBalanace";
import TransactionSummary from "./components/accounts/TransactionSummary";
import Sidebar from './components/home/Sidebar';
import Transactions from './components/accounts/Transactions';
import CustomerApplication from './components/customer/CustomerApplication';
import CustomerDetails from './components/customer/CustomerDetails';
import TicketDetails from './components/customer/TicketDetails';
import LoginForm from './components/login/LoginForm';
import LoanApplication from './components/Loan/LoanApplication';
import CustLoanList from './components/Loan/CustLoanList';
import LoanList from './components/Loan/LoanList';
import LoanEdit from './components/Loan/LoanEdit';
import ViewLoan from './components/Loan/ViewLoan';
import Logout from './components/home/Logout';
import CreateAccRegistrationForm from './components/login/CreateAccRegistrationForm';


function App(props) {
   let isRegister = props.isRegister;
   let loggedInUser = JSON.parse(localStorage.getItem('user'));
   console.log("loggedInUser :::::: "+loggedInUser);
     if (loggedInUser != null && Object.keys(loggedInUser).length > 0) {
       console.log('Inside If condition : =========>');
       return (
       <BrowserRouter>
           {/* <Routes>
           <Route exact path="/login" element={<LoginForm />} />
           </Routes> */}
           
          {/* {...Object.keys(loggedInUser).length > 0} */}
           <Sidebar />
           {/* <Navigate exact from="/" to="/home" /> */}
           {/* <Redirect to="/home" />  */}
           {/* <Home/> */}
           <Routes>
           {/* Account service */}
           <Route exact path="/home" element={<Home />} />
           <Route exact path="/account" element={<Accounts />} />
           <Route exact path="/account/transaction" element={<Transactions />} />
           <Route exact path="/account/balance" element={<ShowBalance />} />
           <Route exact path="/account/summary" element={<TransactionSummary />} />

           {/* Customer service */}
           <Route exact path="/customer/ticket" element={<CustomerApplication />} />
           <Route exact path="/customer/details" element={<CustomerDetails />} />
           <Route exact path="/customer/ticketdetails" element={<TicketDetails />} />

          {/* Logout */}
           <Route exact path="/login" element={<Logout />} />
           <Route exact path="/register" element={<CreateAccRegistrationForm />} />
           {/* Loans service */}
           <Route exact path="/loans/apply" element={<LoanApplication />} />
           <Route exact path="/loans/details" element={<CustLoanList />} />
           <Route exact path="/loans/applications" element={<LoanList />} />
           <Route exact path="/loans/edit/:id" element={<LoanEdit />} />
           <Route exact path="/loans/viewloan/:id" element={<ViewLoan />} />

         </Routes>
       </BrowserRouter>
       );
     } else if(isRegister) {
      console.log("window.location register : "+window.location);
         return <CreateAccRegistrationForm />;
     }  else if(loggedInUser === null || Object.keys(loggedInUser).length === 0){
         console.log("window.location login: "+window.location);
         return <LoginForm />;
      }
}

export default App;
