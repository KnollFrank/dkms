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

  it('Button click calls createCustomer', () => {
    const first_name_input = customerCreate.find('input[name="first_name"]').first();
    first_name_input.simulate('change', { target: { value: 'some first_name' } });

    const last_name_input = customerCreate.find('input[name="last_name"]').first();
    last_name_input.simulate('change', { target: { value: 'some last_name' } });

    const email_input = customerCreate.find('input[name="email"]').first();
    email_input.simulate('change', { target: { value: 'some email' } });

    const phone_input = customerCreate.find('input[name="phone"]').first();
    phone_input.simulate('change', { target: { value: '12345' } });

    const address_input = customerCreate.find('input[name="address"]').first();
    address_input.simulate('change', { target: { value: 'some address' } });

    const description_input = customerCreate.find('textarea[name="description"]').first();
    description_input.simulate('change', { target: { value: 'some description' } });

    const button = customerCreate.find('button').first();
    button.simulate('click');

    expect(createCustomer).toBeCalledWith(
      {
        first_name: 'some first_name',
        last_name: 'some last_name',
        email: 'some email',
        phone: '12345',
        address: 'some address',
        description: 'some description'
      });
  });
});
