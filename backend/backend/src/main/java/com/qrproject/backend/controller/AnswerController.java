package com.qrproject.backend.controller;

import com.qrproject.backend.dto.AnswerDetailDto;
import com.qrproject.backend.dto.AnswerSummaryDto;
import com.qrproject.backend.entity.Answer;
import com.qrproject.backend.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerRepository answerRepository;

    // ✅ 글 저장
    @PostMapping
    public ResponseEntity<Answer> save(@RequestBody Answer answer) {
        return ResponseEntity.ok(answerRepository.save(answer));
    }


    @GetMapping("/{id}/detail")
    public ResponseEntity<AnswerDetailDto> getDetailById(@PathVariable Long id) {
        return answerRepository.findById(id)
                .map(answer -> new AnswerDetailDto(
                        answer.getWall(),
                        answer.getStructureColumn(),
                        answer.getSlab()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summaries")
    public ResponseEntity<List<AnswerSummaryDto>> getAllSummaries() {
        List<AnswerSummaryDto> summaries = answerRepository.findAll()
                .stream()
                .map(answer -> new AnswerSummaryDto(answer.getId(), answer.getKeyword()))
                .toList();

        return ResponseEntity.ok(summaries);
    }


    // ✅ 글 개수 반환
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> count() {
        long count = answerRepository.count();
        return ResponseEntity.ok(Map.of("count", count));
    }
}
