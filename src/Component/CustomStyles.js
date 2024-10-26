import { Columns } from "react-feather";
import { createTheme } from 'react-data-table-component';

export const customStyles = {
  table: {
    style: {
      paddingTop: '15px', // Add padding to the entire table
      background:'transparent',
      border: "none",
    },
  },
  pagination: {
    style: {
      color: 'red', // Change the color of pagination icons
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      whiteSpace: "normal !important",
      color:'white',
      background: 'rgb(38 24 40)',
      borderBottomColor:"transparent !important",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      color: 'white',
    },
  },
  headRow: {
    style: {
      background:'linear-gradient(89.6deg,#05d6d933 .3%,#f907fc33 99.65%)',
      borderRadius:'15px 15px 0px 0px',
      borderBottomColor:"transparent !important",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      // borderRight: '1px solid #dee2e6', // Vertical line for cells
      // border: '1px solid #50555f',
      // color: 'red',
      whiteSpace: 'break-spaces !important', // Use 'normal' instead of 'normal !important'
      // wordBreak:'normal',
      // minWidth:'auto !important'
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      // background: 'rgb(38 24 40)',
      color:'white',
      borderTopColor:"transparent !important",
    }
  }
};


// export const solarized = createTheme('solarized', {
//   text: {
//     primary: '#268bd2',
//     secondary: '#2aa198',
//   },
//   background: {
//     default: 'black',
//   },
//   context: {
//     background: '#cb4b16',
//     text: '#FFFFFF',
//   },
//   divider: {
//     default: '#073642',
//   },
//   action: {
//     button: 'rgba(0,0,0,.54)',
//     hover: 'rgba(0,0,0,.08)',
//     disabled: 'rgba(0,0,0,.12)',
//   },
// }, 'dark');
