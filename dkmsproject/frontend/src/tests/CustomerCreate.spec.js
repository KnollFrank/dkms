// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import CustomerCreate from '../CustomerCreate.js';

window.alert = jest.fn();

describe('CustomerCreate', () => {
  window.alert.mockClear();
  let customerCreate;
  let createCustomer;

  beforeEach(() => {
    createCustomer = jest.fn();
    customerCreate = mount(<CustomerCreate createCustomer={createCustomer} />);
  });

  it('CustomerCreate requires createCustomer prop', () => {
    expect(customerCreate.props().createCustomer).toBeDefined();
  });

  it('CustomerCreate renders button', () => {
    const button = customerCreate.find('button').first();
    expect(button).toBeDefined();
  });

  it.skip('Button click calls createCustomer', () => {
    function enter(selector, text) {
      const input = customerCreate.find(selector).first();
      input.simulate('change', { target: { value: text } });
    }

    // Given
    let customer = {
      first_name: 'some first_name',
      last_name: 'some last_name',
      email: 'some email',
      phone: '12345',
      address: 'some address',
      description: 'some description'
    };

    // When entering a customer
    enter('input[name="first_name"]', customer.first_name);
    enter('input[name="last_name"]', customer.last_name);
    enter('input[name="email"]', customer.email);
    enter('input[name="phone"]', customer.phone);
    enter('input[name="address"]', customer.address);
    enter('textarea[name="description"]', customer.description);

    // And clicking the send button
    const button = customerCreate.find('[type="submit"]').first();
    button.simulate('click');

    // Then
    expect(createCustomer).toBeCalledWith(customer);
  });
});
