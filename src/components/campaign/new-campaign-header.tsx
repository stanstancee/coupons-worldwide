"use client";

import React from "react";
import { Button } from "../ui/button";
// import Image from "next/image";

const NewCampaignHeader = ({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<"draft" | "">>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">New Campaign</h1>
      <section className="flex items-center gap-4">
        {/* <Button className="bg-white text-primary hover:bg-white/90 ">
          <Image src="/svg/insight.svg" alt="Back" width={24} height={24} />
          <span>View Insights</span>
        </Button> */}
        <Button
          variant={"destructive"}
          type="submit"
          className=" text-white py-3 px-6"
          onClick={() => setStatus("draft")}
        >
          Save as draft
        </Button>

        <Button
          onClick={() => setStatus("")}
          type="submit"
          className="bg-primary text-white py-3 px-6"
        >
          Publish
        </Button>
      </section>
    </div>
  );
};

export default NewCampaignHeader;
