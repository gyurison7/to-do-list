import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCatogoryState, toDoState } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Iform {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const selectedCategory = useRecoilValue(selectedCatogoryState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ toDo }: Iform) => {
    setToDos((prev) => [{ text: toDo, id: Date.now(), category: selectedCategory }, ...prev]);
    setValue("toDo", "");
  };
  return (
    <Form category={selectedCategory} onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "할 일을 작성해보세요" })}
        placeholder="할 일을 작성해보세요"
      />
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Form>
  );
}

const Form = styled.form<{category: string}>`
  display: ${props => props.category === "NEW" ? 'none' : 'flex'};
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border: none;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 10%;
  background-color: #fff;
  color: ${(props) => props.theme.accentColor};
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export default CreateToDo;
