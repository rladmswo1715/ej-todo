package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.UpdateTodoReq;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.dto.AddTodoReq;
import com.example.backend.domain.todo.dto.TodoRes;
import com.example.backend.domain.todo.repository.TodoRepository;
import com.example.backend.global.common.exception.CustomException;
import com.example.backend.global.common.response.BaseResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public List<TodoRes> findAll() {
        return todoRepository.findAll().stream()
                .map(this::toTodoRes)
                .collect(Collectors.toList());
    }

    public TodoRes findById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new CustomException(BaseResponseCode.TODO_NOT_FOUND));
        return toTodoRes(todo);
    }

    public TodoRes create(AddTodoReq req) {
        Integer maxOrder = todoRepository.findMaxOrder().orElse(0);

        Todo todo = new Todo();
        todo.setTitle(req.getTitle());
        todo.setOrder(maxOrder + 1);

        Todo saved = todoRepository.save(todo);
        return toTodoRes(saved);
    }

    public TodoRes toggle(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new CustomException(BaseResponseCode.TODO_NOT_FOUND));
        todo.toggleCompleted();
        return toTodoRes(todoRepository.save(todo));
    }

    public TodoRes update(Long id, UpdateTodoReq req) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new CustomException(BaseResponseCode.TODO_NOT_FOUND));

        todo.setTitle(req.getTitle());
        Todo updated = todoRepository.save(todo);
        return toTodoRes(updated);
    }

    public void delete(Long id) {
        todoRepository.deleteById(id);
    }

    private TodoRes toTodoRes(Todo todo) {
        return TodoRes.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .completedAt(todo.getCompletedAt())
                .order(todo.getOrder())
                .build();
    }

    public void reorder(List<Long> orderedIds) {
        List<Todo> todosToSave = new ArrayList<>();
        for (int i = 0; i < orderedIds.size(); i++) {
            Todo todo = todoRepository.findById(orderedIds.get(i))
                    .orElseThrow(() -> new CustomException(BaseResponseCode.TODO_NOT_FOUND));
            todo.setOrder(i);
            todosToSave.add(todo);
        }
        todoRepository.saveAll(todosToSave);
    }
}
