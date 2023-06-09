import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteATodo,
  editeTodoToPage,
  getAllTodos,
  likeAtodo,
  setCurrentPage,
} from "../redux/features/todosSlice";
import AddTodo from "../AddTodo";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Pagination from "../pagination/Pagination";

const Home = () => {
  const [editeOn, setEditeOn] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    todo: "",
  };

  const [todoforms, setTodoForm] = useState(initialState);
  const [singleTodo, setSingleTodo] = useState("");
  const { todo } = todoforms;
  const dispatch = useDispatch();
  const { todos, loading, currentPage } = useSelector((state) => ({
    ...state.todo,
  }));

  useEffect(() => {
    dispatch(getAllTodos(currentPage));
  }, [currentPage]);

  const deleteBTn = (itemes) => {
    if (todos.length === 1) {
      dispatch(setCurrentPage(currentPage - 1));
      dispatch(deleteATodo({ id: itemes._id, toast }));
    }
    dispatch(deleteATodo({ id: itemes._id, toast }));
  };

  const editeTodoBTn = (itemes) => {
    dispatch(editeTodoToPage(itemes));
    setEditeOn(true);
    setTodoForm({ todo: itemes.todo });
    setSingleTodo(itemes._id);
  };
  //   console.log(singleTodo);
  const displayTodos =
    todos &&
    todos.map((itemes, id) => {
      return (
        <div
          className="bg-white p-2 w-full flex justify-between items-center pl-5 rounded-md"
          key={id}
        >
          <h2
            className="max-w-[80%] overflow-auto break-words"
            onClick={() => navigate(`/details/${itemes._id}`)}
          >
            {`${id + 1}.) `} {itemes.todo}
          </h2>{" "}
          <div className="flex justify-center items-center gap-3">
            {itemes?.like ? (
              <AiFillLike
                size={"25px"}
                onClick={() =>
                  dispatch(likeAtodo({ id: itemes._id, like: false, toast }))
                }
              />
            ) : (
              <AiOutlineLike
                size={"25px"}
                onClick={() =>
                  dispatch(likeAtodo({ id: itemes._id, like: true, toast }))
                }
              />
            )}

            <AiFillDelete size={"25px"} onClick={() => deleteBTn(itemes)} />
            <BsFillPenFill onClick={() => editeTodoBTn(itemes)} size={"25px"} />
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="flex justify-center pt-16 flex-col items-center">
        <div className="bg-violet-300 p-2 w-[95%] md:w-[70%] rounded-md mt-10 flex flex-col gap-5">
          <div className="">
            <AddTodo
              singleTodo={singleTodo}
              todo={todo}
              todoforms={todoforms}
              setTodoForm={setTodoForm}
              editeOn={editeOn}
              setEditeOn={setEditeOn}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            {displayTodos}
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;
