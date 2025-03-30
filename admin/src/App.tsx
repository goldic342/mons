import { Admin, Resource } from "react-admin";
import Layout from "./components/Layout";
import ContentList from "./resources/content/ContentList";
import ContentEdit from "./resources/content/ContentEdit";
import UserList from "./resources/users/UserList";
import UserCreate from "./resources/users/UserCreate";
import { dataProvider } from "./api/dataProvider";
import { authProvider } from "./api/authProvider";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="content" list={ContentList} edit={ContentEdit} />
    <Resource name="users" list={UserList} create={UserCreate} />
  </Admin>
);
