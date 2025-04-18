import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Popconfirm, Tag } from "antd";
import type { InputRef } from "antd";
import { useEffect, useRef, useState } from "react";

interface TodoItemProps {
  todo: any;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<InputRef | null>(null);

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const submitEdit = () => {
    if (!editValue.trim()) return;
    onUpdate();
    setIsEditing(false);
    console.log("수정 완료");
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center gap-2 w-full">
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle()}
        disabled={isEditing}
      />

      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onPressEnter={submitEdit}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                cancelEdit();
              }
            }}
            className="flex-1"
          />
          <Button
            type="text"
            icon={<CheckOutlined style={{ color: "#52c41a", fontSize: 16 }} />}
            onClick={submitEdit}
            size="small"
          />
        </div>
      ) : (
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.title}
        </span>
      )}

      {!todo.completed && !isEditing && (
        <Button type="link" icon={<EditOutlined />} onClick={startEdit} />
      )}
      {todo.completed && <Tag color="blue">완료</Tag>}
      <Popconfirm
        title="삭제하시겠습니까?"
        onConfirm={() => onDelete()}
        okText="네"
        cancelText="아니요"
      >
        <Button type="text" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </div>
  );
};

export default TodoItem;
