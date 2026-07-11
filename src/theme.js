import { createTheme } from "@mui/material/styles";

export default createTheme({
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    palette: {
        mode: 'light',
        primary: {
            main: "#0ea5a1"
        },
        secondary: {
            main: "#fb923c"
        },
        background: {
            default: '#f6fbfb',
            paper: '#ffffff'
        },
        text: {
            primary: '#0f1724'
        }
    },
    shape: {
        borderRadius: 12
    }
});