import { atom, selector } from "recoil";

export enum Categories {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const catagoryState = atom<Categories>({
  key: "catagory",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(catagoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});