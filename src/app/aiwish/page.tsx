import React from "react";

const page = () => {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$GOOGLE_API_KEY";
  return (
    <div>
      <h1>AI Wish</h1>
    </div>
  );
};

export default page;
