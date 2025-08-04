package com.qrproject.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerDetailDto {
    private String wall;
    private String structureColumn;
    private String slab;
}
