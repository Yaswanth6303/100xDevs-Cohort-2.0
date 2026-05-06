"use client";

// If we need SEO friendly component, we should use server component instead of client component.
// If we use client side functionality, we should use client component. Eg: Form submission, etc.
export default function Button() {
  const handleClick = () => {
    alert("Form submitted successfully");
  };
  return (
    <button
      type="button"
      className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={handleClick}
    >
      Sign in
    </button>
  );
}
