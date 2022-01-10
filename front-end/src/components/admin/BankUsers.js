import React, { Component } from 'react'
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AccountApis from '../accounts/AccountApis';
//import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

export default class BankUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      admins: [],
      roleName: 'All'
    }
  }

  gitAllBankUsers = () => {
    return AccountApis.getAllUsers().then(response => response.data)
      .then(admins => {
        console.log("admins :" + admins);
        this.setState({
          admins
        });
      }).catch((error) => {
        console.log("error :" + error.response.data);
      });
  }

  componentDidMount() {
    this.gitAllBankUsers();
  }

  sortUsers = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("roleName : " + e.target.value)
    if (e.target.value === 'All') {
      this.gitAllBankUsers();
    } else {
      AccountApis.getUsersByRole(e.target.value).then(response => response.data)
        .then(admins => {
          console.log("role wise users :" + admins);
          this.setState({
            admins
          });
        }).catch((error) => {
          console.log("error :" + error.response.data);
        });
    }
  }

  filterUsersByrole = (e) => {
    e.preventDefault()
    AccountApis.getAllUsers().then(response => response.data)
      .then(admins => {
        console.log("admins :" + admins);
        this.setState({
          admins
        });
      }).catch((error) => {
        console.log("error :" + error.response.data);
      });
  }
  render() {
    let loggedInUser = JSON.parse(localStorage.getItem('user'));
    let isAdmin = loggedInUser.roleName === "Super Admin" ? true : false;
    return (
      <div className="admin-users">
        <h2><b>Users </b>
          {
            isAdmin && <Link to="/admins/add" ><PlusCircleFill color='green' /> </Link>
          }
          <div class="right-dropdown">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role Name</InputLabel>
              <Select
                labelId="demo-simple-select-label" id="outlined-required"
                name="roleName"
                value={this.state.roleName}
                label="Role Name"
                onChange={this.sortUsers}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
        </h2>
        <table className="table table-condensed">
          <thead class="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role Name</th>
              <th>Contact Number</th>
              <th>Age</th>
              <th>Email Id</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.admins.map(
                user =>
                  <tr key={user.id}>
                    <td>{user.firstName} </td>
                    <td>{user.lastName} </td>
                    <td>{user.roleName} </td>
                    <td>{user.contactNumber} </td>
                    <td>{user.age} </td>
                    <td>{user.emailId} </td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
