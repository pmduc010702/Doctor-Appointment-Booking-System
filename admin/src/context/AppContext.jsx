import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = "$";


    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const months = [
        " ",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const slotDateFormat = (slotDate) => {
        if (typeof slotDate !== "string" || !slotDate) {
            // return (new String(slotDate)).valueOf()
            return "Date not available"; // Fallback text for invalid dates
        }

        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
      };

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider