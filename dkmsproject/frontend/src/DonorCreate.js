// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import Form from './Form';
import DonorsService from './DonorsService';

// TODO: this form should look exactly like the online DKMS web form
// TODO: required fields shall be marked with an *
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
        mobile: '',
        address: '',
        street: '',
        city: '',
        houseno: '',
        zipcode: '',
        co: '',
        apartment: '',
        ancestry: '',
        ancestry_choices: [],
        dataprotectionprivacy: false
      };
      this.submit = this.submit.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentDidMount() {
      new DonorsService()
        .get_ancestry_choices_promise()
        .then(ancestry_choices => {
          this.setState({ ancestry_choices: ancestry_choices });
        });
      }

    submit() {
        try {
          this.props.createDonor(this.state);
          alert("Donor created!");
        } catch(err) {
          alert('There was an error! Please re-check your form.');
        }
    }

    handleUserInput(event) {
      const target = event.target;
      const name = target.name;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({[name]: value });
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
                    <label htmlFor='salutation'>Salutation:</label>
                    <div className="form-check">
                      <label>
                        <input
                          name="salutation"
                          type="radio"
                          value="Mr"
                          required
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
                          required
                          checked={this.state.salutation === "Mrs"}
                          onChange={this.handleUserInput}
                        />
                        Mrs
                      </label>
                    </div>
                    <div className="invalid-feedback" />
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
                    <label htmlFor='ancestry'>Ancestry:</label>
                    <select name="ancestry"
                            value={this.state.ancestry}
                            onChange={this.handleUserInput}>
                            {
                              this.state.ancestry_choices.map(
                                function(ancestry_choice) {
                                  return <option key={ancestry_choice[0]} value={ancestry_choice[0]}>{ancestry_choice[1]}</option>;
                                })
                            }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      id="first_name"
                      required
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
                      id="last_name"
                      required
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
                      pattern="[\d\+\s]*"
                      inputmode="numeric"
                      minlength="7"
                      maxlength="20"
                    />
                    <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='phone'>Mobile:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="mobile"
                      value={this.state.mobile}
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
                    <label htmlFor='street'>Street:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="street"
                      value={this.state.street}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='city'>City:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='houseno'>House number:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="houseno"
                      value={this.state.houseno}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='zipcode'>ZIP:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="zipcode"
                      value={this.state.zipcode}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='co'>c/o:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="co"
                      value={this.state.co}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor='apartment'>Apartment:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="apartment"
                      value={this.state.apartment}
                      onChange={this.handleUserInput}
                    />
                    <div className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label>
                      Declaration of Consent:
                      <input
                        name="dataprotectionprivacy"
                        type="checkbox"
                        checked={this.state.dataprotectionprivacy}
                        onChange={this.handleUserInput} />
                    </label>
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
