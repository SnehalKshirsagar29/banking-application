import React, { Component } from 'react';
import AccountApis from './AccountApis';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginate from 'paginate-array';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
class BankAccounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      size: 10,
      page: 1,
      accountType: 'All',
      currPage: null
    }
    this.sortAccounts = this.sortAccounts.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  setInitialState = () => {
    this.setState({
      accounts: [],
      size: 10,
      page: 1,
      currPage: null
    });
  }

  getAllBankAccounts = () => {
    AccountApis.getAllAccounts().then(response => response.data)
      .then(accounts => {
        const { page, size } = this.state;
        const currPage = paginate(accounts, page, size);
        this.setState({
          ...this.state,
          accounts,
          currPage
        });
      });
  }
  componentDidMount() {
    this.getAllBankAccounts();
  }
  sortAccounts = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "All") {
      this.setInitialState();
      this.getAllBankAccounts();
    } else {
      AccountApis.sortAccounts(e.target.value)
        .then(response => response.data)
        .then(accounts => {
          this.setInitialState();
          const { page, size } = this.state;
          const currPage = paginate(accounts, page, size);
          this.setState({
            ...this.state,
            accounts,
            currPage
          });
        }).catch((error) => {
          console.log("error :" + error.response.data);
        });
    }
  }

  previousPage() {
    const { page, size, accounts } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(accounts, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, accounts } = this.state;
    console.log('page : ' + page + ' : totalPages : ' + currPage.totalPages);
    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(accounts, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  render() {
    const { currPage } = this.state;
    return (
      <div className="accounts-summary">
        <div class="summaryContent">
          <h2><b>Accounts :</b></h2>
        </div>
        {currPage &&
          <ul>
            <div class="right-dropdown">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label" id="outlined-required"
                  name="accountType"
                  value={this.state.accountType}
                  label="Account Type"
                  onChange={this.sortAccounts}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Saving">Saving</MenuItem>
                </Select>
              </FormControl>
            </div>
            <table className="table table-condensed">
              <thead class="table-dark">
                <tr>
                  <th>AccountNumber</th>
                  <th>BankHolderName</th>
                  <th>Account Type</th>
                  <th>Branch Name</th>
                  <th>Balance</th>
                  <th>EmailId</th>
                  <th>Contact Number</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  currPage.data.map(
                    account =>
                      <tr key={account.accountNumber}>
                        <td>{account.accountNumber}</td>
                        <td>{account.firstName}  {account.lastName}</td>
                        <td>{account.accountType} </td>
                        <td>{account.branchName} </td>
                        <td>{account.balance.toFixed(2)} </td>
                        <td>{account.email} </td>
                        <td>{account.mobileNumber} </td>
                        <td>{account.score} </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
            <div class="pagination-buttons">
              <button type="button" class="btn btn-primary" onClick={this.previousPage}
                disabled={currPage.currentPage <= 1} >Previous</button> &nbsp; &nbsp;
              <button type="button" class="btn btn-primary" onClick={this.nextPage}
                disabled={currPage.totalPages === 0 || currPage.totalPages === currPage.currentPage} >Next</button>
            </div>
          </ul>
        }
      </div>
    );
  }
}

export default BankAccounts;