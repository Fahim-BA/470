import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const userFetch = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("http://localhost:3000/api/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.status === 200) {
                setUser(res.data.user);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userFetch();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}



export default UserProvider;