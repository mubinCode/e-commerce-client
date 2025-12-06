export const modifyPayload = (payload: any) => {
  const object = { ...payload };
  const data = JSON.stringify(object);
  const formData = new FormData();
  formData.append("data", data);
  return formData;
};
