// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import Form from './Form';
import DonorsService from './DonorsService';

// TODO: this form should look exactly like the online DKMS web form
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
    new DonorsService().get_ancestry_choices_promise().then(ancestry_choices => {
      this.setState({ancestry_choices: ancestry_choices});
    });
  }

  submit() {
    try {
      this.props.createDonor(this.state);
      alert("Donor created!");
    } catch (err) {
      alert('There was an error! Please re-check your form.');
    }
  }

  handleUserInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({[name]: value});
  }

  render() {
    return (<Form submit={this.submit}>
      <ol>

        <div className="form-group">
          <label htmlFor='salutation'>Salutation *</label>
          <div className="form-check">
            <label>
              <input className="form-control" name="salutation" type="radio" value="Mr" required="required" checked={this.state.salutation === "Mr"} onChange={this.handleUserInput}/>
              Mr
              <div className="invalid-feedback"/>
            </label>
          </div>

          <div className="form-check">
            <label>
              <input className="form-control" name="salutation" type="radio" value="Mrs" required="required" checked={this.state.salutation === "Mrs"} onChange={this.handleUserInput}/>
              Mrs
              <div className="invalid-feedback"/>
            </label>
          </div>
        </div>

        <div className="form-group">
          <select name="title" value={this.state.title} onChange={this.handleUserInput}>
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
          <label htmlFor='ancestry'>Ancestry *</label>
          <select className="form-control" name="ancestry" id="ancestry" required="required" value={this.state.ancestry} onChange={this.handleUserInput}>
            <option value="" selected="selected">Please select</option>
            {
              this.state.ancestry_choices.map(function(ancestry_choice) {
                return <option key={ancestry_choice[0]} value={ancestry_choice[0]}>{ancestry_choice[1]}</option>;
              })
            }
          </select>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='first_name'>First Name *</label>
          <input className="form-control" type="text" name="first_name" id="first_name" required="required" value={this.state.first_name} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='last_name'>Last Name *</label>
          <input className="form-control" type="text" name="last_name" id="last_name" required="required" value={this.state.last_name} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='email'>Email *</label>
          <input className="form-control" type="email" name="email" id="email" required="required" value={this.state.email} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='phone'>Phone</label>
          <input className="form-control" type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleUserInput} pattern="[\d\+\s]*" inputmode="numeric" minlength="7" maxlength="20"/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='mobile'>Mobile</label>
          <input className="form-control" type="text" name="mobile" value={this.state.mobile} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='address'>Address</label>
          <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='street'>Street *</label>
          <input className="form-control" type="text" name="street" id="street" required="required" value={this.state.street} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='city'>City *</label>
          <input className="form-control" type="text" name="city" id="city" required="required" value={this.state.city} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='houseno'>House number *</label>
          <input className="form-control" type="text" name="houseno" id="houseno" required="required" value={this.state.houseno} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='zipcode'>ZIP *</label>
          <input className="form-control" type="text" name="zipcode" id="zipcode" required="required" pattern="\d{5}" value={this.state.zipcode} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='co'>c/o</label>
          <input className="form-control" type="text" name="co" value={this.state.co} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label htmlFor='apartment'>Apartment</label>
          <input className="form-control" type="text" name="apartment" value={this.state.apartment} onChange={this.handleUserInput}/>
          <div className="invalid-feedback"/>
        </div>

        <div className="form-group">
          <label>
            Declaration of Consent *
            <input className="form-control" name="dataprotectionprivacy" id="dataprotectionprivacy" required="required" type="checkbox" checked={this.state.dataprotectionprivacy} onChange={this.handleUserInput}/>
            <div className="invalid-feedback"/>
          </label>
        </div>
      </ol>
      <div class="row">
        <div class="small-12 small-offset-1 columns">
          * Mandatory Fields
        </div>
      </div>
      <div class="btnWrap">
        <input type="submit" class="submitBtn" data-disabled-label="Please wait" value="Register"/>
      </div>
    </Form>);
  }
}
