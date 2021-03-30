
import React, { Component } from 'react';
import shortid from 'shortid';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';




class App extends Component { 
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
  
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
    
  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      console.log('contacts updated');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  addContact = (name, number) => {
    const { contacts } = this.state;
     if (name === '') {
      alert(`Введите имя контакта.`);
      return;
    }

    if (number === '') {
      alert(`Введите номер телефона контакта.`);
      return;
    }
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`)
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };
  
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
 
  deleteContact = contactId => {
     this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };



  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
     <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact}/>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
      </>
      );
    }
  }
export default App;
