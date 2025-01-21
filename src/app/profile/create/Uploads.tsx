import React from "react";
import FileUpload from "./FileUpload";

const Uploads = ({ onNext }: { onNext: () => void }) => {
  console.log(onNext);
  return (
    <div>
      <FileUpload />
    </div>
  );
};

export default Uploads;
