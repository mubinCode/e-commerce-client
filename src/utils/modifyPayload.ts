export const modifyPayload = <T extends {file?: File}>(payload: T): FormData => {
  const {file, ...object} = payload;
  const data = JSON.stringify(object);
  const formData = new FormData();
  formData.append("data", data);
  if(file)  formData.append("file", file as Blob)
  return formData;
};
