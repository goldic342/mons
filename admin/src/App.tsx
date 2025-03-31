import { Admin, Resource } from "react-admin";
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
import {
  ProjectList,
  ProjectShow,
  ProjectEdit,
} from "./resources/projects/Projects";
import { dataProvider } from "./api/dataProvider";
import { authProvider } from "./api/authProvider";

// Icons
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleIcon from "@mui/icons-material/People";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="projects"
      list={ProjectList}
      show={ProjectShow}
      edit={ProjectEdit}
      icon={WorkOutlineIcon}
    />
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      edit={EmployeeEdit}
      create={EmployeeCreate}
      icon={PeopleIcon}
    />
    <Resource
      name="abilities"
      list={AbilityList}
      edit={AbilityEdit}
      create={AbilityCreate}
      icon={FlashOnIcon}
    />
    <Resource name="contacts" list={ContactList} icon={ContactMailIcon} />
    <Resource
      name="content"
      list={ContentList}
      edit={ContentEdit}
      icon={ArticleIcon}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      icon={SupervisorAccountIcon}
    />
  </Admin>
);
