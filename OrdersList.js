import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class OrdersList extends Component {
  constructor(props) {
    super(props);
	this.state = {orders: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
	
  componentDidMount() {
	this.setState({isLoading: true});
	fetch(window.location.pathname)
      .then(response => response.json())
      .then(data => this.setState({orders: data, isLoading: false}));
  }
  
  async remove(id) {
    await fetch(window.location.pathname + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedOrders = [...this.state.orders].filter(i => i.id !== id);
      this.setState({orders: updatedOrders});
    });
  }

 render() {
    const {orders, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const OrdersList = orders.map(order => {
      const orderInfo = `${order.poNumber || ''} ${order.description || ''} ${order.sum || ''} ${order.status}`;
 	  return <tr key={order.id}>
        <td style={{whiteSpace: 'nowrap'}}>{order.poNumber}</td>
		<td style={{whiteSpace: 'nowrap'}}>{order.description}</td>
		<td style={{whiteSpace: 'nowrap'}}>{order.sum}</td>
		<td style={{whiteSpace: 'nowrap'}}>{order.status}</td>
       <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/users/:id/orders" + order.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(order.id)}>Delete</Button>
          </ButtonGroup>
        </td>					
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/:id/orders/new">Add order</Button>
          </div>
          <h3>Orders List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">PO Number</th>
              <th width="20%">Description</th>
              <th width="30%">Sum</th>
			  <th width="10%">Status</th>
              <th width="10%">Actions</th>
	        </tr>
            </thead>
            <tbody>
            {OrdersList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }  
}

export default OrdersList;