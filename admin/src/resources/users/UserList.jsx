import { Datagrid, DeleteButton, List, TextField } from "react-admin";

const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UserList;
