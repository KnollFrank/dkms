// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import Form from './Form';

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
        <div className={"container pt-4"}>
          <div className={"row justify-content-center"}>
            <div className={"card"}>
              <h5 className={"card-header"}>
                Validation Test Form
              </h5>
              <div className={"card-body"}>
                <form>
                  <div className="form-group">
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='last_name'>Last Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='phone'>Phone:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='address'>Address:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='description'>Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div className={"row justify-content-md-center"}>
                    <div className={"col-sm-12"}>
                      <button type={"submit"}
                              className="btn btn-primary mb-2"
                              onClick={this.submit}>
                              Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
