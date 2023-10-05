import { AxiosError } from "axios";
import { toast } from "react-toastify";

type ValidationError = {
  errors?: {
    [key: string]: string;
  };
  message?: string;
};

export const ToastError = (error: AxiosError<any>) => {
  const status = error.response?.status;

  if (status === 422) {
    const errorData = error.response?.data as ValidationError;
    const errors = errorData.errors;
    if (!!errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key]);
      });
    } else {
      if (!!errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  } else {
    toast.error("Something went wrong!");
  }
};

export const ToastSuccess = (message: string) => {
  toast.success(message);
};
