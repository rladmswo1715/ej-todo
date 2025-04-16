package com.example.backend.global.common.exception;

import com.example.backend.global.common.response.BaseResponseCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private final BaseResponseCode baseResponseCode;

    public CustomException(BaseResponseCode baseResponseCode) {
        super(baseResponseCode.getMessage());
        this.baseResponseCode = baseResponseCode;
    }
}
