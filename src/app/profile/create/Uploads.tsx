/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FileUpload from "./FileUpload";

const Uploads = ({ setActiveTab }: { setActiveTab: any }) => {
 
  return (
    <div>
      <FileUpload setActiveTab={setActiveTab} />
    </div>
  );
};

export default Uploads;
