import React from 'react';

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="btn-primary font-content cursor-pointer rounded-md p-4">
      {children}
    </button>
  );
}
