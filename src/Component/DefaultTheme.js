import { createTheme } from 'react-data-table-component';

createTheme("default", {
  background: {
    default: "#FFFFFF",
  },
  text: {
    primary: "black",
    secondary: "black",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#ced4da",
  },
  action: {
    button: "rgba(0, 0, 0, .54)",
    hover: "rgba(0, 0, 0, .08)",
    disabled: "rgba(0, 0, 0, .12)",
  },
  // Add other theme properties as needed
});
