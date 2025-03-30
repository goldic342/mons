import { Admin, EditGuesser, Resource } from "react-admin";
import Layout from "./components/Layout";

import {
  AbilityCreate,
  AbilityEdit,
  AbilityList,
} from "./resources/Abilities.jsx";
import { UserCreate, UserList } from "./resources/Users";
import { ContentEdit, ContentList } from "./resources/Contents";
import { ContactList } from "./resources/Contacts";
import {
  EmployeeList,
  EmployeeShow,
  EmployeeEdit,
  EmployeeCreate,
} from "./resources/Employees.jsx";
import { dataProvider } from "./api/dataProvider";
import { authProvider } from "./api/authProvider";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      edit={EmployeeEdit}
      create={EmployeeCreate}
    />
    <Resource
      name="abilities"
      list={AbilityList}
      edit={AbilityEdit}
      create={AbilityCreate}
    />
    <Resource name="contacts" list={ContactList} />
    <Resource name="content" list={ContentList} edit={ContentEdit} />
    <Resource name="users" list={UserList} create={UserCreate} />
  </Admin>
);
