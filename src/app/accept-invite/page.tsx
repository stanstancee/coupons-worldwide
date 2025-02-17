/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import Container from "./Container";

export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;

  return <Container email={email} />;
}
