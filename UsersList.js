import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/users')
      .then(response => response.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedUsers = [...this.state.users].filter(i => i.id !== id);
      this.setState({users: updatedUsers});
    });
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const UsersList = users.map(user => {
      const userInfo = `${user.name || ''} ${user.email || ''} ${user.description || ''} ${user.status}`;
 	  return <tr key={user.id}>
        <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
		<td style={{whiteSpace: 'nowrap'}}>{user.email}</td>
		<td style={{whiteSpace: 'nowrap'}}>{user.description}</td>
		<td style={{whiteSpace: 'nowrap'}}>{user.status}</td>
       <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
          </ButtonGroup>
        </td>
		<td>
			<Button size="sm" color="warning" tag={Link} to={"/users/" + user.id + "/orders"}>View</Button>
		</td>
					
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">Add user</Button>
          </div>
          <h3>Users List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">E-mail</th>
              <th width="30%">Description</th>
			  <th width="10%">Status</th>
              <th width="10%">Actions</th>
			  <th width="10%">Orders</th>
            </tr>
            </thead>
            <tbody>
            {UsersList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UsersList;
