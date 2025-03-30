import {
  ArrayField,
  ArrayInput,
  ChipField,
  Datagrid,
  DeleteButton,
  Edit,
  ImageField,
  ImageInput,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  Show,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";
import ProjectContentUpload from "./ProjectContentUpload";
import DeleteProjectContentButton from "./DeleteProjectContentButton";

export const ProjectList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="tags" />
      <TextField source="type" />
      <NumberField source="reading_time" />
      <ImageField
        source="thumbnail_url"
        sx={{ "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" } }}
      />
      <ArrayField source="contents">
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

export const ProjectShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="tags" />
      <TextField source="type" />
      <NumberField source="reading_time" />
      <ImageField source="thumbnail_url" />
      <TextField source="calls_section" />
      <TextField source="analyzis_section" />
      <TextField source="values_section" />
      <TextField source="mission_section" />
      <TextField source="distribution_section" />
      <TextField source="id" />
      <ProjectContentUpload />
      <ArrayField source="contents">
        <Datagrid empty={<p>Контент не прикреплен...</p>}>
          <TextField source="id" />
          <ReferenceField source="project_id" reference="projects" />
          <ImageField
            source="content_url"
            sx={{
              "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" },
            }}
          />
          <DeleteProjectContentButton />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export const ProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="tags" />
      <TextInput source="type" />
      <NumberInput source="reading_time" />
      <ImageInput source="photo" />
      <TextInput source="calls_section" />
      <TextInput source="analyzis_section" />
      <TextInput source="values_section" />
      <TextInput source="mission_section" />
      <TextInput source="distribution_section" />
    </SimpleForm>
  </Edit>
);
