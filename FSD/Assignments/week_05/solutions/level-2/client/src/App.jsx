import { useEffect, useState } from "react";
import axios from "axios";
import BusinessCard from "./components/BusinessCard";
import CardForm from "./components/CardForm";

function App() {
  const [cards, setCards] = useState([]);

  // Load cards
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cards`)
      .then((res) => setCards(res.data));
  }, []);

  // Add card
  const addCard = async (card) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/cards`, card);
    const saved = await res.data;
    setCards([...cards, saved]);
  };

  // Delete card
  const deleteCard = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/cards/${id}`);
    setCards(cards.filter((c) => c._id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Business Card Manager</h1>
      <CardForm onAdd={addCard} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {cards.map((card) => (
          <BusinessCard
            key={card._id}
            {...card}
            onDelete={() => deleteCard(card._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
