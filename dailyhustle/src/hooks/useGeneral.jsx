// src/hooks/useGeneral.js
import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

export const useGeneral = () => {
    const context = useContext(GeneralContext);
    if (!context) {
        throw new Error("useGeneral must be used within a GeneralProvider");
    }
    return context;
};
