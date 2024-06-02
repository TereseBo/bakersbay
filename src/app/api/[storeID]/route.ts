//File contains template POST and GET handlers.
import { NextResponse } from "next/server";

import { Store } from "@/resources/db/models/store"
import  {connectDB}  from "@/resources/db/mongodb"


export async function GET(
    req: Request,
    { params }: { params: { userID: string } }
  ) {
    try {
  
      return NextResponse.json("Reached the api/storeID folder");
    } catch (error) {
      console.log("api/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the stores",
        { status: 500 }
      );
    }
  }

export async function POST(
    req: Request,
    { params }: { params: { storeID: string } }
) {
    try {

        await connectDB()
        console.log(req)
        const body = await req.json();
        const {name, age  }: any = body;

        const store = new Store({
            name: name,
            age: age
        })
        await store.save()
        console.log("inside api", name, age)


        return NextResponse.json("Success");
    } catch (error) {
        console.log("api/stores/POST", error);
        return new NextResponse(
            "Ooops, something went wrong when posting the stores",
            { status: 500 }
        );
    }
}