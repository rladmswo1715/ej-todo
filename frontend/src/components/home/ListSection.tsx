import { List } from "antd";
import TodoItem from "./TodoItem";
import { useFetchTodos } from "../../hooks/queries/useFetchTodos";
import Spinner from "../shared/Spinner";
import { useTodoMutations } from "../../hooks/queries/mutate/useTodoMutations";

const ListSection = () => {
  const { data, isLoading, isError } = useFetchTodos();
  const { toggleMutation, deleteMutation, updateMutation } = useTodoMutations();

  const toggleHandler = (id: number) => {
    toggleMutation.mutate(id);
  };

  const deleteHandler = (id: number) => {
    deleteMutation.mutate(id);
  };

  const updateHandler = (id: number, title: string, onSuccess?: () => void) => {
    updateMutation.mutate(
      { id, title },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>할 일을 불러오는데 실패했어요.</div>;
  }

  return (
    <>
      {data && data.length > 0 ? (
        <List
          className="mt-4"
          bordered
          dataSource={data}
          renderItem={(todo) => (
            <List.Item>
              <TodoItem
                todo={todo}
                onToggle={toggleHandler}
                onDelete={deleteHandler}
                onUpdate={updateHandler}
              />
            </List.Item>
          )}
        />
      ) : (
        <div className="mt-4 w-full h-[16rem] flex justify-center items-center border border-black/30 rounded-lg">
          <span className="text-black/30">등록된 할 일이 없어요.</span>
        </div>
      )}
    </>
  );
};

export default ListSection;
