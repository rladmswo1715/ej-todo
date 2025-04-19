package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.AddTodoReq;
import com.example.backend.domain.todo.dto.TodoRes;
import com.example.backend.domain.todo.dto.UpdateTodoReq;
import com.example.backend.domain.todo.service.TodoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TodoService todoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("할 일 전체 조회 API - 200 OK")
    void getTodos_success() throws Exception {
        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("할 일 생성 API - 201 Created")
    void createTodo_success() throws Exception {
        AddTodoReq req = new AddTodoReq("테스트코드 추가");

        TodoRes mockRes = TodoRes.builder()
                .id(1L)
                .title("테스트코드 추가")
                .completed(false)
                .createdAt(LocalDateTime.now())
                .build();

        given(todoService.create(any())).willReturn(mockRes);

        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("테스트코드 추가"));
    }

    @Test
    @DisplayName("할 일 수정 API - 200 OK")
    void updateTodo_success() throws Exception {
        Long todoId = 1L;

        UpdateTodoReq req = new UpdateTodoReq("할일 수정");

        TodoRes updatedRes = TodoRes.builder()
                .id(todoId)
                .title("할일 수정")
                .completed(false)
                .createdAt(LocalDateTime.now())
                .build();

        given(todoService.update(any(), any())).willReturn(updatedRes);

        mockMvc.perform(put("/api/todos/{id}", todoId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("할일 수정"));
    }

    @Test
    @DisplayName("할 일 삭제 API - 200 OK")
    void deleteTodo_success() throws Exception {
        Long todoId = 1L;

        mockMvc.perform(delete("/api/todos/{id}", todoId))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("할 일 완료 상태 토글 API - 200 OK")
    void toggleTodo_success() throws Exception {
        Long todoId = 1L;

        TodoRes toggled = TodoRes.builder()
                .id(todoId)
                .title("할 일 제목")
                .completed(true)
                .createdAt(LocalDateTime.now())
                .completedAt(LocalDateTime.now())
                .build();

        given(todoService.toggle(any())).willReturn(toggled);

        mockMvc.perform(patch("/api/todos/{id}/toggle", todoId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.completed").value(true));
    }

    @Test
    @DisplayName("할 일 순서 재정렬 API - 200 OK")
    void reorderTodos_success() throws Exception {
        List<Long> orderIds = List.of(3L, 1L, 2L);

        mockMvc.perform(patch("/api/todos/reorder")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderIds)))
                .andExpect(status().isOk());
    }
}
