package com.enfos.reporting.dto;

import com.enfos.reporting.model.ProjectStatus;
import com.enfos.reporting.model.UserStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;

import java.time.Instant;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@JsonTest
class ReportDtoSerializationTests {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void serializesReportMetadataContract() throws JsonProcessingException {
        var metadata = new ReportMetadata(
                "users",
                "Users",
                "People in the system",
                Instant.parse("2026-08-11T14:30:00Z"),
                15
        );

        JsonNode json = objectMapper.valueToTree(metadata);

        assertThat(json.fieldNames()).toIterable()
                .containsExactly("id", "name", "description", "lastUpdated", "rowCount");
        assertThat(json.get("lastUpdated").asText()).isEqualTo("2026-08-11T14:30:00Z");
    }

    @Test
    void serializesUserReportRowContract() {
        var user = new UserReportRow(
                "USR-1001",
                "Maya Thompson",
                "maya.thompson@example.test",
                "Program Manager",
                UserStatus.ACTIVE,
                LocalDate.of(2023, 2, 14)
        );

        JsonNode json = objectMapper.valueToTree(user);

        assertThat(json.fieldNames()).toIterable()
                .containsExactly("userId", "name", "email", "role", "status", "createdDate");
        assertThat(json.get("status").asText()).isEqualTo("ACTIVE");
        assertThat(json.get("createdDate").asText()).isEqualTo("2023-02-14");
    }

    @Test
    void serializesDepartmentReportRowContract() {
        var department = new DepartmentReportRow(
                "DEP-101",
                "Environmental Operations",
                "Jordan Lee",
                24,
                "Chicago, IL"
        );

        JsonNode json = objectMapper.valueToTree(department);

        assertThat(json.fieldNames()).toIterable()
                .containsExactly("departmentId", "departmentName", "manager", "employeeCount", "location");
    }

    @Test
    void serializesProjectReportRowContractAndAllowsMissingEndDate() {
        var project = new ProjectReportRow(
                "PRJ-2001",
                "North Basin Remediation",
                "Environmental Operations",
                "Elena Garcia",
                ProjectStatus.ACTIVE,
                LocalDate.of(2025, 4, 7),
                null
        );

        JsonNode json = objectMapper.valueToTree(project);

        assertThat(json.fieldNames()).toIterable().containsExactly(
                "projectId", "projectName", "department", "owner", "status", "startDate", "endDate"
        );
        assertThat(json.get("status").asText()).isEqualTo("ACTIVE");
        assertThat(json.get("startDate").asText()).isEqualTo("2025-04-07");
        assertThat(json.get("endDate").isNull()).isTrue();
    }
}
