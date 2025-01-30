/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import Container from "./Container";

export default async function Verify({ searchParams }: { searchParams: any }) {
  const email = searchParams?.email?.toString()?.replaceAll(" ", "");

  return <Container email={email} />;
}
