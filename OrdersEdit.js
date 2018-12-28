import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class OrdersEdit extends Component {
	
  emptyItem = {
    id:'',
	poNumber: '',
    description: '',
    sum: '',
    status: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.sourceUrl = window.location.pathname;
	this.sourceUrlOrders = this.sourceUrl.substr(0, this.sourceUrl.lastIndexOf("/"));
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const order = await (await fetch(window.location.pathname)).json();
      this.setState({item: order});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('orders', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push(this.sourceUrlOrders);
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Order' : 'Add Order'}</h2>;
	return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="id">ID</Label>
            <Input type="text" name="id" id="id" value={item.id || ''}
                   onChange={this.handleChange} autoComplete="id"/>
          </FormGroup>
          <FormGroup>
            <Label for="poNumber">PO Number</Label>
            <Input type="text" name="poNumber" id="poNumber" value={item.poNumber || ''}
                   onChange={this.handleChange} autoComplete="poNumber"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="description"/>
          </FormGroup>
          <FormGroup>
            <Label for="sum">sum</Label>
            <Input type="text" name="sum" id="sum" value={item.sum || ''}
                   onChange={this.handleChange} autoComplete="sum"/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input type="text" name="status" id="status" value={item.status || ''}
                   onChange={this.handleChange} autoComplete="status"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to={this.sourceUrlOrders}>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(OrdersEdit);