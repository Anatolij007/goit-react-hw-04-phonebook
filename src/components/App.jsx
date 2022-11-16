// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Container, Section } from './App.styled';
import { SubmitForm } from './SubmitForm/SubmitForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalisedName = name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === normalisedName)
      ? alert(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => setFilter(event.currentTarget.value);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <Section>
        <h1>Phonebook</h1>
        <SubmitForm onSubmit={addContact} />
      </Section>
      <Section>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <Contacts
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const normalisedName = name.toLowerCase();

//     this.setState(({ contacts }) =>
//       contacts.find(contact => contact.name.toLowerCase() === normalisedName)
//         ? alert(`${name} is already in contacts`)
//         : { contacts: [contact, ...contacts] }
//     );
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => this.setState({ filter: e.currentTarget.value });

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;

//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <Container>
//         <Section>
//           <h1>Phonebook</h1>
//           <SubmitForm onSubmit={this.addContact} />
//         </Section>
//         <Section>
//           <h2>Contacts</h2>
//           <Filter value={filter} onChange={this.changeFilter} />
//           <Contacts
//             contacts={visibleContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         </Section>
//       </Container>
//     );
//   }
// }
