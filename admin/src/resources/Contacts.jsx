import { List, Datagrid, TextField, DeleteButton } from "react-admin";

export const ContactList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="contact_value" />
      <DeleteButton />
    </Datagrid>
  </List>
);
