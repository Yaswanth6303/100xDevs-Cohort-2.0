import React from "react";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xl font-bold text-center py-4">
        Login now to get 20% off on your first purchase
      </div>
      {children}
    </div>
  );
}
