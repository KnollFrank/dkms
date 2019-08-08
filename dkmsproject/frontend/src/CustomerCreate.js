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
      this.submit = this.submit.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
    }

    submit(e) {
        e.preventDefault();
        try {
          this.props.createCustomer(this.state);
          alert("Customer created!");
        } catch(err) {
          alert('There was an error! Please re-check your form.');
        }
    }

    handleUserInput(e) {
      const name = e.currentTarget.name;
      const value = e.target.value;
      this.setState({[name]: value});
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
              onChange={this.handleUserInput}
            />

            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleUserInput}
            />

            <label>Email:</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleUserInput}
            />

            <label>Phone:</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleUserInput}
            />

            <label>Address:</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleUserInput}
            />

            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.handleUserInput}
            />

            <button className="btn btn-primary" onClick={this.submit}>Submit</button>
          </div>
        </form>
      );
    }
}
