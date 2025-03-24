import Swal from "sweetalert2";

export const checkUtilizationFactor = (P) => {
    if (P >= 1) {
        Swal.fire({
            icon: "warning",
            title: "Oops! System Unstable 🚨",
            text: "ρ must be less than 1, or your queue will explode! 🔥",
            footer: "<i>Try adjusting arrival & service parameters!</i>",
            confirmButtonText: "Let’s Fix It 🔧",
        });
        return false
    }
    return true;
};
