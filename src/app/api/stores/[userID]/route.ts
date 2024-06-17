//File contains template POST and GET handlers.
import { NextResponse } from "next/server";

import { Store } from "@/resources/db/models/store"
import { connectDB } from "@/resources/db/mongodb"


export async function GET(
    req: Request,
    { params }: { params: { userID: string } }
) {
    try {
        const { userID } = params
        console.log(userID)
        await connectDB()
        const dbRes = await Store.find({ owner: userID },{}).exec()
        console.log(dbRes)
        return NextResponse.json(dbRes);
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
    { params }: { params: { userID: string } }
) {
    try {
        const { userID } = params

        await connectDB()
        console.log(req)
        const body = await req.json();
        const { name, age, owner }: any = body;

        const store = new Store({
            name: name,
            age: age,
            owner: owner
        })
        const dbRes = await store.save()
        console.log("inside api", dbRes)


        return NextResponse.json("Success");
    } catch (error) {
        console.log("api/stores/POST", error);
        return new NextResponse(
            "Ooops, something went wrong when posting the stores",
            { status: 500 }
        );
    }
}