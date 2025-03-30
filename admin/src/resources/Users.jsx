import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);
