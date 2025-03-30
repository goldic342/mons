import { Datagrid, DeleteButton, List, TextField } from "react-admin";

const ContactList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="contact_value" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ContactList;
