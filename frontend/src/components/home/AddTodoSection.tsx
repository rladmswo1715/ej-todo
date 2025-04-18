import { Input, Button, Space } from "antd";
import { useState } from "react";

const AddTodoSection = () => {
  const [todoValue, setTodoValue] = useState("");

  const addTodoHandler = () => {
    if (!todoValue.trim()) return;

    console.log("할일 등록");
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
