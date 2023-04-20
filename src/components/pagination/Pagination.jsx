import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/features/todosSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { numberOfPages, itemesPerPAge, totalTodo, currentPage } = useSelector(
    (state) => ({
      ...state.todo,
    })
  );

  let pages = [];

  // console.log(totalTodo);

  for (let i = 1; i <= Math.ceil(totalTodo / itemesPerPAge); i++) {
    pages.push(i);
  }

  const displayPages = pages?.map((item, id) => {
    return (
      <li
        onClick={() => dispatch(setCurrentPage(item))}
        key={id}
        className={`${
          item === currentPage
            ? "bg-white text-violet-600 underline"
            : "bg-violet-600 text-white"
        } p-2 rounded-lg text-center border-[2px] border-white`}
      >
        {item}
      </li>
    );
  });

  return (
    <ul className="flex my-5 justify-center items-center gap-2">
      {displayPages}
    </ul>
  );
};

export default Pagination;
