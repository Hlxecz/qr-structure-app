package com.qrproject.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerSummaryDto {
    private Long id;
    private String keyword;
    private String wall;
    private String structureColumn;
    private String slab;
}
