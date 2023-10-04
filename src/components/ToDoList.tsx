import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  catagoryListState,
  IToDo,
  selectedCatogoryState,
  toDoSelector,
} from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface NewCategoryProps {
  newCategory?: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categoryList, setCategoryList] = useRecoilState(catagoryListState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCatogoryState
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showNewCategory, setShowNewCategory] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const onClick = (clickCate: IToDo["category"]) => {
    console.log(clickCate);
    setSelectedCategory(clickCate);
    setIsActive(!isActive);
  };
  const onValid = ({ newCategory }: NewCategoryProps) => {
    if (newCategory && !categoryList.includes(newCategory)) {
      setCategoryList((prev: string[]) => [newCategory, ...prev]);
      setSelectedCategory(newCategory);
    } else {
      alert("카테고리를 다시 입력해주세요");
    }
    reset();
    setShowNewCategory(false);
  };

  return (
    <Wrapper>
      <Title>To Do List</Title>
      <ButtonContainer>
        {categoryList.map((cate: string) => (
          <Button
            isActive={selectedCategory === cate}
            onClick={() => {
              onClick(cate);
              setShowNewCategory(cate === "NEW" ? true : false);
            }}
          >
            {cate === "NEW" ? <FontAwesomeIcon icon={faListUl} /> : cate}
          </Button>
        ))}
      </ButtonContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <NewCategory show={showNewCategory}>
          <input
            {...register("newCategory", { required: true })}
            placeholder="새로운 카테고리를 추가해보세요"
          ></input>
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </NewCategory>
      </form>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin: 20px;
  color: ${(props) => props.theme.accentColor};
  font-size: 36px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button<{ isActive: boolean }>`
  width: calc(25% -10px);
  min-width: 112px;
  height: 35px;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  ${({ isActive, theme }) =>
    isActive &&
    `
  border: 2px solid ${theme.accentColor};
  color: ${theme.accentColor};
  font-weight: 600;
  `}
`;

const NewCategory = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  gap: 10px;

  input {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding-left: 10px;
    margin-bottom: 20px;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 10%;
    height: 35px;
    background-color: #fff;
    color: ${(props) => props.theme.accentColor};
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default ToDoList;
