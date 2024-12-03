import {clientPromise, dbName} from "../db.js";
import { NextResponse } from 'next/server';
import {createHash} from "crypto";

export async function POST(request) {
    const client = await clientPromise;
    const db = client.db(dbName);
    try {
        const data = await request.json()
        data.password = createHash('sha256').update(data.password).digest('hex');
        const result = await db.collection('user_data').insertOne(data);
        return NextResponse.json({message:'Data saved successfully', id:result.insertedId},{status:201});
    } catch (error) {
        return NextResponse.json({message:'Error saving data', error:error.message},{status:500});
    }
}