package com.qrproject.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerSummaryDto {
    private Long id;
    private String keyword;
}
