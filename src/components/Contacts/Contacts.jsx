import { Button, Item, List, Name, Number } from './Contacts.styled';

export const Contacts = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts.map(({ id, name, number }) => (
      <Item key={id}>
        <Name> {name}</Name> : <Number>{number}</Number>
        <Button type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </Button>
      </Item>
    ))}
  </List>
);
