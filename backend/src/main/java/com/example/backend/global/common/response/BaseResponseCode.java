package com.example.backend.global.common.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BaseResponseCode {

    // todo 1100~
    TODO_CREATED(true, 1101, "할일 생성 성공", HttpStatus.CREATED),
    TODO_LIST_FETCHED(true, 1102, "할일 목록 조회 성공", HttpStatus.OK),
    TODO_FETCHED(true, 1103, "할일 조회 성공", HttpStatus.OK),
    TODO_TOGGLED(true, 1104, "할일 토글 성공", HttpStatus.OK),
    TODO_UPDATED(true, 1105, "할일 수정 성공", HttpStatus.OK),
    TODO_DELETED(true, 1106, "할일 삭제 성공", HttpStatus.OK),

    // todo 4100~
    TODO_NOT_FOUND(false, 4101, "할일 조회 실패", HttpStatus.NOT_FOUND),
    INVALID_TODO_INPUT(false, 4102, "입력값이 잘못되었습니다.", HttpStatus.BAD_REQUEST),

    INTERNAL_ERROR(false, 5000, "서버 오류", HttpStatus.INTERNAL_SERVER_ERROR);

    private final boolean status;
    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    BaseResponseCode(boolean status, int code, String message, HttpStatus httpStatus) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
