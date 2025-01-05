import { useContext } from "react";
import { UserContext } from "./userProvider";

export const useUserContext = () => {
    return useContext(UserContext);
}

