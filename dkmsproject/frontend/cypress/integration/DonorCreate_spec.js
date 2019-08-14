function assertEquals_personal_information(actual, expected) {
  expect(actual).to.have.property('personal_information')
  cy.wrap(actual).its('personal_information.salutation').should('eq', expected.salutation)
  cy.wrap(actual).its('personal_information.title').should('eq', expected.title)
  cy.wrap(actual).its('personal_information.first_name').should('eq', expected.first_name)
  cy.wrap(actual).its('personal_information.last_name').should('eq', expected.last_name)
}

function assertEquals_private_address(actual, expected) {
  expect(actual).to.have.property('private_address')
  cy.wrap(actual).its('private_address.address').should('eq', expected.address)
  cy.wrap(actual).its('private_address.street').should('eq', expected.street)
  cy.wrap(actual).its('private_address.city').should('eq', expected.city)
  cy.wrap(actual).its('private_address.zipcode').should('eq', expected.zipcode)
  cy.wrap(actual).its('private_address.houseno').should('eq', expected.houseno)
  cy.wrap(actual).its('private_address.co').should('eq', expected.co)
  cy.wrap(actual).its('private_address.apartment').should('eq', expected.apartment)
}

function assertEquals_contact_details(actual, expected) {
  expect(actual).to.have.property('contact_details')
  cy.wrap(actual).its('contact_details.email').should('eq', expected.email)
  cy.wrap(actual).its('contact_details.mobile').should('eq', expected.mobile)
  cy.wrap(actual).its('contact_details.phone').should('eq', expected.phone)
}

describe("DonorCreate web form", () => {
  beforeEach(() => {
    cy.exec("npm run flush");
  });

  function createSomeDonor() {
    return {
      salutation: 'Mrs',
      title: 'DR_MED_DENT',
      first_name: 'some first_name',
      last_name: 'some last_name',
      email: 'email@web.de',
      mobile: "07471/3807",
      phone: '12345',
      address: 'some address',
      street: 'some street',
      city: 'some city',
      houseno: '4711',
      zipcode: '0815',
      co: 'some co',
      apartment: 'some apartment',
      description: 'some description',
      ancestry: 'DE',
      dataprotectionprivacy: true
    };
  }

  var tests = [
      {
        donor: (() => {
          let donor = createSomeDonor();
          donor.dataprotectionprivacy = true;
          return donor;})(),
        desc: 'dataprotectionprivacy = true'
      },
      {
        donor: (() => {
          let donor = createSomeDonor();
          donor.dataprotectionprivacy = false;
          return donor;})(),
        desc: 'dataprotectionprivacy = false'
      },
      {
        donor: (() => {
          let donor = createSomeDonor();
          donor.salutation = 'Mrs';
          return donor;})(),
        desc: "salutation = Mrs"
      },
      {
        donor: (() => {
          let donor = createSomeDonor();
          donor.salutation = 'Mr';
          return donor;})(),
        desc: "salutation = Mr"
      },
    ];

  tests.forEach(function(test) {
    it("should create a donor having " + test.desc + " using a web form", () => {
      // Given a web form
      cy.visit("/");

      // And a donor
      const donor = test.donor

      // cy.pause()
      // When entering a donor into the web form
      cy
        .get('[name="salutation"]')
        .check(donor.salutation)
        .should('be.checked');

      cy
        .get('[name="title"]')
        .should('contain', 'Dr.')
        .should('contain', 'Prof. Dr.')
        .select(donor.title)
        .should('have.value', donor.title)

      cy
        .get('[name="ancestry"]')
        .should('contain', 'Germany')
        .should('contain', 'Zimbabwe')
        .select(donor.ancestry)
        .should('have.value', donor.ancestry)

      cy
        .get('input[name="first_name"]')
        .type(donor.first_name)
        .should("have.value", donor.first_name);

      cy
        .get('input[name="last_name"]')
        .type(donor.last_name)
        .should("have.value", donor.last_name);

      cy
        .get('input[name="email"]')
        .type(donor.email)
        .should("have.value", donor.email);

      cy
        .get('input[name="mobile"]')
        .type(donor.mobile)
        .should("have.value", donor.mobile);

      cy
        .get('input[name="phone"]')
        .type(donor.phone)
        .should("have.value", donor.phone);

      cy
        .get('input[name="address"]')
        .type(donor.address)
        .should("have.value", donor.address);

      cy
        .get('input[name="street"]')
        .type(donor.street)
        .should("have.value", donor.street);

      cy
        .get('input[name="city"]')
        .type(donor.city)
        .should("have.value", donor.city);

      cy
        .get('input[name="houseno"]')
        .type(donor.houseno)
        .should("have.value", donor.houseno);

      cy
        .get('input[name="zipcode"]')
        .type(donor.zipcode)
        .should("have.value", donor.zipcode);

      cy
        .get('input[name="co"]')
        .type(donor.co)
        .should("have.value", donor.co);

      cy
        .get('input[name="apartment"]')
        .type(donor.apartment)
        .should("have.value", donor.apartment);

      cy
        .get('textarea[name="description"]')
        .type(donor.description)
        .should("have.value", donor.description);

      let checkbox = cy.get('input[name="dataprotectionprivacy"]')
      if(donor.dataprotectionprivacy) {
          checkbox
            .check()
            .should('be.checked')
      } else {
        checkbox
          .uncheck()
          .should('not.be.checked')
      }

      // And submitting the web form
      cy.get("form").submit();

      // Then the entered donor has been saved to the database
      cy
        .request("http://127.0.0.1:8000/api/backend/")
        .then((response) => {
          // see https://www.chaijs.com/api/bdd/#method_lengthof
          expect(response.body.data).to.lengthOf(1);
          const donor_actual = response.body.data[0];

          assertEquals_personal_information(donor_actual, donor)
          assertEquals_private_address(donor_actual, donor)
          assertEquals_contact_details(donor_actual, donor)
          expect(donor_actual).to.have.property('description', donor.description)
          expect(donor_actual).to.have.property('ancestry', donor.ancestry)
          expect(donor_actual).to.have.property('dataprotectionprivacy', donor.dataprotectionprivacy)
         });
    });
  });

  it("should not accept an invalid email", () => {
    cy.visit("/");

    cy
      .get('input[name="email"]')
      .type("invalid email");

    cy.get("form").submit();

    cy
     .get('input[name="email"]')
     .parent()
     .get('.invalid-feedback')
     .should('contain.text', 'Die E-Mail-Adresse muss ein @-Zeichen enthalten. In der Angabe "invalidemail" fehlt ein @-Zeichen.');

    cy
      .request("http://127.0.0.1:8000/api/backend/")
      .then((response) => {
        expect(response.body.data).to.lengthOf(0);
       });
  });
});
