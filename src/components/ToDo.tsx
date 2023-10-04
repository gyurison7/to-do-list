import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
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
        {category !== "TO_DO" && (
          <Button onClick={() => onClick("TO_DO")}>To Do</Button>
        )}
        {category !== "DOING" && (
          <Button onClick={() => onClick("DOING")}>Doing</Button>
        )}
        {category !== "DONE" && (
          <Button onClick={() => onClick("DONE")}>Done</Button>
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
  height: 80px;
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
  width: 100%;
  gap: 10px;
`;

const Button = styled.button`
  width: 70px;
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
