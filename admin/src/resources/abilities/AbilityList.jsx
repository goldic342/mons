import { Datagrid, DeleteButton, List, TextField } from "react-admin";

const AbilityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default AbilityList;
