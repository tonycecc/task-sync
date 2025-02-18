import { currentUser } from "@clerk/nextjs/server";

export default async function AboutPage() {
  const user = await currentUser();

  if (!user) {
    return <div>Please sign in</div>;
  }
console.log('user is',user);
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Your user ID: {user.id}</p>
    </div>
  );
}
