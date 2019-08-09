describe("CustomerCreate web form", () => {
  beforeEach(() => {
    cy.exec("npm run flush");
  });

  it("should create a customer using a web form", () => {
    // Given a web form
    cy.visit("/");

    // And a customer
    const customer = {
      first_name: 'some first_name',
      last_name: 'some last_name',
      email: 'email@web.de',
      phone: '12345',
      address: 'some address',
      description: 'some description'
    };

    // cy.pause()
    // When entering a customer into the web form
    cy
      .get('input[name="first_name"]')
      .type(customer.first_name)
      .should("have.value", customer.first_name);

    cy
      .get('input[name="last_name"]')
      .type(customer.last_name)
      .should("have.value", customer.last_name);

    cy
      .get('input[name="email"]')
      .type(customer.email)
      .should("have.value", customer.email);

    cy
      .get('input[name="phone"]')
      .type(customer.phone)
      .should("have.value", customer.phone);

    cy
      .get('input[name="address"]')
      .type(customer.address)
      .should("have.value", customer.address);

    cy
      .get('textarea[name="description"]')
      .type(customer.description)
      .should("have.value", customer.description);

    // And submitting the web form
    cy.get("form").submit();

    // Then the entered customer has been saved to the database
    cy
      .request("http://127.0.0.1:8000/api/backend/")
      .then((response) => {
        // see https://www.chaijs.com/api/bdd/#method_lengthof
        expect(response.body.data).to.lengthOf(1);
        const customer_actual = response.body.data[0];
        expect(customer_actual).to.have.property('first_name', customer.first_name)
        expect(customer_actual).to.have.property('last_name', customer.last_name)
        expect(customer_actual).to.have.property('email', customer.email)
        expect(customer_actual).to.have.property('phone', customer.phone)
        expect(customer_actual).to.have.property('address', customer.address)
        expect(customer_actual).to.have.property('description', customer.description)
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
