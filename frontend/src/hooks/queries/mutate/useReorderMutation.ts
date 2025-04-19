import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../constants/api";
import toast from "react-hot-toast";

const reorderTodos = async (orderedIds: number[]) => {
  const res = await fetch(`${API_URL}/api/todos/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderedIds),
  });

  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

export const useReorderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("순서 저장에 실패했어요.");
    },
  });
};
