export const getPayloadFromSubmitForm = <T>(
  e: React.FormEvent<HTMLFormElement>
) => {
  const formData = new FormData(e.currentTarget);

  const payload = {};

  formData.forEach((value, key) => {
    payload[key] = value;
  });

  return payload as T;
};
