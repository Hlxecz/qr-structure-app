package com.qrproject.backend.repository;

import com.qrproject.backend.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // 기본 제공: save(), findAll(), count(), findById() 등
    List<Answer> findByKeyword(String keyword);
}
