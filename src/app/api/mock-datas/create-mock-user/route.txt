// import {
//   createMockUser,
//   getAllMockUsers,
// } from "@/lib/services/mock-user-service";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { mockUserName, mockUserEmail, mockUserImage, mockUserStatus } = body;

//     console.log({ mockUserName, mockUserEmail, mockUserImage, mockUserStatus });

//     if (!mockUserName || !mockUserEmail || !mockUserImage || !mockUserStatus) {
//       return NextResponse.json(
//         { message: "All fields are required!" },
//         { status: 400 }
//       );
//     }

//     const mockSessionUser = await createMockUser(
//       mockUserName,
//       mockUserEmail,
//       mockUserImage,
//       mockUserStatus
//     );

//     if (!mockSessionUser) {
//       return NextResponse.json(
//         { message: "Failed to create mock user!" },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Mock user created successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error while creating mock user!", error);
//     return NextResponse.json(
//       { message: "Server error while creating mock user!", error },
//       { status: 500 }
//     );
//   }
// }

// export const GET = async () => {
//   const mockUsers = await getAllMockUsers();

//   if (!mockUsers) {
//     return NextResponse.json(
//       { message: "No mock users found!" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({ data: mockUsers });
// };
