import { useNotify, useRefresh, useRecordContext } from "react-admin";
import { useState } from "react";
import { Box, Button, InputLabel, Stack } from "@mui/material";

const ProjectContentUpload = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!record) return null;

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/${record.id}/contents`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      notify("Файл загружен", { type: "success" });
      setFile(null);
      refresh();
    } catch (err) {
      notify("Загрузка не удалась", { type: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <InputLabel htmlFor="upload-file">Загрузить файл</InputLabel>
        <input
          id="upload-file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ display: "inline-block" }}
        />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          Добавить файл
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectContentUpload;
