import BdayForm from "@/components/BdayForm";
import { currentUser, User } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser() as User;
  const {id} = user ;
  return <BdayForm userId={id} />;
};

export default Page;
