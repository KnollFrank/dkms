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
        <Form submit={this.submit}>
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
                              <label for="id_salutation_0">Salutation </label>
                              <ul id="id_salutation">
                                <li>
                                  <label for="id_salutation_0">
                                    <input type="radio"
                                           name="salutation"
                                           value="Mr"
                                           checked={this.state.salutation === "Mr"}
                                           onChange={this.handleUserInput}
                                           data-parsley-required-message="Choose a salutation."
                                           required=""
                                           id="id_salutation_0"/>
                                    Mr.
                                  </label>
                                </li>
                                <li>
                                  <label for="id_salutation_1">
                                    <input type="radio"
                                           name="salutation"
                                           value="Mrs"
                                           checked={this.state.salutation === "Mrs"}
                                           onChange={this.handleUserInput}
                                           data-parsley-required-message="Choose a salutation."
                                           required=""
                                           id="id_salutation_1"/>
                                    Mrs.
                                  </label>
                                </li>
                              </ul>
                            </li>
                            <li class="fieldwrapper title   ">
                              <label for="id_title">Title </label>
                              <select name="title"
                                      id="id_title"
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
                            </li>
                            <li class="fieldwrapper firstname required   ">
                              <label for="id_firstname">First name </label>
                              <input type="text"
                                     name="first_name"
                                     class="ucfirst"
                                     value={this.state.first_name}
                                     onChange={this.handleUserInput}
                                     data-parsley-pattern="[^\d]+"
                                     data-parsley-pattern-message="Please enter only alphabetic characters"
                                     maxlength="40"
                                     required=""
                                     id="id_firstname"/>
                            </li>
                            <li class="fieldwrapper lastname required   ">
                              <label for="id_lastname">Last name </label>
                              <input type="text"
                                     name="last_name"
                                     value={this.state.last_name}
                                     onChange={this.handleUserInput}
                                     class="ucfirst"
                                     data-parsley-pattern="[^\d]+"
                                     data-parsley-pattern-message="Please enter only alphabetic characters"
                                     maxlength="100"
                                     required=""
                                     id="id_lastname"/>
                            </li>
                            <li>
                              <input type="hidden" name="height_cm" value="183" id="id_height_cm"/>
                            </li>
                            <li>
                              <input type="hidden" name="weight_kg" value="90" id="id_weight_kg"/>
                            </li>
                            <li>
                              <input type="hidden" name="birthdate" value="1972-10-17" id="id_birthdate"/>
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
                              <label for="id_address">Address </label>
                              <input type="text"
                                     name="address"
                                     value={this.state.address}
                                     onChange={this.handleUserInput}
                                     placeholder="Search here for your address"
                                     maxlength="250"
                                     id="id_address"
                                     autocomplete="off"/>
                            </li>
                            <li class="fieldwrapper address_error_field   ">
                              <label for="id_address_error_field">We were unable to find the given address. Please click <span class="underline">here</span> or press enter to enter the address fields manually. </label>
                              <input type="text"
                                     name="address_error_field"
                                     disabled="disabled"
                                     id="id_address_error_field"/>
                            </li>
                            <li class="fieldwrapper street required">
                              <label for="id_street">Street </label>
                              <input type="text"
                                     name="street"
                                     value={this.state.street}
                                     onChange={this.handleUserInput}
                                     class="ucfirst"
                                     maxlength="50"
                                     required=""
                                     id="id_street"/>
                            </li>
                            <li class="fieldwrapper houseno required">
                              <label for="id_houseno">House number </label>
                              <input type="text"
                                     name="houseno"
                                     value={this.state.houseno}
                                     onChange={this.handleUserInput}
                                     data-parsley-not-equalto="#id_street"
                                     data-parsley-not-equalto-message="Please enter your housenumber"
                                     maxlength="10"
                                     required=""
                                     id="id_houseno"/>
                            </li>
                            <li class="fieldwrapper apartment">
                              <label for="id_apartment">Apartment (optional) </label>
                              <input type="text"
                                     name="apartment"
                                     value={this.state.apartment}
                                     onChange={this.handleUserInput}
                                     class="ucfirst"
                                     maxlength="50"
                                     id="id_apartment"/>
                            </li>
                            <li class="fieldwrapper co_field">
                              <label for="id_co_field" class="input-hidden">Show c/o input field</label>
                              <input type="text"
                                     name="co"
                                     value={this.state.co}
                                     onChange={this.handleUserInput}
                                     class="ucfirst"
                                     data-show-label="Show c/o input field"
                                     maxlength="100"
                                     id="id_co_field"/>
                            </li>
                            <li class="fieldwrapper zipcode required">
                              <label for="id_zipcode">ZIP </label>
                              <input type="text"
                                     name="zipcode"
                                     value={this.state.zipcode}
                                     onChange={this.handleUserInput}
                                     data-parsley-pattern="\d{5}"
                                     maxlength="10"
                                     required=""
                                     id="id_zipcode"/>
                            </li>
                            <li class="fieldwrapper city required">
                              <label for="id_city">City </label>
                              <input type="text"
                                     name="city"
                                     value={this.state.city}
                                     onChange={this.handleUserInput}
                                     class="ucfirst"
                                     maxlength="50"
                                     required=""
                                     id="id_city"/>
                            </li>
                            <li>
                              <input type="hidden" name="country" id="id_country"/>
                            </li>
                            <li>
                              <input type="hidden" name="country_code" id="id_country_code"/>
                            </li>
                            <li>
                              <input type="hidden" name="geolat" id="id_geolat"/>
                            </li>
                            <li>
                              <input type="hidden" name="geolng" id="id_geolng"/>
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
                              <label for="id_phone">Telephone number (private) </label>
                              <input type="text"
                                     name="phone"
                                     value={this.state.phone}
                                     onChange={this.handleUserInput}
                                     pattern="[\d\+\s]*"
                                     data-inputmode="numeric"
                                     maxlength="20"
                                     minlength="7"
                                     id="id_phone"
                                     inputmode="numeric"/>
                            </li>

                            <li class="fieldwrapper mobile   ">
                              <label for="id_mobile">Cell phone number </label>
                              <input type="text"
                                     name="mobile"
                                     value={this.state.mobile}
                                     onChange={this.handleUserInput}
                                     pattern="[\d\+\s]*"
                                     data-inputmode="numeric"
                                     maxlength="20"
                                     minlength="7"
                                     id="id_mobile"
                                     inputmode="numeric"/>
                            </li>

                            <li class="fieldwrapper email required   ">
                              <label for="id_email" class="hasInfoMessage">Email address (private if possible) <div class="infoMessage" style={{height: '85px', top: '-90px'}}>Your e-mail address is important, e.g. to clarify queries.</div></label>
                              <input type="email"
                                     name="email"
                                     value={this.state.email}
                                     onChange={this.handleUserInput}
                                     data-parsley-email-message="No valid e-mail address"
                                     data-parsley-pattern-message="No valid e-mail address"
                                     data-info-layer="Your e-mail address is important, e.g. to clarify queries."
                                     maxlength="50"
                                     required=""
                                     id="id_email"/>
                              <div className="invalid-feedback" />
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
                            <li>We are not concerned with nationality, but with your genetic ancestry. Please select the country of origin of your parents. If your parents come from different countries, please choose the rarer origin. This information
                              will help us to find the right donor more quickly.</li>
                          </ul>
                        </div>
                        <div class="row">
                          <ul>
                            <li class="fieldwrapper ancestry required   ">
                              <label htmlFor="id_ancestry">Ancestry </label>
                              <select name="ancestry"
                                      value={this.state.ancestry}
                                      onChange={this.handleUserInput}
                                      required=""
                                      id="id_ancestry">
                                      {
                                        this.state.ancestry_choices.map(
                                          function(ancestry_choice) {
                                            return <option key={ancestry_choice[0]} value={ancestry_choice[0]}>{ancestry_choice[1]}</option>;
                                          })
                                      }
                              </select>
                            </li>
                            <li>
                              <input type="hidden" name="source" value="SOC001"/>
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
                              <label for="id_dataprotectionprivacy">I hereby consent to the processing of my personal data in order to send a registration kit with a pre-filled consent form and related queries. I confirm I have read the notes on <a
                                  href="https://www.dkms.de/en/privacy-policy" target="_blank">data protection</a>. </label>
                              <input type="checkbox"
                                     name="dataprotectionprivacy"
                                     checked={this.state.dataprotectionprivacy}
                                     onChange={this.handleUserInput}
                                     required=""
                                     id="id_dataprotectionprivacy"/>
                            </li>
                            <li>
                              <input type="hidden" name="camp_id" id="id_camp_id"/>
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

            <li class="no block-newsletter">
              <section class="inputgroup newsletter">
                <div class="heading row small-collapse">
                  <div class="small-12 columns">
                    <div class="row">
                      <div class="title small-12 columns">
                        Subscription to the DKMS newsletter
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="small-12 columns">
                      <fieldset class="">
                        <div class="row">
                          <ul>
                            <li class="fieldwrapper newsletter   ">
                              <label for="id_newsletter">Yes, I would like to receive regular information about DKMS via email. </label>
                              <input type="checkbox"
                                     name="newsletter"
                                     id="id_newsletter"/>
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
            <input type="button" class="backBtn" value="Back"/>
            <input type="button" class="nextPageBtn" value="Next page"/>
            <input type="submit"
                   class="submitBtn"
                   data-disabled-label="Please wait"
                   value="Register"/>
          </div>
        </Form>
      );
    }
}
