import axios from "axios";

export const sendFile = async (e, url, token) => {
  const file = e.target.file.files[0];
  const formData = new FormData();
  formData.append("file", file);

  let fileLink = undefined;

  try {
    const { data } = await axios.post(`${url}/file`, formData, {
      headers: { Authorization: token },
      "Content-Type": "multipart/form-data",
    });

    if (data) {
      fileLink = data.file;
      return fileLink;
    }
  } catch (error) {
    console.log(error);
    return fileLink;
  }
};

export const handleFilePreview = (e, setSelectedFile) => {
  if (!e.target.files || !e.target.files.length > 0) {
    return;
  }
  const file = e.target.files[0];
  const fileType = file.type.split("/")[0];
  const fileUrl = URL.createObjectURL(file);
  setSelectedFile({ fileUrl, fileType });
};
