import { createTheme } from 'react-data-table-component';

createTheme("solarized", {
  background: {
    default: "#17191c",
  },
  border:{
    borderWidth:"1px"
  },
  text: {
    primary: "white",
    secondary: "white",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "rgba(255, 255, 255, 0.35)",
  },
  action: {
    button: "rgba(0, 0, 0, .54)",
    hover: "rgba(0, 0, 0, .08)",
    disabled: "rgba(0, 0, 0, .12)",
  },
  // Add other theme properties as needed
});
