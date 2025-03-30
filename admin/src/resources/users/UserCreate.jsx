import { Create, SimpleForm, TextInput, PasswordInput } from "react-admin";

const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="username" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
