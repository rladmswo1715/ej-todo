import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../constants/api";
import { TTodo } from "../../../types/response/Todo";
import toast from "react-hot-toast";

const addTodo = async (title: string) => {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

const patchToggleTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/api/todos/${id}/toggle`, {
    method: "PATCH",
  });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "할 일 토글 실패");
  }

  return result.data;
};

const deleteTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

const updateTodo = async ({ id, title }: { id: number; title: string }) => {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("등록 성공!");
    },
    onError: (error) => {
      console.error(error.message || "할 일 등록 실패");
      toast.error("등록에 실패했어요..");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: patchToggleTodo,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<TTodo[] | undefined>([
        "todos",
      ]);

      queryClient.setQueryData<TTodo[]>(["todos"], (oldTodos = []) =>
        oldTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("삭제 성공!");
    },
    onError: (error) => {
      console.error(error.message || "할 일 삭제 실패");
      toast.error("삭제에 실패했어요..");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("수정 성공!");
    },
    onError: (error) => {
      console.error(error.message || "할 일 수정 실패");
      toast.error("수정에 실패했어요..");
    },
  });

  return { addMutation, toggleMutation, deleteMutation, updateMutation };
};
