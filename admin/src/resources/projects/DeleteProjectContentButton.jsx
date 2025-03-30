import { useNotify, useRefresh, useRecordContext } from "react-admin";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteProjectContentButton = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();

  if (!record) return null;

  const handleDelete = async (e) => {
    e.stopPropagation(); // 👈 prevents datagrid row click behavior

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/contents/${record.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      notify("Deleted", { type: "info" });
      refresh();
    } catch (err) {
      notify("Delete error", { type: "error" });
    }
  };

  return (
    <IconButton onClick={handleDelete} title="Delete" color="error">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteProjectContentButton;
