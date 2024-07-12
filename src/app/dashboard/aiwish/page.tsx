import AiForm from "@/components/AiForm";
import React from "react";

const page = () => {
  return (
    <div className="flex  backdrop-blur rounded-lg z-20 flex-col max-w-md mx-auto items-center justify-center p-4 gap-2 w-full border">
      <h1 className="text-2xl md:text-3xl font-semibold">AI Wish generator👽</h1>
      <AiForm />
    </div>
  );
};

export default page;
