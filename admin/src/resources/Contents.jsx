import {
  Datagrid,
  DeleteButton,
  Edit,
  List,
  TextField,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ContentList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="key" />
      <TextField source="section" />
      <TextField source="name" />
      <TextField source="value" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ContentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="key" />
      <TextInput source="section" />
      <TextInput source="name" />
      <TextInput source="value" multiline />
    </SimpleForm>
  </Edit>
);
