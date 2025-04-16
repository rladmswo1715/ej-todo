package com.example.backend.global.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(force = true)
@Schema(description = "응답 포맷")
public class BaseResponse<T> {

    @Schema(description = "요청 성공 여부")
    private final boolean success;

    @Schema(description = "HTTP 상태 코드")
    private final int status;

    @Schema(description = "비즈니스 응답 코드")
    private final int code;

    @Schema(description = "응답 메시지")
    private final String message;

    @Schema(description = "응답 데이터 (성공 시)")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T data;

    public BaseResponse(BaseResponseCode code) {
        this.success = false;
        this.status = code.getHttpStatus().value();
        this.code = code.getCode();
        this.message = code.getMessage();
        this.data = null;
    }

    public BaseResponse(BaseResponseCode code, T data) {
        this.success = true;
        this.status = code.getHttpStatus().value();
        this.code = code.getCode();
        this.message = code.getMessage();
        this.data = data;
    }
}