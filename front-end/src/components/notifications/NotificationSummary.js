import React, { Component } from 'react';
import NotificationApis from './NotificationApis';

//import './Notificationsummary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class NotificationsSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statements: []

        }
    }
    componentDidMount() {
         NotificationApis.getAllNotifications(this.state.accountNumber).then((response) => {
           this.setState({ statements: response.data });
           console.log("in didi mount: "+this.state.statements);
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
                                    <tr key={stmt.id}>
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
