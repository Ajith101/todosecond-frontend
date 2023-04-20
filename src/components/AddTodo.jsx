import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addATodo, editeATodo, getAllTodos } from "./redux/features/todosSlice";
import { toast } from "react-toastify";

const AddTodo = ({ setEditeOn, editeOn, todo, todoforms, setTodoForm }) => {
  const dispatch = useDispatch();
  const { editeTodo, currentPage } = useSelector((state) => ({
    ...state?.todo,
  }));

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
              setTodoForm,
            })
          )
        : dispatch(addATodo({ todoforms, toast, setTodoForm }));
      // setTodoForm({ todo: "" });
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

  // useEffect(() => {
  //   dispatch(getAllTodos(currentPage));
  // }, []);

  return (
    <>
      <h1>{editeOn ? "Edite Todo" : "Add Todo"}</h1>
      <div className="flex gap-4 w-full">
        <input
          className="p-2 rounded-sm border-[2px] md:mr-2 w-[60%] flex justify-between md:flex-none md:w-[70%]"
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
      </div>
    </>
  );
};

export default AddTodo;
