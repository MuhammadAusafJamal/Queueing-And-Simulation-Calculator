import { toast } from "react-toastify";

export const toastNotify = () =>
    toast.error("Required feilds are missing", {
        autoClose: 1000,
        position: 'top-center',
    });