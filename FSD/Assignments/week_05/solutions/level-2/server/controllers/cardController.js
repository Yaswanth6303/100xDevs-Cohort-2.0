import BusinessCard from "../models/BusinessCard.js";

// GET all cards
export const getCards = async (req, res) => {
  try {
    const cards = await BusinessCard.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create card
export const createCard = async (req, res) => {
  try {
    const card = new BusinessCard(req.body);
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update card
export const updateCard = async (req, res) => {
  try {
    const updated = await BusinessCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE card
export const deleteCard = async (req, res) => {
  try {
    await BusinessCard.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
