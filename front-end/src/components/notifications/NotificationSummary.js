import React, { Component } from 'react';
import NotificationApis from './NotificationApis';

//import './Notificationsummary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class NotificationsSummary extends Component {
    constructor(props) {
        super(props)
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        this.state = {
            statements: [],
           // customerId:loggedInUser.accountNumber
           customerId:111

        }
    }
    componentDidMount() {
         NotificationApis.getNotificationsByCustomerId(this.state.customerId).then((response) => {
           this.setState({ statements: response.data });
         });
     
    }
    render() {
        return (
            <div className="notificationsummary">
                <h2>Notifications summary</h2>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Message</th>

                        </tr>
                    </thead>
                 {   <tbody>
                        {
                            this.state.statements.map(
                                stmt =>
                                    <tr key={stmt.customerId}>
                                        <td>{stmt.customerId} </td>
                                        <td>{stmt.notification_date} </td>
                                        <td>{stmt.message} </td>
                                    </tr>
                            )
                        }
                    </tbody> }
                </table>
            </div>
        );
    }
}

export default  NotificationsSummary;
