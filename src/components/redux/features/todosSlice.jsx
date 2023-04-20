import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTodos(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addATodo = createAsyncThunk(
  "todo/addATodo",
  async ({ todoforms, toast, setTodoForm }, { rejectWithValue }) => {
    try {
      const response = api.createTodo(todoforms);

      return (await response).data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteATodo = createAsyncThunk(
  "todo/deleteATodo",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = api.deleteTodo(id);

      return (await response).data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const edtingFunction = (id, form) => {
  console.log(id);
  console.log(form);
};

export const editeATodo = createAsyncThunk(
  "todo/editeATodo",
  async (
    { id, todoforms, setEditeOn, toast, setTodoForm },
    { rejectWithValue }
  ) => {
    try {
      const response = api.editeTodo(id, todoforms);

      return (await response).data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const likeAtodo = createAsyncThunk(
  "todo/likeAtodo",
  async ({ id, like, toast }, { rejectWithValue }) => {
    try {
      const response = api.likeTodo(id, like);

      return (await response).data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getASingleTodo = createAsyncThunk(
  "todo/getASingleTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = api.getSingleTodo(id);
      return (await response).data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const Todos = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todos: [],
    error: "",
    editeOnorOFf: false,
    editeTodo: [],
    singleTodo: [],
    currentPage: 1,
    numberOfPages: null,
    itemesPerPAge: null,
    totalTodo: null,
  },
  reducers: {
    editeTodoToPage: (state, action) => {
      state.editeTodo = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
        state.itemesPerPAge = action.payload.limit;
        state.totalTodo = action.payload.totalTodos;
        state.loading = false;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addATodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addATodo.fulfilled, (state, action) => {
        const { toast, setTodoForm } = action.meta.arg;
        state.loading = false;
        if (state.todos.length !== 6) {
          state.todos = [...state.todos, action.payload.todo];
        }
        state.totalTodo = action.payload.totalTodos;
        toast.success("Added Succesfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
        setTodoForm({ todo: "" });
      })
      .addCase(addATodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteATodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteATodo.fulfilled, (state, action) => {
        const { id, toast } = action.meta.arg;
        state.loading = false;
        state.todos = state.todos.filter((item) => item._id !== id);
        toast.success("Todo deleted", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.totalTodo = action.payload.totalTodo;
      })
      .addCase(deleteATodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editeATodo.pending, (state, action) => {
        state.loading = true;
        state.editeOnorOFf = true;
      })
      .addCase(editeATodo.fulfilled, (state, action) => {
        state.loading = false;
        const { arg } = action.meta;
        const { id, toast, setTodoForm, setEditeOn } = arg;

        if (id) {
          const newLIst = [...state.todos];
          newLIst.forEach((itemes) => {
            if (itemes._id === id) {
              itemes.todo = action.payload.todo;
            }
          });
          state.todos = newLIst;
        }
        toast.success("Updated succesfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTodoForm({ todo: "" });
        setEditeOn(false);
      })
      .addCase(editeATodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeAtodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likeAtodo.fulfilled, (state, action) => {
        state.loading = false;
        const { id, like, toast } = action.meta.arg;

        if (id) {
          const newLIst = [...state.todos];
          newLIst.forEach((itemes) => {
            if (itemes._id === id) {
              itemes.like = like;
            }
          });
          state.todos = newLIst;
        }
        toast.success(`You ${like ? "You LIked" : "Unliked"}`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(likeAtodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getASingleTodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getASingleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTodo = action.payload;
      })
      .addCase(getASingleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Todos.reducer;

export const { editeTodoToPage, setCurrentPage } = Todos.actions;
