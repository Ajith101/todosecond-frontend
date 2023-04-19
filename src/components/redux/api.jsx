import axios from "axios";

const API = axios.create({ baseURL: "https://todo-second.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:3040" });

export const getTodos = () => API.get("/todos");
export const getSingleTodo = (id) => API.get(`/todos/single/${id}`);
export const createTodo = (todoforms) => API.post(`/todos/`, todoforms);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const editeTodo = (id, todoforms) =>
  API.patch(`/todos/${id}`, todoforms);
export const likeTodo = (id, like) =>
  API.patch(`/todos/like/${id}`, { like: like });
