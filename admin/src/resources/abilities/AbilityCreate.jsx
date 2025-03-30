import { Create, SimpleForm, TextInput } from "react-admin";

const AbilityCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" multiline />
      </SimpleForm>
    </Create>
  );
};

export default AbilityCreate;
