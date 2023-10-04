import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, catagoryListState, toDoState } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(catagoryListState);
  const onClick = (newCate: IToDo["category"]) => {
    setToDos((oldToDos) =>
      oldToDos.map((toDo) => {
        if (toDo.id === id) {
          return { text, id, category: newCate };
        }
        return toDo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };
  return (
    <Li>
      <span>{text}</span>
      <ButtonContainer>
        {categoryList
          .filter((cate: string) => cate !== "NEW")
          .map(
            (cate: string) =>
              category !== cate && (
                <Button onClick={() => onClick(cate)}>{cate}</Button>
              )
          )}
        <Button onClick={() => handleDelete(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </ButtonContainer>
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: 80px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  gap: 10px;

  span {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const Button = styled.button`
  width: auto;
  min-width: 70px;
  max-width: 108px;
  height: 30px;
  color: #a29bfe;
  background-color: white;
  border: 1px solid #a29bfe;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    border: 1px solid ${(props) => props.theme.accentColor};
  }

  &:last-child {
    color: #ff7675;
    border: 1px solid #ff7675;
    &:hover {
      color: #ff4848;
      border: 1px solid #ff4848;
    }
  }
`;

export default ToDo;
