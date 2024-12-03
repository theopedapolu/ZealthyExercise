import {clientPromise, dbName} from "../db.js";
import {NextResponse} from "next/server";

export async function GET() {
    const client = await clientPromise;
    const db = client.db(dbName);
    try {
        const result = await db.collection('user_data').find();
        let data = []
        for await (const doc of result) {
            data.push(doc);
        }
        return NextResponse.json({documents:data},{status:200});
    } catch (error) {
        return NextResponse.json({message:'Error retrieving data', error:error.message},{status:500})
    }
}