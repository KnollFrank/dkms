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
                                <input type="radio" name="salutation" value="1" data-parsley-required-message="Choose a salutation." required="" id="id_salutation_0"/>
                                Mr.</label>
                            </li>
                            <li>
                              <label for="id_salutation_1">
                                <input type="radio" name="salutation" value="2" data-parsley-required-message="Choose a salutation." required="" id="id_salutation_1"/>
                                Mrs.</label>
                            </li>
                          </ul>
                        </li>
                        <li class="fieldwrapper title   ">
                          <label for="id_title">Title
                          </label>
                          <select name="title" id="id_title">
                            <option value="" selected="">Title</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Dr. med.">Dr. med.</option>
                            <option value="Dr. med. dent.">Dr. med. dent.</option>
                            <option value="Dr. pharm.">Dr. pharm.</option>
                            <option value="Dr. rer. hum.">Dr. rer. hum.</option>
                            <option value="Prof.">Prof.</option>
                            <option value="Prof. Dr.">Prof. Dr.</option>
                          </select>
                        </li>
                        <li class="fieldwrapper firstname required   ">
                          <label for="id_firstname">First name
                          </label>
                          <input type="text" name="firstname" class="ucfirst" data-parsley-pattern="[^\d]+" data-parsley-pattern-message="Please enter only alphabetic characters" maxlength="40" required="" id="id_firstname"/></li>
                        <li class="fieldwrapper lastname required   ">
                          <label for="id_lastname">Last name
                          </label>
                          <input type="text" name="lastname" class="ucfirst" data-parsley-pattern="[^\d]+" data-parsley-pattern-message="Please enter only alphabetic characters" maxlength="100" required="" id="id_lastname"/></li>
                        <li>
                          <input type="hidden" name="height_cm" value="183" id="id_height_cm"/></li>
                        <li>
                          <input type="hidden" name="weight_kg" value="90" id="id_weight_kg"/></li>
                        <li>
                          <input type="hidden" name="birthdate" value="1972-10-17" id="id_birthdate"/></li>
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
                          <input type="text" name="address" placeholder="Search here for your address" maxlength="250" id="id_address" autocomplete="off"/></li>
                        <li class="fieldwrapper address_error_field   ">
                          <label for="id_address_error_field">We were unable to find the given address. Please click
                            <span class="underline">here</span>
                            or press enter to enter the address fields manually.
                          </label>
                          <input type="text" name="address_error_field" disabled="disabled" id="id_address_error_field"/></li>
                        <li class="fieldwrapper street required hidden">
                          <label for="id_street">Street
                          </label>
                          <input type="text" name="street" class="ucfirst" maxlength="50" required="" id="id_street"/></li>
                        <li class="fieldwrapper houseno required hidden">
                          <label for="id_houseno">House number
                          </label>
                          <input type="text" name="houseno" data-parsley-not-equalto="#id_street" data-parsley-not-equalto-message="Please enter your housenumber" maxlength="10" required="" id="id_houseno"/></li>
                        <li class="fieldwrapper apartment hidden">
                          <label for="id_apartment">Apartment (optional)
                          </label>
                          <input type="text" name="apartment" class="ucfirst" maxlength="50" id="id_apartment"/></li>
                        <li class="fieldwrapper co_field hidden">
                          <label for="id_co_field" class="input-hidden">Show c/o input field</label>
                          <input type="text" name="co_field" class="ucfirst" data-show-label="Show c/o input field" maxlength="100" id="id_co_field" style={{
                              display: 'none'
                            }}/></li>
                        <li class="fieldwrapper zipcode required hidden">
                          <label for="id_zipcode">ZIP
                          </label>
                          <input type="text" name="zipcode" data-parsley-pattern="\d{5}" maxlength="10" required="" id="id_zipcode"/></li>
                        <li class="fieldwrapper city required hidden">
                          <label for="id_city">City
                          </label>
                          <input type="text" name="city" class="ucfirst" maxlength="50" required="" id="id_city"/></li>
                        <li>
                          <input type="hidden" name="country" id="id_country"/></li>
                        <li>
                          <input type="hidden" name="country_code" id="id_country_code"/></li>
                        <li>
                          <input type="hidden" name="geolat" id="id_geolat"/></li>
                        <li>
                          <input type="hidden" name="geolng" id="id_geolng"/></li>
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
                          <label for="id_phone">Telephone number (private)
                          </label>
                          <input type="text" name="phone" pattern="[\d\+\s]*" data-inputmode="numeric" maxlength="20" minlength="7" id="id_phone" inputmode="numeric"/></li>
                        <li class="fieldwrapper mobile   ">
                          <label for="id_mobile">Cell phone number
                          </label>
                          <input type="text" name="mobile" pattern="[\d\+\s]*" data-inputmode="numeric" maxlength="20" minlength="7" id="id_mobile" inputmode="numeric"/></li>
                        <li class="fieldwrapper email required   ">
                          <label for="id_email" class="hasInfoMessage">Email address (private if possible)
                            <div class="infoMessage" style={{
                                height: '85px',
                                top: '-90px'
                              }}>Your e-mail address is important, e.g. to clarify queries.</div>
                          </label>
                          <input type="email" name="email" data-parsley-email-message="No valid e-mail address" data-parsley-pattern-message="No valid e-mail address" data-info-layer="Your e-mail address is important, e.g. to clarify queries." maxlength="50" required="" id="id_email"/></li>
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
                          <label for="id_ancestry">Ancestry
                          </label>
                          <select name="ancestry" required="" id="id_ancestry">
                            <option value="" selected="">Please select</option>
                            <option value="**">No selection</option>
                            <option value="DE">Germany</option>
                            <option value="TR">Turkey</option>
                            <option value="PL">Poland</option>
                            <option value="RU">Russia</option>
                            <option value="AF">Afghanistan</option>
                            <option value="AX">Åland Islands</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AS">American Samoa</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="AR">Argentina</option>
                            <option value="AM">Armenia</option>
                            <option value="AW">Aruba</option>
                            <option value="SH">Ascensión y Tristán de Acuña</option>
                            <option value="AU">Australia</option>
                            <option value="AT">Austria</option>
                            <option value="AZ">Azerbaijan</option>
                            <option value="BS">Bahamas</option>
                            <option value="BH">Bahrain</option>
                            <option value="BD">Bangladesh</option>
                            <option value="BB">Barbados</option>
                            <option value="BY">Belarus</option>
                            <option value="BE">Belgium</option>
                            <option value="BZ">Belize</option>
                            <option value="BJ">Benin</option>
                            <option value="BM">Bermuda Islands</option>
                            <option value="BT">Bhutan</option>
                            <option value="BO">Bolivia</option>
                            <option value="BA">Bosnia and Herzegovina</option>
                            <option value="BW">Botswana</option>
                            <option value="BV">Bouvet Island</option>
                            <option value="BR">Brazil</option>
                            <option value="IO">British Indian Ocean Territory</option>
                            <option value="BN">Brunei</option>
                            <option value="BG">Bulgaria</option>
                            <option value="BF">Burkina Faso</option>
                            <option value="BI">Burundi</option>
                            <option value="KH">Cambodia</option>
                            <option value="CM">Cameroon</option>
                            <option value="CA">Canada</option>
                            <option value="CV">Cape Verde</option>
                            <option value="KY">Cayman Islands</option>
                            <option value="CF">Central African Republic</option>
                            <option value="TD">Chad</option>
                            <option value="CL">Chile</option>
                            <option value="CN">China</option>
                            <option value="CX">Christmas Island</option>
                            <option value="CC">Cocos (Keeling) Islands</option>
                            <option value="CO">Colombia</option>
                            <option value="KM">Comoros</option>
                            <option value="CK">Cook Islands</option>
                            <option value="CR">Costa Rica</option>
                            <option value="HR">Croatia</option>
                            <option value="CU">Cuba</option>
                            <option value="CY">Cyprus</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="CD">Democratic Republic of the Congo</option>
                            <option value="DK">Denmark</option>
                            <option value="DJ">Djibouti</option>
                            <option value="DM">Dominica</option>
                            <option value="DO">Dominican Republic</option>
                            <option value="TL">East Timor</option>
                            <option value="EC">Ecuador</option>
                            <option value="EG">Egypt</option>
                            <option value="SV">El Salvador</option>
                            <option value="GQ">Equatorial Guinea</option>
                            <option value="ER">Eritrea</option>
                            <option value="FM">Estados Federados de</option>
                            <option value="EE">Estonia</option>
                            <option value="ET">Ethiopia</option>
                            <option value="FK">Falkland Islands (Malvinas)</option>
                            <option value="FO">Faroe Islands</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="GF">French Guiana</option>
                            <option value="PF">French Polynesia</option>
                            <option value="TF">French Southern Territories</option>
                            <option value="GA">Gabon</option>
                            <option value="GM">Gambia</option>
                            <option value="GE">Georgia</option>
                            <option value="GH">Ghana</option>
                            <option value="GI">Gibraltar</option>
                            <option value="GR">Greece</option>
                            <option value="GL">Greenland</option>
                            <option value="GD">Grenada</option>
                            <option value="GP">Guadeloupe</option>
                            <option value="GU">Guam</option>
                            <option value="GT">Guatemala</option>
                            <option value="GG">Guernsey</option>
                            <option value="GN">Guinea</option>
                            <option value="GW">Guinea-Bissau</option>
                            <option value="GY">Guyana</option>
                            <option value="HT">Haiti</option>
                            <option value="HM">Heard Island and McDonald Islands</option>
                            <option value="HN">Honduras</option>
                            <option value="HK">Hong Kong</option>
                            <option value="HU">Hungary</option>
                            <option value="IS">Iceland</option>
                            <option value="IN">India</option>
                            <option value="ID">Indonesia</option>
                            <option value="IR">Iran</option>
                            <option value="IQ">Iraq</option>
                            <option value="IE">Ireland</option>
                            <option value="IM">Isle of Man</option>
                            <option value="IL">Israel</option>
                            <option value="IT">Italy</option>
                            <option value="CI">Ivory Coast</option>
                            <option value="JM">Jamaica</option>
                            <option value="JP">Japan</option>
                            <option value="JE">Jersey</option>
                            <option value="JO">Jordan</option>
                            <option value="KZ">Kazakhstan</option>
                            <option value="KE">Kenya</option>
                            <option value="KI">Kiribati</option>
                            <option value="XK">Kosovo</option>
                            <option value="KW">Kuwait</option>
                            <option value="KG">Kyrgyzstan</option>
                            <option value="LA">Laos</option>
                            <option value="LV">Latvia</option>
                            <option value="LB">Lebanon</option>
                            <option value="LS">Lesotho</option>
                            <option value="LR">Liberia</option>
                            <option value="LY">Libya</option>
                            <option value="LI">Liechtenstein</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="MO">Macao</option>
                            <option value="MK">Macedonia</option>
                            <option value="MG">Madagascar</option>
                            <option value="MW">Malawi</option>
                            <option value="MY">Malaysia</option>
                            <option value="MV">Maldives</option>
                            <option value="ML">Mali</option>
                            <option value="MT">Malta</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="MQ">Martinique</option>
                            <option value="MR">Mauritania</option>
                            <option value="MU">Mauritius</option>
                            <option value="YT">Mayotte</option>
                            <option value="MX">Mexico</option>
                            <option value="MD">Moldova</option>
                            <option value="MC">Monaco</option>
                            <option value="MN">Mongolia</option>
                            <option value="ME">Montenegro</option>
                            <option value="MS">Montserrat</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                            <option value="MM">Myanmar</option>
                            <option value="NA">Namibia</option>
                            <option value="NR">Nauru</option>
                            <option value="NP">Nepal</option>
                            <option value="NL">Netherlands</option>
                            <option value="AN">Netherlands Antilles</option>
                            <option value="NC">New Caledonia</option>
                            <option value="NZ">New Zealand</option>
                            <option value="NI">Nicaragua</option>
                            <option value="NE">Niger</option>
                            <option value="NG">Nigeria</option>
                            <option value="NU">Niue</option>
                            <option value="NF">Norfolk Island</option>
                            <option value="KP">North Korea</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="NO">Norway</option>
                            <option value="OM">Oman</option>
                            <option value="PK">Pakistan</option>
                            <option value="PW">Palau</option>
                            <option value="PS">Palestine</option>
                            <option value="PA">Panama</option>
                            <option value="PG">Papua New Guinea</option>
                            <option value="PY">Paraguay</option>
                            <option value="PE">Peru</option>
                            <option value="PH">Philippines</option>
                            <option value="PN">Pitcairn Islands</option>
                            <option value="PT">Portugal</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="QA">Qatar</option>
                            <option value="CG">Republic of the Congo</option>
                            <option value="RE">Réunion</option>
                            <option value="RO">Romania</option>
                            <option value="RW">Rwanda</option>
                            <option value="BL">Saint Barthélemy</option>
                            <option value="KN">Saint Kitts and Nevis</option>
                            <option value="LC">Saint Lucia</option>
                            <option value="MF">Saint Martin (French part)</option>
                            <option value="PM">Saint Pierre and Miquelon</option>
                            <option value="VC">Saint Vincent and the Grenadines</option>
                            <option value="WS">Samoa</option>
                            <option value="SM">San Marino</option>
                            <option value="ST">Sao Tome and Principe</option>
                            <option value="SA">Saudi Arabia</option>
                            <option value="SN">Senegal</option>
                            <option value="RS">Serbia</option>
                            <option value="SC">Seychelles</option>
                            <option value="SL">Sierra Leone</option>
                            <option value="SG">Singapore</option>
                            <option value="SK">Slovakia</option>
                            <option value="SI">Slovenia</option>
                            <option value="SB">Solomon Islands</option>
                            <option value="SO">Somalia</option>
                            <option value="ZA">South Africa</option>
                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                            <option value="KR">South Korea</option>
                            <option value="ES">Spain</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="SD">Sudan</option>
                            <option value="SR">Suriname</option>
                            <option value="SJ">Svalbard and Jan Mayen</option>
                            <option value="SZ">Swaziland</option>
                            <option value="SE">Sweden</option>
                            <option value="CH">Switzerland</option>
                            <option value="SY">Syria</option>
                            <option value="TW">Taiwan</option>
                            <option value="TJ">Tajikistan</option>
                            <option value="TZ">Tanzania</option>
                            <option value="TH">Thailand</option>
                            <option value="TG">Togo</option>
                            <option value="TK">Tokelau</option>
                            <option value="TO">Tonga</option>
                            <option value="TT">Trinidad and Tobago</option>
                            <option value="TN">Tunisia</option>
                            <option value="TM">Turkmenistan</option>
                            <option value="TC">Turks and Caicos Islands</option>
                            <option value="TV">Tuvalu</option>
                            <option value="UG">Uganda</option>
                            <option value="UA">Ukraine</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="GB">United Kingdom</option>
                            <option value="UM">United States Minor Outlying Islands</option>
                            <option value="US">United States of America</option>
                            <option value="VI">United States Virgin Islands</option>
                            <option value="UY">Uruguay</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="VU">Vanuatu</option>
                            <option value="VA">Vatican City State</option>
                            <option value="VE">Venezuela</option>
                            <option value="VN">Vietnam</option>
                            <option value="VG">Virgin Islands</option>
                            <option value="WF">Wallis and Futuna</option>
                            <option value="EH">Western Sahara</option>
                            <option value="YE">Yemen</option>
                            <option value="ZM">Zambia</option>
                            <option value="ZW">Zimbabwe</option>
                          </select>
                        </li>
                        <li>
                          <input type="hidden" name="source" value="SOC001"/></li>
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
                          <label for="id_dataprotectionprivacy">I hereby consent to the processing of my personal data in order to send a registration kit with a pre-filled consent form and related queries. I confirm I have read the notes on
                            <a href="https://www.dkms.de/en/privacy-policy" target="_blank">data protection</a>.
                          </label>
                          <input type="checkbox" name="dataprotectionprivacy" required="" id="id_dataprotectionprivacy"/></li>
                        <li>
                          <input type="hidden" name="camp_id" id="id_camp_id"/></li>
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
