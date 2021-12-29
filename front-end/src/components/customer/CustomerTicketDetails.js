import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginate from 'paginate-array';
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import FormControl from '@mui/material/FormControl';
import { MenuItem, Paper, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
if (typeof window !== "undefined") {
    injectStyle();
}

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
            currPage: null,
            isOpen: false,
            status: '',
            cust_id: '',
            show: false
        }
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);

    }
    openModal = (e) => this.setState({ isOpen: true, cust_id: e.target.id });
    closeModal = () => this.setState({ isOpen: false });
    updateModal = (e) => {
        let obj = { status: this.state.status };
        axios.put('http://localhost:8080/api/customer-service/customer/update/' + this.state.cust_id, obj)
            .then(response => {
                toast.dark("Your Status is updated 👋, for Ticket Id:" + this.state.cust_id);
                this.State = {
                    status: '',
                    isOpen: false,
                    cust_id: ''
                };
                this.closeModal();
                this.componentDidMount();
            }).catch((error) => {
                toast.dark("Hello 👋, your status  of ticket changed sucessfully!" + error.response.status);
            }
            );
    }

    componentDidMount() {
        let url;
        if (this.state.accountNumber != null) {
            this.setState({ show: false })
            url = 'http://localhost:8080/api/customer-service/customer/' + this.state.accountNumber
        }
        else {
            this.setState({ show: true })
            url = 'http://localhost:8080/api/customer-service/getAllcustomer'
        }
        axios.get(url).then(response => response.data)
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
        axios.get('http://localhost:8080/api/customer-service/customer/1/ticket/' + this.state.ticketid)
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

    handelInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { currPage } = this.state;
        console.log("statesss : currPage : " + JSON.stringify(currPage));
        console.log("totalPages : " + this.state.currPage);
        return (
            <div className="transaction-summary">
                {/* <div class="btn-text-right">  */}
                <div class="summaryContent">
                    <ToastContainer />
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
                                    <th style={{ display: this.state.show ? "block" : "none" }} >Update Status</th>
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
                                                <td>{customer.status}</td>
                                                <td style={{ display: this.state.show ? "block" : "none" }}>
                                                    <>
                                                        <Button variant="primary" onClick={this.openModal} id={customer.id}>
                                                            updateStatus
                                                        </Button>
                                                        <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Update Status of Customer</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                    <FormControl fullWidth>

                                                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label" required id="outlined-required"
                                                                            name="status" id="status"
                                                                            value={this.state.status}
                                                                            label="Status"
                                                                            onChange={this.handelInput}
                                                                        >
                                                                            <MenuItem value="NEW">NEW</MenuItem>
                                                                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                                                                            <MenuItem value="IN-PROCESS">IN-PROCESS</MenuItem>
                                                                            <MenuItem value="DECLINED">DECLINED</MenuItem>
                                                                            <MenuItem value="CLOSED">CLOSED</MenuItem>
                                                                        </Select>

                                                                    </FormControl>
                                                                </Box>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={this.updateModal}>
                                                                    Submit
                                                                </Button>
                                                                <Button variant="secondary" onClick={this.closeModal}>
                                                                    Close
                                                                </Button>

                                                            </Modal.Footer>
                                                        </Modal>
                                                    </>

                                                </td>
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