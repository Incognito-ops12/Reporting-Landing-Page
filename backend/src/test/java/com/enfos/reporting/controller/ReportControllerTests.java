package com.enfos.reporting.controller;

import com.enfos.reporting.dto.DepartmentReportRow;
import com.enfos.reporting.dto.ProjectReportRow;
import com.enfos.reporting.dto.ReportMetadata;
import com.enfos.reporting.dto.UserReportRow;
import com.enfos.reporting.model.ProjectStatus;
import com.enfos.reporting.model.UserStatus;
import com.enfos.reporting.service.ReportService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReportController.class)
class ReportControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReportService reportService;

    @Test
    void returnsReportMetadata() throws Exception {
        when(reportService.getReports()).thenReturn(List.of(
                new ReportMetadata(
                        "users",
                        "Users",
                        "People in the system",
                        Instant.parse("2026-08-11T14:30:00Z"),
                        15
                )
        ));

        mockMvc.perform(get("/api/reports"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value("users"))
                .andExpect(jsonPath("$[0].name").value("Users"))
                .andExpect(jsonPath("$[0].description").value("People in the system"))
                .andExpect(jsonPath("$[0].lastUpdated").value("2026-08-11T14:30:00Z"))
                .andExpect(jsonPath("$[0].rowCount").value(15));

        verify(reportService).getReports();
    }

    @Test
    void returnsUsersReport() throws Exception {
        when(reportService.getUsersReport()).thenReturn(List.of(
                new UserReportRow(
                        "USR-1001",
                        "Maya Thompson",
                        "maya.thompson@example.test",
                        "Program Manager",
                        UserStatus.ACTIVE,
                        LocalDate.of(2023, 2, 14)
                )
        ));

        mockMvc.perform(get("/api/reports/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].userId").value("USR-1001"))
                .andExpect(jsonPath("$[0].name").value("Maya Thompson"))
                .andExpect(jsonPath("$[0].email").value("maya.thompson@example.test"))
                .andExpect(jsonPath("$[0].role").value("Program Manager"))
                .andExpect(jsonPath("$[0].status").value("ACTIVE"))
                .andExpect(jsonPath("$[0].createdDate").value("2023-02-14"));

        verify(reportService).getUsersReport();
    }

    @Test
    void returnsDepartmentsReport() throws Exception {
        when(reportService.getDepartmentsReport()).thenReturn(List.of(
                new DepartmentReportRow(
                        "DEP-101",
                        "Environmental Operations",
                        "Jordan Lee",
                        24,
                        "Chicago, IL"
                )
        ));

        mockMvc.perform(get("/api/reports/departments"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].departmentId").value("DEP-101"))
                .andExpect(jsonPath("$[0].departmentName").value("Environmental Operations"))
                .andExpect(jsonPath("$[0].manager").value("Jordan Lee"))
                .andExpect(jsonPath("$[0].employeeCount").value(24))
                .andExpect(jsonPath("$[0].location").value("Chicago, IL"));

        verify(reportService).getDepartmentsReport();
    }

    @Test
    void returnsProjectsReport() throws Exception {
        when(reportService.getProjectsReport()).thenReturn(List.of(
                new ProjectReportRow(
                        "PRJ-2001",
                        "North Basin Remediation",
                        "Environmental Operations",
                        "Elena Garcia",
                        ProjectStatus.ACTIVE,
                        LocalDate.of(2025, 4, 7),
                        null
                )
        ));

        mockMvc.perform(get("/api/reports/projects"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].projectId").value("PRJ-2001"))
                .andExpect(jsonPath("$[0].projectName").value("North Basin Remediation"))
                .andExpect(jsonPath("$[0].department").value("Environmental Operations"))
                .andExpect(jsonPath("$[0].owner").value("Elena Garcia"))
                .andExpect(jsonPath("$[0].status").value("ACTIVE"))
                .andExpect(jsonPath("$[0].startDate").value("2025-04-07"))
                .andExpect(jsonPath("$[0].endDate").isEmpty());

        verify(reportService).getProjectsReport();
    }
}
