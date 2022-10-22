import { getSession } from "next-auth/react";

export const requireAuthentication = async (context: any, cb: any) => {
  const session = await getSession(context);
  const token = window.localStorage.getItem("token")

  if (!session) {
    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
  }

  return cb({ session })
};
