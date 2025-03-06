import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="rounded-md p-2 bg-secondary font-content cursor-pointer"
    >
      {children}
    </button>
  );
}
