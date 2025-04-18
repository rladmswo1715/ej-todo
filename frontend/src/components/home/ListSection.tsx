import { List } from "antd";
import TodoItem from "./TodoItem";

const TEST_DATA = [
  { id: 1, title: "투두1", completed: false },
  { id: 2, title: "투두2", completed: true },
  { id: 3, title: "투두3", completed: false },
];

const ListSection = () => {
  const toggleHandler = () => {
    console.log("투두 토글");
  };

  const deleteHandler = () => {
    console.log("투두 삭제");
  };

  const updateHandler = () => {
    console.log("투두 업데이트");
  };

  return (
    <List
      className="mt-4"
      bordered
      dataSource={TEST_DATA}
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
  );
};

export default ListSection;
