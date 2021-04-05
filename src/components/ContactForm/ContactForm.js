import React, { Component } from 'react';
import { useState } from 'react';
import shortid from 'shortid';
import s from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import contactsActions from '../../redux/actions';
import { getContacts } from '../../redux/selectors';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

    const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();
  
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
     
    const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

    
   const handleSubmit = e => {
    e.preventDefault();
    if (name === '') {
      alert(`Введите имя контакта.`);
      return;
    }

    if (number === '') {
      alert(`Введите номер телефона`);
      return;
    }

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is in contacts.`);
      reset();
      return;
    }

    dispatch(contactsActions.addContact(name, number));
    reset();
  };

   const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor={nameInputId}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
        />
      </label>
      <label className={s.label} htmlFor={numberInputId}>
        Number
        <input
          className={s.input}
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
        />
      </label>

      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}