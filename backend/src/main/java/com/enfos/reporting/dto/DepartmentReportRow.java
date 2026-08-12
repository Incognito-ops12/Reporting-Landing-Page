package com.enfos.reporting.dto;

public record DepartmentReportRow(
        String departmentId,
        String departmentName,
        String manager,
        int employeeCount,
        String location
) {
}
