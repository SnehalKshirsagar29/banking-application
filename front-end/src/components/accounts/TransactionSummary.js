import React, { Component } from 'react';
import AccountApis from './AccountApis';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginate from 'paginate-array';
class TransactionSummary extends Component {
  constructor(props) {
    super(props)
    let loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.state = {
      statements: [],
      accountNumber: loggedInUser.accountNumber,
      startDate: '',
      endDate: '',
      size: 10,
      page: 1,
      currPage: null
    }
    this.sortStatements = this.sortStatements.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  componentDidMount() {
    AccountApis.getAllTransactions(this.state.accountNumber).then(response => response.data)
      .then(statements => {
        const { page, size } = this.state;
        const currPage = paginate(statements, page, size);

        this.setState({
          ...this.state,
          statements,
          currPage
        });
      });
  }
  sortStatements = (e) => {
    e.preventDefault()
    AccountApis.getSortedStatementBetweenDates(this.state.accountNumber, this.state.startDate, this.state.endDate)
      .then(response => response.data)
      .then(statements => {
        this.setState({
          statements: [],
          size: 10,
          page: 1,
          currPage: null
        });
        const { page, size } = this.state;
        const currPage = paginate(statements, page, size);
        console.log('page : ' + page + ' : totalPages : ' + currPage.totalPages);
        this.setState({
          ...this.state,
          statements,
          currPage
        });
      }).catch((error) => {
        console.log("error :" + error.response.data);
      });
    // .then((response) => {
    //     this.setState({ statements: [] });
    //     this.setState({ statements: response.data });
    // }).catch((error) => {
    //     console.log("error :"+error.response.data);
    // });
    console.log("Updates state : " + this.state);
  }

  previousPage() {
    const { page, size, statements } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(statements, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, statements } = this.state;
    console.log('page : ' + page + ' : totalPages : ' + currPage.totalPages);
    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(statements, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  render() {
    const { currPage } = this.state;
    console.log("statesss : currPage : " + JSON.stringify(currPage));
    console.log("totalPages : " + this.state.currPage);
    return (
      <div className="transaction-summary">
        {/* <div class="btn-text-right">  */}
        <div class="summaryContent">
          <h3>Transactions summary :</h3>
        </div>
        {currPage &&
          <ul>
            <div class="datecontact">
              <input type="date" name="startDate" value={this.state.startDate} onChange={this.onChange} /> &nbsp;
              <input type="date" name="endDate" value={this.state.endDate} onChange={this.onChange} /> &nbsp; &nbsp;
              <button type="button" className="btn btn-primary" onClick={this.sortStatements}
                disabled={!this.state.startDate || !this.state.endDate} > Go </button> &nbsp; &nbsp; &nbsp; &nbsp;
              <button type="button" class="btn btn-primary" onClick={this.previousPage}
                disabled={currPage.currentPage <= 1} >Previous</button> &nbsp; &nbsp;
              <button type="button" class="btn btn-primary" onClick={this.nextPage}
                disabled={currPage.totalPages === currPage.currentPage} >Next</button>
              {/* </ul>} */}
            </div> <br />
            {/* {currPage &&
                    <ul> */}
            <table className="table table-condensed">
              <thead class="table-dark">
                <tr>
                  <th>AccountNumber</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>TransactionDate</th>
                  <th>Comment</th>
                  <th>TransactionId</th>
                </tr>
              </thead>
              <tbody>
                {
                  currPage.data.map(
                    stmt =>
                      <tr key={stmt.accountNumber}>
                        <td>{stmt.accountNumber} </td>
                        <td>{stmt.amount.toFixed(2)} </td>
                        <td>{stmt.transactionType} </td>
                        <td>{stmt.transactionDate} </td>
                        <td>{stmt.comment} </td>
                        <td>{stmt.transactionId} </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          </ul>
        }
      </div>
    );
  }
}

export default TransactionSummary;