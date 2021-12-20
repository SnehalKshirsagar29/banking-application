import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./components/home/Home";
import ShowBalance from "./components/accounts/ShowBalanace";
import TransactionSummary from "./components/accounts/TransactionSummary";
import Sidebar from './components/home/Sidebar';
import Transactions from './components/accounts/Transactions';
import CustomerApplication from './components/customer/CustomerApplication';
import CustomerDetails from './components/customer/CustomerDetails';
import LoginForm from './components/login/LoginForm';
import LoanApplication from './components/Loan/LoanApplication';
import CustLoanList from './components/Loan/CustLoanList';
import LoanList from './components/Loan/LoanList';
import LoanEdit from './components/Loan/LoanEdit';
import ViewLoan from './components/Loan/ViewLoan';
import Logout from './components/home/Logout';
import CreateAccRegistrationForm from './components/login/CreateAccRegistrationForm';
import NotificationsSummary from './components/notifications/NotificationSummary';
import CustomerTicketDetails from './components/customer/CustomerTicketDetails';
import BankUsers from './components/admin/BankUsers';
import AdminRegister from './components/admin/AdminRegister';
import BankAccounts from './components/accounts/BankAccounts';


function App(props) {
   let isRegister = props.isRegister;
   let loggedInUser = JSON.parse(localStorage.getItem('user'));
     if (loggedInUser != null && Object.keys(loggedInUser).length > 0) {
       return (
       <BrowserRouter>
           <Sidebar />
           
           <Routes>
           {/* Account service */}
           <Route exact path="/home" element={<Home />} />
           <Route exact path="/account/transaction" element={<Transactions />} />
           <Route exact path="/account/balance" element={<ShowBalance />} />
           <Route exact path="/account/summary" element={<TransactionSummary />} />

           {/* Admin */}
           <Route exact path="/users" element={<BankUsers />} />
           <Route exact path="/admins/add" element={<AdminRegister />} />
           <Route exact path="/accounts" element={<BankAccounts />} />

           
           {/* Customer service */}
           <Route exact path="/customer/ticket" element={<CustomerApplication />} />
           <Route exact path="/customer/details" element={<CustomerDetails />} />
           <Route exact path="/customer/ticketdetails" element={<CustomerTicketDetails />} />

          {/* Logout */}
           <Route exact path="/login" element={<Logout />} />

           {/* Loans service */}
           <Route exact path="/loans/apply" element={<LoanApplication />} />
           <Route exact path="/loans/details" element={<CustLoanList />} />
           <Route exact path="/loans/applications" element={<LoanList />} />
           <Route exact path="/loans/edit/:id" element={<LoanEdit />} />
           <Route exact path="/loans/viewloan/:id" element={<ViewLoan />} />

           {/* Notifications */}
           <Route exact path="/notifications" element={<NotificationsSummary />} />

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
