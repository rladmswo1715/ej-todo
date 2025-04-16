package com.example.backend.global.common.exception;

import com.example.backend.global.common.response.BaseResponse;
import com.example.backend.global.common.response.BaseResponseCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<BaseResponse<Void>> handleCustomException(CustomException e) {
        BaseResponseCode code = e.getBaseResponseCode();

        return ResponseEntity
                .status(code.getHttpStatus())
                .body(new BaseResponse<>(code));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<Void>> handleUnhandledException(Exception e) {
        e.printStackTrace();

        BaseResponseCode code = BaseResponseCode.INTERNAL_ERROR;

        return ResponseEntity
                .status(code.getHttpStatus())
                .body(new BaseResponse<>(code));
    }
}
