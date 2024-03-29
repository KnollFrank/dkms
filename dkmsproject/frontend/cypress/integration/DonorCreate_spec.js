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

function assertEquals_additional_information(actual, expected) {
  expect(actual).to.have.property('additional_information')
  cy.wrap(actual).its('additional_information.ancestry').should('eq', expected.ancestry)
}

function assertEquals_declaration_of_consent(actual, expected) {
  expect(actual).to.have.property('declaration_of_consent')
  cy.wrap(actual).its('declaration_of_consent.dataprotectionprivacy').should('eq', expected.dataprotectionprivacy)
}

// see https://docs.cypress.io/api/events/catalog-of-events.html#Uncaught-Exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

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
      mobile: "074713807",
      phone: '1234567',
      address: 'some address',
      street: 'some street',
      city: 'some city',
      houseno: '4711',
      zipcode: '72805',
      co: 'some co',
      apartment: 'some apartment',
      ancestry: 'DE',
      dataprotectionprivacy: true
    };
  }

  const tests = [
      {
        donor_factory: () => {
          let donor = createSomeDonor();
          donor.dataprotectionprivacy = true;
          return donor;
        },
        desc: 'dataprotectionprivacy = true'
      },
      {
        donor_factory: () => {
          let donor = createSomeDonor();
          donor.salutation = 'Mrs';
          return donor;
        },
        desc: "salutation = Mrs"
      },
      {
        donor_factory: () => {
          let donor = createSomeDonor();
          donor.salutation = 'Mr';
          return donor;
        },
        desc: "salutation = Mr"
      },
    ];

  tests.forEach(function(test) {
    it("should create a donor having " + test.desc + " using a web form", () => {
      // Given a web form
      cy.visit("/");

      // And a donor
      const donor = test.donor_factory()

      // cy.pause()
      // When entering a donor into the web form
      cy.get('[id="root"]').within(() => {
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
        cy.get('form').submit();
      });

      // Then the entered donor has been saved to the database
      cy
        .request('GET', "http://127.0.0.1:8000/api/backend/")
        .then((response) => {
          // see https://www.chaijs.com/api/bdd/#method_lengthof
          expect(response.body).to.have.lengthOf(1);
          const donor_actual = response.body[0];

          assertEquals_personal_information(donor_actual, donor)
          assertEquals_private_address(donor_actual, donor)
          assertEquals_contact_details(donor_actual, donor)
          assertEquals_additional_information(donor_actual, donor)
          assertEquals_declaration_of_consent(donor_actual, donor)
         });
    });
  });

  function assertErrorMessage(field_name, error_message) {
    cy
      .get('[name="' + field_name + '"]')
      .parent()
      .find('.invalid-feedback')
      .should('contain.text', error_message)
      .should('be.visible');
  }

  function create_invalid_field_test(field_name, invalid_content, error_message) {
    it("should not accept an invalid " + field_name, () => {
      cy.visit("/");

      cy.get('[id="root"]').within(() => {
        cy
          .get('input[name="' + field_name + '"]')
          .type(invalid_content);

        cy.get('form').submit();

        assertErrorMessage(field_name, error_message);
       });

      cy
        .request("http://127.0.0.1:8000/api/backend/")
        .then((response) => {
          expect(response.body).to.have.lengthOf(0);
         });
    });
  }

  create_invalid_field_test(
    "email",
    "invalid email",
    'Die E-Mail-Adresse muss ein @-Zeichen enthalten.');

  create_invalid_field_test(
    "phone",
    '1234567890L',
    'Ihre Eingabe muss mit dem geforderten Format übereinstimmen.');

/*
  create_invalid_field_test(
    "phone",
    '123456',
    'Verlängern Sie diesen Text auf mindestens 7 Zeichen. Derzeit verwenden Sie 6 Zeichen.');
*/

  create_invalid_field_test(
    "zipcode",
    '7280',
    'Ihre Eingabe muss mit dem geforderten Format übereinstimmen.');

  [
    {
      field_name: "salutation",
      error_text: 'Wählen Sie eine dieser Optionen aus.Wählen Sie eine dieser Optionen aus.'
    },
    {
      field_name: "dataprotectionprivacy",
      error_text: 'Klicken Sie dieses Kästchen an, wenn Sie fortfahren möchten.'
    },
    {
      field_name: "ancestry",
      error_text: 'Wählen Sie ein Element in der Liste aus.'
    },
    {
      field_name: "first_name",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "last_name",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "street",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "houseno",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "zipcode",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "city",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
    {
      field_name: "email",
      error_text: 'Füllen Sie dieses Feld aus.'
    },
  ].forEach(test => {
    it("should not accept an empty required " + test.field_name, () => {
      cy.visit("/");
      cy.get('[id="root"]').within(() => {
        cy.get('form').submit();
        assertErrorMessage(test.field_name, test.error_text);
       });
     });
  });
});
