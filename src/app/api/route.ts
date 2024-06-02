//File contains template GET handler

import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { userID: string } }
) {
  try {

    return NextResponse.json("Reached the api folder");
  } catch (error) {
    console.log("api/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the stores",
      { status: 500 }
    );
  }
}