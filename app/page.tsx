import Dashboard from "@/components/widgets/Dashboard";
import { currentUser } from "./actions/currentUser";

export default async function Home() {
  const user = await currentUser();
  return (
    <Dashboard
      user={user as any}
     />
  );
}
