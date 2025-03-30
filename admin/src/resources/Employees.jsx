import {
  Datagrid,
  DateField,
  ImageField,
  List,
  TextField,
  Show,
  SimpleShowLayout,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  Create,
} from "react-admin";

export const EmployeeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="position_full" />
      <ImageField
        source="photo_url"
        sx={{ "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" } }}
      />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EmployeeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="position" />
      <TextField source="position_full" />
      <TextField source="industry" />
      <ImageField source="photo_url" />
      <DateField source="experience" />
      <DateField source="professional_competention" />
    </SimpleShowLayout>
  </Show>
);

export const EmployeeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="position" />
      <TextInput source="position_full" />
      <TextInput source="industry" multiline />
      <ImageInput source="photo" />
      <TextInput source="experience" multiline />
      <TextInput source="competention" multiline />
    </SimpleForm>
  </Edit>
);

export const EmployeeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="position" />
      <TextInput source="position_full" />
      <TextInput source="industry" multiline />
      <ImageInput source="photo" />
      <TextInput source="experience" multiline />
      <TextInput source="competention" multiline />
    </SimpleForm>
  </Create>
);
