describe("DonorCreate web form", () => {
  beforeEach(() => {
    cy.exec("npm run flush");
  });

  it("should create a donor using a web form", () => {
    // Given a web form
    cy.visit("/");

    // And a donor
    const donor = {
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
      description: 'some description',
      ancestry: 'DE',
      // TODO: additionally test "dataprotectionprivacy: false"
      dataprotectionprivacy: true
    };

    // cy.pause()
    // When entering a donor into the web form
    cy
      .get('[type="radio"]')
      .check(donor.salutation)
      .should('be.checked');

    cy
      .get('[name="title"]')
      .select(donor.title)
      .should('have.value', donor.title)

    cy
      .get('[name="ancestry"]')
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
      .get('textarea[name="description"]')
      .type(donor.description)
      .should("have.value", donor.description);

    let checkbox = cy.get('[type="checkbox"]')
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
        expect(donor_actual).to.have.property('salutation', donor.salutation)
        expect(donor_actual).to.have.property('title', donor.title)
        expect(donor_actual).to.have.property('first_name', donor.first_name)
        expect(donor_actual).to.have.property('last_name', donor.last_name)
        expect(donor_actual).to.have.property('email', donor.email)
        expect(donor_actual).to.have.property('phone', donor.phone)
        expect(donor_actual).to.have.property('mobile', donor.mobile)
        expect(donor_actual).to.have.property('address', donor.address)
        expect(donor_actual).to.have.property('street', donor.street)
        expect(donor_actual).to.have.property('city', donor.city)
        expect(donor_actual).to.have.property('description', donor.description)
        expect(donor_actual).to.have.property('ancestry', donor.ancestry)
        expect(donor_actual).to.have.property('dataprotectionprivacy', donor.dataprotectionprivacy)
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
