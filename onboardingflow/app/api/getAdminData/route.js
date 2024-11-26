import clientPromise from "../db";
import { NextResponse } from 'next/server';

export async function GET() {
        const client = await clientPromise;
        const db = client.db('wizard_data');
        try {
            const result = await db.collection('admin_data').findOne();
            return NextResponse.json(result,{status:200});
        } catch (error) {
            return NextResponse.json({message:'Error retrieving data', error:error.message},{status:500});
        } 
}