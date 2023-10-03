import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { catagoryState, toDoState } from "../atom";

interface Iform {
    toDo: string;
  }

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(catagoryState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ toDo }: Iform) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a to do." })}
        placeholder="Write a to do."
      />
      <button>Add</button>
    </Form>
  );
}

const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export default CreateToDo;
