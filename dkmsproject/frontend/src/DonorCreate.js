// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import Form from './Form';
import DonorsService from './DonorsService';

// TODO: this form should look exactly like the online DKMS web form
// TODO: use https://parsleyjs.org/ for validation?
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
        <li class="no block-personalinfo">
          <section class="inputgroup personalinfo">
            <div class="heading row small-collapse">
              <div class="small-12 columns">
                <div class="row">
                  <div class="title small-12 columns">
                    Personal information
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <fieldset class="">
                    <div class="row">
                      <ul>
                        <li class="fieldwrapper salutation required   ">
                          <label for="id_salutation_0">Salutation
                          </label>
                          <ul id="id_salutation">
                            <li>
                              <label for="id_salutation_0">
                                <input className="form-control" name="salutation" id="id_salutation_0" type="radio" value="Mr" required="required" checked={this.state.salutation === "Mr"} onChange={this.handleUserInput}/>
                                Mr.
                                <div className="invalid-feedback"/>
                              </label>
                            </li>
                            <li>
                              <label for="id_salutation_1">
                                <input className="form-control" name="salutation" id="id_salutation_1" type="radio" value="Mrs" required="required" checked={this.state.salutation === "Mrs"} onChange={this.handleUserInput}/>
                                Mrs.
                                <div className="invalid-feedback"/>
                              </label>
                            </li>
                          </ul>
                        </li>
                        <li class="fieldwrapper title   ">
                          <label for="id_title">Title
                          </label>
                          <select name="title" id="id_title" value={this.state.title} onChange={this.handleUserInput}>
                            <option value="DR">Dr.</option>
                            <option value="DR_MED">Dr. med.</option>
                            <option value="DR_MED_DENT">Dr. med. dent.</option>
                            <option value="DR_PHARM">Dr. pharm.</option>
                            <option value="DR_RER_HUM">Dr. rer. hum.</option>
                            <option value="PROF">Prof.</option>
                            <option value="PROF_DR">Prof. Dr.</option>
                          </select>
                        </li>
                        <li class="fieldwrapper firstname required   ">
                          <label for="first_name">First name
                          </label>
                          <input className="form-control" type="text" name="first_name" id="first_name" required="required" value={this.state.first_name} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper lastname required   ">
                          <label for="last_name">Last name
                          </label>
                          <input className="form-control" type="text" name="last_name" id="last_name" required="required" value={this.state.last_name} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                      </ul>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <div class="divider"></div>
        </li>
        <li class="no block-address">
          <section class="inputgroup address">
            <div class="heading row small-collapse">
              <div class="small-12 columns">
                <div class="row">
                  <div class="title small-12 columns">
                    Private address
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <fieldset class="">
                    <div class="row description">
                      <ul>
                        <li>We will send the registration kit to this address. Please do not enter a business address, since we create your donor profile with this data.</li>
                      </ul>
                    </div>
                    <div class="row">
                      <ul>
                        <li class="fieldwrapper address   block ">
                          <label for="id_address">Address
                          </label>
                          <input className="form-control" type="text" id="id_address" name="address" value={this.state.address} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper address_error_field   ">
                          <label for="id_address_error_field">We were unable to find the given address. Please click
                            <span class="underline">here</span>
                            or press enter to enter the address fields manually.
                          </label>
                          <input type="text" name="address_error_field" disabled="disabled" id="id_address_error_field"/></li>
                        <li class="fieldwrapper street required">
                          <label for="street">Street
                          </label>
                          <input className="form-control" type="text" name="street" id="street" required="required" value={this.state.street} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper houseno required">
                          <label for="houseno">House number
                          </label>
                          <input className="form-control" type="text" name="houseno" id="houseno" required="required" value={this.state.houseno} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper apartment">
                          <label for="id_apartment">Apartment (optional)
                          </label>
                          <input className="form-control" type="text" id="id_apartment" name="apartment" value={this.state.apartment} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper co_field">
                          <label for="id_co_field" class="input-hidden">Show c/o input field</label>
                          <input className="form-control" type="text" id="id_co_field" name="co" value={this.state.co} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper zipcode required">
                          <label for="zipcode">ZIP
                          </label>
                          <input className="form-control" type="text" name="zipcode" id="zipcode" required="required" pattern="\d{5}" value={this.state.zipcode} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper city required">
                          <label for="city">City
                          </label>
                          <input className="form-control" type="text" name="city" id="city" required="required" value={this.state.city} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                      </ul>
                    </div>
                    <div class="row description">
                      <ul>
                        <li>Please note that we only can add you if you live in Germany.</li>
                      </ul>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <div class="divider"></div>
        </li>
        <li class="no block-additionalinfo">
          <section class="inputgroup additionalinfo">
            <div class="heading row small-collapse">
              <div class="small-12 columns">
                <div class="row">
                  <div class="title small-12 columns">
                    Contact details
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <fieldset class="">
                    <div class="row">
                      <ul>
                        <li class="fieldwrapper phone   ">
                          <label for="phone">Telephone number (private)
                          </label>
                          <input className="form-control" type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleUserInput} pattern="[\d\+\s]*" inputmode="numeric" minlength="7" maxlength="20"/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper mobile   ">
                          <label for="mobile">Cell phone number
                          </label>
                          <input className="form-control" type="text" name="mobile" value={this.state.mobile} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                        <li class="fieldwrapper email required   ">
                          <label for="email" class="hasInfoMessage">Email address (private if possible)
                            <div class="infoMessage" style={{
                                height: '85px',
                                top: '-90px'
                              }}>Your e-mail address is important, e.g. to clarify queries.</div>
                          </label>
                          <input className="form-control" type="email" name="email" id="email" required="required" value={this.state.email} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                      </ul>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <div class="divider"></div>
        </li>
        <li class="no block-helpreachmorepeople">
          <section class="inputgroup helpreachmorepeople">
            <div class="heading row small-collapse">
              <div class="small-12 columns">
                <div class="row">
                  <div class="title small-12 columns">
                    Additional Information
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <fieldset class="">
                    <div class="row description">
                      <ul>
                        <li>We are not concerned with nationality, but with your genetic ancestry. Please select the country of origin of your parents. If your parents come from different countries, please choose the rarer origin. This information will help us to find the right donor more quickly.</li>
                      </ul>
                    </div>
                    <div class="row">
                      <ul>
                        <li class="fieldwrapper ancestry required   ">
                          <label for="ancestry">Ancestry
                          </label>
                          <select className="form-control" name="ancestry" id="ancestry" required="required" value={this.state.ancestry} onChange={this.handleUserInput}>
                            <option value="" selected="selected">Please select</option>
                            {
                              this.state.ancestry_choices.map(function(ancestry_choice) {
                                return <option key={ancestry_choice[0]} value={ancestry_choice[0]}>{ancestry_choice[1]}</option>;
                              })
                            }
                          </select>
                          <div className="invalid-feedback"/>
                        </li>
                      </ul>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <div class="divider"></div>
        </li>
        <li class="no block-declarationofconsent">
          <section class="inputgroup declarationofconsent">
            <div class="heading row small-collapse">
              <div class="small-12 columns">
                <div class="row">
                  <div class="title small-12 columns">
                    Declaration of Consent
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="small-12 columns">
                  <fieldset class="">
                    <div class="row description">
                      <ul>
                        <li>Your data is only used in the search for a matching stem cell donor, and in order to make contact with you. All our data is saved on protected servers.</li>
                      </ul>
                    </div>
                    <div class="row">
                      <ul>
                        <li class="fieldwrapper dataprotectionprivacy required   ">
                          <label for="dataprotectionprivacy">I hereby consent to the processing of my personal data in order to send a registration kit with a pre-filled consent form and related queries. I confirm I have read the notes on
                            <a href="https://www.dkms.de/en/privacy-policy" target="_blank">data protection</a>.
                          </label>
                          <input className="form-control" name="dataprotectionprivacy" id="dataprotectionprivacy" required="required" type="checkbox" checked={this.state.dataprotectionprivacy} onChange={this.handleUserInput}/>
                          <div className="invalid-feedback"/>
                        </li>
                      </ul>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <div class="divider"></div>
        </li>
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
