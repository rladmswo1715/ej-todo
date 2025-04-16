package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.AddTodoReq;
import com.example.backend.domain.todo.dto.TodoRes;
import com.example.backend.domain.todo.dto.UpdateTodoReq;
import com.example.backend.domain.todo.service.TodoService;
import com.example.backend.global.common.response.BaseResponse;
import com.example.backend.global.common.response.BaseResponseCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public BaseResponse<List<TodoRes>> findAll() {
        List<TodoRes> todos = todoService.findAll();
        return new BaseResponse<>(BaseResponseCode.TODO_LIST_FETCHED, todos);

    }

    @GetMapping("/{id}")
    public BaseResponse<TodoRes> findById(@PathVariable Long id) {
        TodoRes todo = todoService.findById(id);
        return new BaseResponse<>(BaseResponseCode.TODO_FETCHED, todo);
    }

    @PostMapping
    public BaseResponse<TodoRes> create(@RequestBody @Valid AddTodoReq req) {
        TodoRes todo = todoService.create(req);
        return new BaseResponse<>(BaseResponseCode.TODO_CREATED, todo);
    }

    @PatchMapping("/{id}/toggle")
    public BaseResponse<TodoRes> toggle(@PathVariable Long id) {
        TodoRes todo = todoService.toggle(id);
        return new BaseResponse<>(BaseResponseCode.TODO_TOGGLED, todo);
    }

    @PutMapping("/{id}")
    public BaseResponse<TodoRes> update(
            @PathVariable Long id,
            @RequestBody @Valid UpdateTodoReq req
    ) {
        TodoRes todo = todoService.update(id, req);
        return new BaseResponse<>(BaseResponseCode.TODO_UPDATED, todo);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<Void> delete(@PathVariable Long id) {
        todoService.delete(id);
        return new BaseResponse<>(BaseResponseCode.TODO_DELETED);
    }
}
