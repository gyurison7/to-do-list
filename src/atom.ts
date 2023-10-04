import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCatogoryState = atom({
  key: "selectedCategory",
  default: "TO_DO",
});

export const catagoryListState = atom({
  key: "catagoryList",
  default: ["TO_DO", "DOING", "DONE", "NEW"],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const selectedCategory = get(selectedCatogoryState);
    return toDos.filter((toDo) => toDo.category === selectedCategory);
  },
});
