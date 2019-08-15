// adapted from https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import DonorCreate from '../DonorCreate.js';

window.alert = jest.fn();

describe('DonorCreate', () => {
  window.alert.mockClear();
  let donorCreate;
  let createDonor;

  beforeEach(() => {
    createDonor = jest.fn();
    donorCreate = mount(<DonorCreate createDonor={createDonor} />);
  });

  it('DonorCreate requires createDonor prop', () => {
    expect(donorCreate.props().createDonor).toBeDefined();
  });

  it('DonorCreate renders button', () => {
    const button = donorCreate.find('button').first();
    expect(button).toBeDefined();
  });

  it.skip('Button click calls createDonor', () => {
    function enter(selector, text) {
      const input = donorCreate.find(selector).first();
      input.simulate('change', { target: { value: text } });
    }

    // Given
    const donor = {
      salutation: 'Mrs'
      first_name: 'some first_name',
      last_name: 'some last_name',
      email: 'email@web.de',
      phone: '12345',
      mobile: '07129/922825',
      address: 'some address',
    };

    // When entering a donor
    enter('input[name="salutation"]', donor.salutation);
    enter('input[name="first_name"]', donor.first_name);
    enter('input[name="last_name"]', donor.last_name);
    enter('input[name="email"]', donor.email);
    enter('input[name="phone"]', donor.phone);
    enter('input[name="mobile]', donor.mobile);
    enter('input[name="address"]', donor.address);

    // And clicking the send button
    const button = donorCreate.find('[type="submit"]').first();
    button.simulate('click');

    // Then
    expect(createDonor).toBeCalledWith(donor);
  });
});
