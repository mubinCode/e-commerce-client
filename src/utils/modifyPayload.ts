export const modifyPayload = <T,>(payload: T): FormData => {
  const object = { ...payload };
  const data = JSON.stringify(object);
  const formData = new FormData();
  formData.append("data", data);
  return formData;
};
