import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Popconfirm, Tag } from "antd";
import type { InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { TTodo } from "../../types/response/Todo";
import toast from "react-hot-toast";

interface TodoItemProps {
  todo: TTodo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, onSuccess?: () => void) => void;
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
    if (!editValue.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    onUpdate(todo.id, editValue.trim(), () => {
      setIsEditing(false);
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center gap-2 w-full">
      <div onPointerDown={(e) => e.stopPropagation()}>
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          disabled={isEditing}
        />
      </div>

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
            onPointerDown={(e) => e.stopPropagation()}
            maxLength={25}
            className="flex-1"
          />
          <Button
            type="text"
            icon={<CheckOutlined style={{ color: "#52c41a", fontSize: 16 }} />}
            onClick={submitEdit}
            onPointerDown={(e) => e.stopPropagation()}
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
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={startEdit}
          onPointerDown={(e) => e.stopPropagation()}
        />
      )}
      {todo.completed && <Tag color="blue">완료</Tag>}
      <div onPointerDown={(e) => e.stopPropagation()}>
        <Popconfirm
          title="삭제하시겠습니까?"
          onConfirm={() => onDelete(todo.id)}
          okText="네"
          cancelText="아니요"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    </div>
  );
};

export default TodoItem;
