import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getASingleTodo } from "../redux/features/todosSlice";
import Loader from "../Loader";

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleTodo, loading } = useSelector((state) => ({ ...state.todo }));

  useEffect(() => {
    if (id) {
      dispatch(getASingleTodo(id));
    }
  }, [id]);

  return (
    <>
      <div className="flex justify-center py-20 flex-col items-center">
        <h1 className="mt-5 text-3xl border-b-[5px] border-b-violet-600 px-3">
          Todo Details
        </h1>
        <div className="bg-violet-300 p-2 w-[95%] md:w-[70%] rounded-md mt-10 flex flex-col gap-5">
          <div className="bg-white p-2 w-full flex gap-4 flex-col items-center pl-5 rounded-md">
            {loading ? null : (
              <>
                <h1 className="text-xl overflow-auto break-words max-w-[100%]">
                  {singleTodo.todo}
                </h1>
                <h3 className="text-slate-500">
                  Added On {":"} {singleTodo.added_on}
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
