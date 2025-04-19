import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../constants/api";
import { TTodo } from "../../types/response/Todo";

const fetchTodos = async (): Promise<TTodo[]> => {
  const response = await fetch(`${API_URL}/api/todos`);
  const result = await response.json();

  if (!response.ok || !result.success) {
    const message = result.message || "할 일 조회 실패";
    throw new Error(message);
  }

  return result.data;
};

export const useFetchTodos = () => {
  return useQuery<TTodo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => [...data].sort((a, b) => a.order - b.order),
  });
};
