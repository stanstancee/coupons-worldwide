"use client";

import React from "react";
import { Button } from "../ui/button";
// import Image from "next/image";

const EditCampaignHeader = ({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<"draft" | "">>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Edit Campaign</h1>
      <section className="flex items-center gap-4">
        {/* <Button className="bg-white text-primary hover:bg-white/90 ">
          <Image src="/svg/insight.svg" alt="Back" width={24} height={24} />
          <span>View Insights</span>
        </Button> */}

        <Button
          onClick={() => setStatus("")}
          type="submit"
          className="bg-primary text-white py-3 px-6"
        >
          Save Changes
        </Button>
      </section>
    </div>
  );
};

export default EditCampaignHeader;
