import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";


export default function SubheaderComponent({ data, setdata, fileHeading }) {
  const [filterdata, setFilterData] = useState(data);

  const inputHandlerFunc = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = filterdata.filter((item) => {
      return Object.values(item).some((fieldValue) =>
        String(fieldValue).toLowerCase().includes(inputValue)
      );
    });
    setdata(filtered);
  };

  console.log("Withdrawal Request", fileHeading);

  const handleExport = () => {
    if (!data || data.length === 0) {
      console.error('No data available to export');
      return;
    }

    // Extract keys from the first object to use as headers
    const headers = Object.keys(data[0]);

    // Generate CSV content: first the headers, then the data rows
    const csv = [
      headers.join(','), // Add headers
      ...data.map(row => headers.map(field => row[field]).join(',')) // Add rows
    ].join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set custom filename here
    link.download = fileHeading;

    // Trigger the download
    link.click();
  };

  return (
    // <div className="w-100">
    <div className="customwidth d-block d-sm-flex justify-content-end align-items-center">
      <input
        type="search"
        className="form-control w-100 mb-3 mb-sm-0"
        id="outlined-basic"
        placeholder="search..."
        onChange={(e) => inputHandlerFunc(e)}
        style={{ marginRight: "10px", padding: "8px 7px" }}
      />

      {/* <CSVLink data={data} className="text-nowrap pl-2 btn btn-primary w-100 cstm_padding">
        {" "}
        <FaDownload />&nbsp;&nbsp;Download CSV File
      </CSVLink> */}

      <Button className="text-nowrap pl-2 btn btn-primary w-100 cstm_padding" onClick={handleExport}>
        <FaDownload />&nbsp;&nbsp;Download CSV File
      </Button>
    </div>

    // </div>
  );
}
