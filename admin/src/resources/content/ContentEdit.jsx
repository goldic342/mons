import { Edit, SimpleForm, TextInput } from "react-admin";

const ContentEdit = () => (
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

export default ContentEdit;
