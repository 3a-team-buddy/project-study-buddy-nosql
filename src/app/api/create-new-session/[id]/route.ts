import { Session } from "@/lib/models/Session";
// import connectDB from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;
//   await connectDB();

//   const getSession = await Session.findOne({
//     _id: id,
//   }).lean();

//   return NextResponse.json({ data: getSession });
// }
