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
import { faListUl, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const onClick = (clickCate: IToDo["category"]) => {
    console.log(clickCate);
    setSelectedCategory(clickCate);
    setIsActive(!isActive);
  };
  const onValid = ({ newCategory }: NewCategoryProps) => {
    if (newCategory && !categoryList.includes(newCategory)) {
      setCategoryList((prev: string[]) => [newCategory, ...prev]);
      setSelectedCategory(newCategory);
      reset();
      setShowNewCategory(false);
    } else {
      setError("newCategory", {
        type: "manual",
        message: "카테고리를 다시 입력해주세요",
      });
    }
  };
  const handleDelete = (cate: string) => {
    setCategoryList((prev: string[]) =>
      prev.filter((category) => category !== cate)
    );
  };

  return (
    <Wrapper>
      <Title>To Do List</Title>
      <ButtonContainer>
        {categoryList.map((cate: string) => (
          <CategoryButton>
            <Button
              isActive={selectedCategory === cate}
              onClick={() => {
                onClick(cate);
                setShowNewCategory(cate === "NEW" ? true : false);
              }}
            >
              {cate === "NEW" ? <FontAwesomeIcon icon={faListUl} /> : cate}
            </Button>
            {!["TO_DO", "DOING", "DONE", "NEW"].includes(cate) && (
              <DeleteButton onClick={() => handleDelete(cate)}>
                <FontAwesomeIcon icon={faXmark} />
              </DeleteButton>
            )}
          </CategoryButton>
        ))}
      </ButtonContainer>
      <NewCategoryForm show={showNewCategory} onSubmit={handleSubmit(onValid)}>
        <NewCategory>
          <input
            {...register("newCategory", {
              required: "true",
              maxLength: { value: 7, message: "7자리 이하로만 입력 가능해요" },
            })}
            placeholder="새로운 카테고리를 추가해보세요"
          ></input>
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </NewCategory>
        <Span>
          {errors?.newCategory?.message && String(errors?.newCategory?.message)}
        </Span>
      </NewCategoryForm>
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

const CategoryButton = styled.div`
  position: relative;
  display: inline-block;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -20%;
  right: -8%;
  padding: 2px 5px;
  background: #b2bec3;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const NewCategoryForm = styled.form<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
`;

const NewCategory = styled.div`
  display: flex;
  gap: 10px;

  input {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding-left: 10px;

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

const Span = styled.span`
  color: #ff4848;
  font-size: 12px;
`;

export default ToDoList;
