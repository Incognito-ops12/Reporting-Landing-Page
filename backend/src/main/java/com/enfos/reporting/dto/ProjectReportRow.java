package com.enfos.reporting.dto;

import com.enfos.reporting.model.ProjectStatus;

import java.time.LocalDate;

public record ProjectReportRow(
        String projectId,
        String projectName,
        String department,
        String owner,
        ProjectStatus status,
        LocalDate startDate,
        LocalDate endDate
) {
}
