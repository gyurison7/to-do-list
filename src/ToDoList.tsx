import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 5) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write to do" />
//         <button>Add</button>
//         {toDoError ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    //setError("extraError", { message: "Server Error" });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email format is not valid",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message && String(errors.email.message)}</span>
        <input
          {...register("firstName", {
            required: "First Name is required",
            validate: (value) =>
              value.includes("admin") ? "No admin allowed" : true,
          })}
          placeholder="First Name"
        />
        <span>
          {errors?.firstName?.message && String(errors.firstName.message)}
        </span>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          placeholder="Last Name"
        />
        <span>
          {errors?.lastName?.message && String(errors.lastName.message)}
        </span>
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
        />
        <span>
          {errors?.username?.message && String(errors.username.message)}
        </span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "Your Password is too short" },
          })}
          placeholder="Password"
        />
        <span>
          {errors?.password?.message && String(errors.password.message)}
        </span>
        <input
          {...register("passwordConfirm", {
            required: "Password Confirm is required",
            minLength: 5,
          })}
          placeholder="Password Confirm"
        />
        <span>
          {errors?.passwordConfirm?.message &&
            String(errors.passwordConfirm.message)}
        </span>
        <button>Add</button>
        {errors?.extraError?.message && String(errors.extraError.message)}
      </Form>
    </div>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 10px;
`;

export default ToDoList;
