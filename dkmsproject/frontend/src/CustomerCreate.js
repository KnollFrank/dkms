// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';

export default class CustomerCreate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        description: ''
      };
      this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        try {
          this.props.createCustomer(this.state);
          alert("Customer created!");
        } catch(err) {
          alert('There was an error! Please re-check your form.');
        }
    }

    render() {
      return (
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={e => this.setState({ first_name: e.target.value })}
            />

            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={e => this.setState({ last_name: e.target.value })}
            />

            <label>Email:</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <label>Phone:</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />

            <label>Address:</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
            />

            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />

            <button className="btn btn-primary" onClick={this.handleAdd}>Submit</button>
          </div>
        </form>
      );
    }
}
