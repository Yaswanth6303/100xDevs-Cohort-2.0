import { useState } from "react";

const CardForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    interests: "",
    linkedin: "",
    twitter: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description)
      return alert("Name & description required");

    const newCard = {
      ...form,
      interests: form.interests.split(",").map((i) => i.trim()),
    };

    onAdd(newCard);
    setForm({
      name: "",
      description: "",
      interests: "",
      linkedin: "",
      twitter: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg mb-6 bg-gray-50 shadow"
    >
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Interests (comma separated)"
        value={form.interests}
        onChange={(e) => setForm({ ...form, interests: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="LinkedIn URL"
        value={form.linkedin}
        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Twitter URL"
        value={form.twitter}
        onChange={(e) => setForm({ ...form, twitter: e.target.value })}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Card
      </button>
    </form>
  );
};

export default CardForm;
