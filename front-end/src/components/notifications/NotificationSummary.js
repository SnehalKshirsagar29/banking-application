import React, { Component } from 'react';
import NotificationApis from './NotificationApis';

import 'bootstrap/dist/css/bootstrap.min.css';
class NotificationsSummary extends Component {
    constructor(props) {
        super(props)
        let loggedInUser = JSON.parse(localStorage.getItem('user'));
        this.state = {
            statements: [],
            customerId:loggedInUser.accountNumber

        }
    }
    componentDidMount() {
         NotificationApis.getNotificationsByCustomerId(this.state.customerId).then((response) => {
           this.setState({ statements: response.data });
           console.log("note : "+JSON.stringify(response.data));
         });
     
    }
    render() {
        return (
            <div className="notification_summary">
                <h2>Notifications Summary :</h2>
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