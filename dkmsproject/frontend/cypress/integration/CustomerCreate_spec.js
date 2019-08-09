describe("Django REST framework / React quickstart app", () => {
  const customer = {
    first_name: 'some first_name',
    last_name: 'some last_name',
    email: 'email@web.de',
    phone: '12345',
    address: 'some address',
    description: 'some description'
  };

  before(() => {
    // cy.exec("npm run flush");
  });

  it("should be able to fill a web form", () => {
    cy.visit("/");

    // cy.pause()

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

    cy.get("form").submit();

    cy
      .request("http://127.0.0.1:8000/api/backend/28")
      .then((response) => {
        expect(response.body).to.have.property('first_name', customer.first_name)
        expect(response.body).to.have.property('last_name', customer.last_name)
        expect(response.body).to.have.property('email', customer.email)
        expect(response.body).to.have.property('phone', customer.phone)
        expect(response.body).to.have.property('address', customer.address)
        expect(response.body).to.have.property('description', customer.description)
       });
  });
  // more tests here
});
