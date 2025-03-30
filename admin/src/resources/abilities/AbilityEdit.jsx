import { Edit, SimpleForm, TextInput } from "react-admin";

const AbilityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" multiline />
    </SimpleForm>
  </Edit>
);

export default AbilityEdit;
