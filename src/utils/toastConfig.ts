import { merge } from "lodash";
import toast from "react-hot-toast";
import CircularProgress from "shared/CircularProgress";

const defaultConfig: Parameters<typeof toast>[1] = {
  position: "top-center",
  style: {
    border: "1px solid #4CB54380",
    fontSize: "14px",
    background: "#EDF8EC",
    color: "#357F2F",
  },
};

export const toastAlert = {
  success: (
    msg: Parameters<typeof toast>[0],
    options?: Parameters<typeof toast>[1]
  ) => toast.success(msg, merge(defaultConfig, options)),
  loading: (
    msg: Parameters<typeof toast>[0],
    options?: Parameters<typeof toast>[1]
  ) =>
    toast.loading(
      msg,
      merge(
        {
          ...defaultConfig,
          icon: CircularProgress({ color: "#357F2F" }),
        },
        options
      )
    ),
  error: (
    msg: Parameters<typeof toast>[0],
    options?: Parameters<typeof toast>[1]
  ) =>
    toast.error(
      msg,
      merge(
        {
          ...defaultConfig,
          style: {
            ...defaultConfig.style,
            background: "#FAE8EA",
            color: "#CF142B",
            border: "1px solid #993844",
          },
        },
        options
      )
    ),
  dismiss: (toastId: string) => toast.dismiss(toastId),
};
