// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import Form from './Form';

export default class DonorCreate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        salutation: '',
        title: '',
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

    submit() {
        try {
          this.props.createDonor(this.state);
          alert("Donor created!");
        } catch(err) {
          alert('There was an error! Please re-check your form.');
        }
    }

    handleUserInput(e) {
      const name = e.target.name;
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
                <Form submit={this.submit}>
                  <div className="form-group">
                    <div className="form-check">
                      <label>
                        <input
                          name="salutation"
                          type="radio"
                          value="Mr"
                          checked={this.state.salutation === "Mr"}
                          onChange={this.handleUserInput}
                        />
                        Mr
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          name="salutation"
                          type="radio"
                          value="Mrs"
                          checked={this.state.salutation === "Mrs"}
                          onChange={this.handleUserInput}
                        />
                        Mrs
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <select name="title"
                            value={this.state.title}
                            onChange={this.handleUserInput}>
                      <option value="DR">Dr.</option>
                      <option value="DR_MED">Dr. med.</option>
                      <option value="DR_MED_DENT">Dr. med. dent.</option>
                      <option value="DR_PHARM">Dr. pharm.</option>
                      <option value="DR_RER_HUM">Dr. rer. hum.</option>
                      <option value="PROF">Prof.</option>
                      <option value="PROF_DR">Prof. Dr.</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                      className="form-control"
                      required={true}
                      type="text"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
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
                    <div className="invalid-feedback" />
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
                    <div className="invalid-feedback" />
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
                    <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                    <div className="invalid-feedback" />
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
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='description'>Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className={"row justify-content-md-center"}>
                    <div className={"col-sm-12"}>
                      <button type={"submit"}
                              className="btn btn-primary mb-2">
                              Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
