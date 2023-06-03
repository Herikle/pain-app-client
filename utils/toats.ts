import { AxiosError } from "axios";
import { toast } from "react-toastify";

type ValidationError = {
  errors: {
    [key: string]: string;
  };
};

export const ToastError = (error: AxiosError<any>) => {
  const status = error.response?.status;

  if (status === 422) {
    const errors = error.response?.data.errors;
    if (errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key]);
      });
    }
  } else {
    toast.error("Something went wrong!");
  }
};

export const ToastSuccess = (message: string) => {
  toast.success(message);
};
