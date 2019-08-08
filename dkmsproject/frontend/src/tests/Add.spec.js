import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Add from '../Add.jsx';

describe('Add', () => {
  let add;
  let onAdd;

  beforeEach(() => {
    onAdd = jest.fn();
    add = mount(<Add onAdd={onAdd} />);
  });

  it('Add requires onAdd prop', () => {
    expect(add.props().onAdd).toBeDefined();
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

    const button = add.find('button').first();
    button.simulate('click');
    expect(onAdd).toBeCalledWith({first_name: 'some first_name', last_name: 'some last_name'});
  });
});
