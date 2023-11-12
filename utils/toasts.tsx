import {
  CheckCircle,
  CheckSquare,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type ValidationError = {
  errors?: {
    [key: string]: string;
  };
  message?: string;
};

const StyledToastError = (message: string) => {
  toast.error(message, {
    icon: ({}) => {
      return <XCircle size={48} color={theme.colors.red_danger} />;
    },
    style: {
      color: theme.colors.red_danger,
      fontSize: "16px",
      fontWeight: "700",
    },
    hideProgressBar: true,
  });
};

export const ToastError = (error: AxiosError<any>) => {
  const status = error.response?.status;

  if (status === 422) {
    const errorData = error.response?.data as ValidationError;
    const errors = errorData.errors;
    if (!!errors) {
      Object.keys(errors).forEach((key) => {
        StyledToastError(errors[key]);
      });
    } else {
      if (!!errorData.message) {
        StyledToastError(errorData.message);
      } else {
        StyledToastError("Something went wrong!");
      }
    }
  } else {
    StyledToastError("Something went wrong!");
  }
};

export const ToastSuccess = (message: string) => {
  toast.success(message, {
    icon: () => {
      return <CheckCircle size={48} color={theme.colors.primary} />;
    },
    style: {
      color: theme.colors.primary,
      fontSize: "16px",
      fontWeight: "700",
    },
    hideProgressBar: true,
  });
};

export const ToastWarning = (message: string) => {
  toast.success(message, {
    icon: () => {
      return <WarningCircle size={48} color={theme.colors.cta} />;
    },
    style: {
      color: theme.colors.cta,
      fontSize: "16px",
      fontWeight: "700",
    },
    hideProgressBar: true,
  });
};
