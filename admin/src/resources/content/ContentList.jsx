import { Datagrid, DeleteButton, List, TextField } from "react-admin";

const ContentList = () => (
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

export default ContentList;
