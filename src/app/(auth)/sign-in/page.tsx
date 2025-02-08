import React from "react";
import Container from "./Container";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Container />
    </Suspense>
  );
};

export default page;
