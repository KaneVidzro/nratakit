import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
};

export const requireUser = async () => {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
};
