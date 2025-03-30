import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  Edit,
} from "react-admin";

export const AbilityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AbilityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Create>
);

export const AbilityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Edit>
);
