import { UserProfile } from "@clerk/nextjs";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const ProfilePage = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <div className="mx-auto my-10">
      <UserProfile
        appearance={{
          variables: {
            colorPrimary: "#8130F6",
          },
        }}
      />
    </div>
  );
};

export default ProfilePage;
