import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginate from 'paginate-array';
import axios from "axios";
class CustomerTicketDetails extends Component {
    constructor(props) {
        super(props)
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        this.state = {
            customerTickets: [],
            accountNumber: loggedInUser.accountNumber,
            ticketid: '',
            size: 10,
            page: 1,
            currPage: null
        }
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4040/api/customer/' + this.state.accountNumber).then(response => response.data)
            .then(customerTickets => {
                const { page, size } = this.state;
                const currPage = paginate(customerTickets, page, size);
                console.log(currPage);

                this.setState({
                    ...this.state,
                    customerTickets,
                    currPage
                });
            });
    }
    searchTicket = (e) => {
        e.preventDefault()
        axios.get('http://localhost:4040/api/customer/1/ticket/' + this.state.ticketid)
            .then(tickets => {
                console.log("tickets" + JSON.stringify(tickets.data));
                const arrayticket = [];
                arrayticket.push(tickets.data);
                this.setState({
                    tickets: [],
                    size: 10,
                    page: 1,
                    currPage: null
                });
                const { page, size } = this.state;
                const currPage = paginate(arrayticket, page, size);
                console.log(currPage);

                this.setState({
                    ...this.state,
                    tickets,
                    currPage
                });
            });
    }


    previousPage() {
        const { page, size, customerTickets } = this.state;

        if (page > 1) {
            const newPage = page - 1;
            const newCurrPage = paginate(customerTickets, newPage, size);

            this.setState({
                ...this.state,
                page: newPage,
                currPage: newCurrPage
            });
        }
    }

    nextPage() {
        const { currPage, page, size, customerTickets } = this.state;
        console.log('page : ' + page + ' : totalPages : ' + currPage.totalPages);
        if (page < currPage.totalPages) {
            const newPage = page + 1;
            const newCurrPage = paginate(customerTickets, newPage, size);
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
                    <h3>Customer Ticket Summary :</h3>
                </div>
                {currPage &&
                    <ul>
                        <div class="datecontact">
                            <input type="number" placeholder="TicketId" name="ticketid" value={this.state.ticketid} onChange={this.onChange} /> &nbsp;

                            <button type="button" className="btn btn-primary" onClick={this.searchTicket}
                                disabled={!this.state.ticketid} > Search </button> &nbsp; &nbsp; &nbsp; &nbsp;
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
                                    <th>TicketId</th>
                                    <th>EmailAddress</th>
                                    <th>Message</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currPage.data.map(
                                        customer =>
                                            <tr key={customer.id}>
                                                <td>{customer.id}</td>
                                                <td>{customer.emailAddress}</td>
                                                <td>{customer.message} </td>
                                                <td>{customer.phone} </td>
                                                <td>{customer.status} </td>
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

export default CustomerTicketDetails;