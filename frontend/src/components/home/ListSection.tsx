import { List } from "antd";
import TodoItem from "./TodoItem";
import { useFetchTodos } from "../../hooks/queries/useFetchTodos";
import Spinner from "../shared/Spinner";
import { useTodoMutations } from "../../hooks/queries/mutate/useTodoMutations";
import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TTodo } from "../../types/response/Todo";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useReorderMutation } from "../../hooks/queries/mutate/useReorderMutation";

const ListSection = () => {
  const { data, isLoading, isError } = useFetchTodos();
  const { toggleMutation, deleteMutation, updateMutation } = useTodoMutations();
  const reorderMutation = useReorderMutation();
  const [todos, setTodos] = useState<TTodo[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (data) setTodos(data);
  }, [data]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      setTodos(newTodos);

      reorderMutation.mutate(newTodos.map((todo) => todo.id));
    }
  };

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
      {todos.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <List className="mt-4" bordered>
              {todos.map((todo) => (
                <SortableItem key={todo.id} todo={todo}>
                  <List.Item>
                    <TodoItem
                      todo={todo}
                      onToggle={toggleHandler}
                      onDelete={deleteHandler}
                      onUpdate={updateHandler}
                    />
                  </List.Item>
                </SortableItem>
              ))}
            </List>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="mt-4 w-full h-[16rem] flex justify-center items-center border border-black/30 rounded-lg">
          <span className="text-black/30">등록된 할 일이 없어요.</span>
        </div>
      )}
    </>
  );
};

export default ListSection;
