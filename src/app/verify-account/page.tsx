/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";



import Container from "./Container";


export default async function Verify({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined | any };
}) {
  
  const email = searchParams?.email?.replaceAll(" ", "");

 

  return (
    <Container email = {email}  />
      )
}
