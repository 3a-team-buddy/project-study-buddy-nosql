import { headers } from "next/headers";
import { verifyToken } from "@clerk/backend";
async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  if (!authToken) {
    return false;
  }
  try {
    const { sub, role } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    console.log({ role });
    return sub;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export const POST = async () => {
  const userId = await checkAuth();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }
  return Response.json({ userId });
};
