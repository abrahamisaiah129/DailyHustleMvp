import { useContext } from "react";
import { UserDataContext } from "./UserDataContext";

/**
 * Custom hook to access user data and related actions.
 * Must be used inside <UserDataProvider>.
 */
export const useUserData = () => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }

    return context;
};
