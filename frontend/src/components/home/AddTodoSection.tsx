import { Input, Button, Space } from "antd";
import { useState } from "react";
import { useTodoMutations } from "../../hooks/queries/mutate/useTodoMutations";
import toast from "react-hot-toast";

const AddTodoSection = () => {
  const [todoValue, setTodoValue] = useState("");
  const { addMutation } = useTodoMutations();

  const addTodoHandler = () => {
    if (!todoValue.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    addMutation.mutate(todoValue, {
      onSuccess: () => {
        setTodoValue("");
      },
    });
  };

  return (
    <section>
      <h1 className="mt-7 text-3xl font-bold">나의 할 일 목록</h1>

      <Space.Compact block className="mt-4 w-[80%]">
        <Input
          showCount
          placeholder="할 일을 입력하세요"
          value={todoValue}
          maxLength={25}
          onChange={(e) => setTodoValue(e.target.value)}
          onPressEnter={addTodoHandler}
        />
        <Button type="primary" onClick={addTodoHandler}>
          추가
        </Button>
      </Space.Compact>
    </section>
  );
};

export default AddTodoSection;
