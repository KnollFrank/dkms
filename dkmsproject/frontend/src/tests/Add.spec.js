import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Add from '../Add.jsx';

window.alert = jest.fn();

describe('Add', () => {
  window.alert.mockClear();
  let add;
  let createCustomer;

  beforeEach(() => {
    createCustomer = jest.fn();
    add = mount(<Add createCustomer={createCustomer} />);
  });

  it('Add requires createCustomer prop', () => {
    expect(add.props().createCustomer).toBeDefined();
  });

  it('Add renders button', () => {
    const button = add.find('button').first();
    expect(button).toBeDefined();
  });

  it('Button click calls onAdd', () => {
    const first_name_input = add.find('input[name="first_name"]').first();
    first_name_input.simulate('change', { target: { value: 'some first_name' } });

    const last_name_input = add.find('input[name="last_name"]').first();
    last_name_input.simulate('change', { target: { value: 'some last_name' } });

    const email_input = add.find('input[name="email"]').first();
    email_input.simulate('change', { target: { value: 'some email' } });

    const phone_input = add.find('input[name="phone"]').first();
    phone_input.simulate('change', { target: { value: '12345' } });

    const address_input = add.find('input[name="address"]').first();
    address_input.simulate('change', { target: { value: 'some address' } });

    const description_input = add.find('textarea[name="description"]').first();
    description_input.simulate('change', { target: { value: 'some description' } });

    const button = add.find('button').first();
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
