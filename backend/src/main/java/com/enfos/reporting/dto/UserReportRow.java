package com.enfos.reporting.dto;

import com.enfos.reporting.model.UserStatus;

import java.time.LocalDate;

public record UserReportRow(
        String userId,
        String name,
        String email,
        String role,
        UserStatus status,
        LocalDate createdDate
) {
}
