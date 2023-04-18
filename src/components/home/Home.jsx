import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteATodo,
  editeTodoToPage,
  getAllTodos,
  likeAtodo,
} from "../redux/features/todosSlice";
import AddTodo from "../AddTodo";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

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
  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const { todos, loading } = useSelector((state) => ({ ...state.todo }));

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
          <h2 onClick={() => navigate(`/details/${itemes._id}`)}>
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

            <AiFillDelete
              size={"25px"}
              onClick={() => dispatch(deleteATodo({ id: itemes._id, toast }))}
            />
            <BsFillPenFill onClick={() => editeTodoBTn(itemes)} size={"25px"} />
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="flex justify-center flex-col items-center">
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
            {loading ? <Loader /> : null}
            {displayTodos}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
