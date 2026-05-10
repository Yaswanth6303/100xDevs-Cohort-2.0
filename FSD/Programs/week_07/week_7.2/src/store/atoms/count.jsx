import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countAtom", // This should be unique across the whole application, This key signifies how to uniquely identify this atom(state variable).
  default: 0, // This is the default value of the atom.
});

// A selector represents a piece of derived state.
// You can think of derived state as the output of passing state to a pure function that
// derives a new value from the said state.
// If the number is even or odd it is completely dependepnt on the countAtom
// So this selector is dependent on countAtom
// Here, evenSelector is dependent on countAtom. Because whenever countAtom changes then only evenSelector will change.
export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2 === 0;
  },
});
