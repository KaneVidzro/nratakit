import { requireUser } from "@/lib/session";

export default async function Page() {
  const user = await requireUser();

  return (
    <div>
      <h1 className="text-3xl font-bold">Account</h1>
      <h2>User: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Created At: {user.createdAt.toLocaleDateString()}</p>
    </div>
  );
}
