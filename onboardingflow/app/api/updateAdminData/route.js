import { NextResponse } from "next/server";
import clientPromise from "../db";

export async function PUT(request) {
    const client = await clientPromise;
    const db = client.db('wizard_data');
    try {
        const data = await request.json();
        const result = await db.collection('admin_data').replaceOne({},data)
        return NextResponse.json({message:'Data saved successfully', id:result.upsertedId},{status:201});
    } catch (error) {
        return NextResponse.json({message:'Error saving data', error:error.message},{status:201});
    }
}