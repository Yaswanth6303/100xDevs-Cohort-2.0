import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  // When we are using atomFamily then we should use selecorFamily not selector to connect
  // with backend. If we selector selector for every atom selector will be same
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`http://localhost:3000/todo?id=${id}`);
      return res.data.todo;
    },
  })
});