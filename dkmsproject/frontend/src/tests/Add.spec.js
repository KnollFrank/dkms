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
    const button = add.find('button').first();
    const input = add.find('input[name="name"]').first();
    input.simulate('change', { target: { value: 'Name 4' } });
    button.simulate('click');
    expect(onAdd).toBeCalledWith({"name": 'Name 4'});
  });
});