import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export default async function User() {
  // getServerSession is a function that returns the session object for the current user
  // it is a server component function that can be used to get the session object for the current user
  const session = await getServerSession(NEXT_AUTH_CONFIG); // NEXT_AUTH_CONFIG this is imported from the lib/auth.ts file so id can be used here.
  return (
    <div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
