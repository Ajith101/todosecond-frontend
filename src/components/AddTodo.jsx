import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addATodo, editeATodo } from "./redux/features/todosSlice";
import { toast } from "react-toastify";

const AddTodo = ({ setEditeOn, editeOn, todo, todoforms, setTodoForm }) => {
  const dispatch = useDispatch();
  const { editeTodo } = useSelector((state) => ({ ...state?.todo }));

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTodoForm({ ...todoforms, [name]: value });
  };

  const addOrEdite = () => {
    if (todoforms.todo && todoforms.todo !== editeTodo.todo) {
      editeOn
        ? dispatch(
            editeATodo({
              id: editeTodo?._id,
              todoforms: todoforms,
              setEditeOn,
              toast,
            })
          )
        : dispatch(addATodo({ todoforms, toast }));
      setTodoForm({ todo: "" });
    } else {
      if (todoforms.todo === editeTodo.todo) {
        toast.error("Same text nothing changes", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Add some Text", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return;
    }
  };

  return (
    <>
      <div>{editeOn ? "Edite Todo" : "Add Todo"}</div>
      <input
        className="p-2 rounded-sm border-[2px] mr-2"
        onChange={(e) => inputHandler(e)}
        name="todo"
        value={todo}
        type="text"
      />
      <button
        className="bg-yellow-500 text-white rounded-md p-3 text-center border-black"
        onClick={() => addOrEdite()}
      >
        {editeOn ? "Update" : "Add Todo"}
      </button>
    </>
  );
};

export default AddTodo;
