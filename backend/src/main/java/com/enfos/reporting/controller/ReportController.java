package com.enfos.reporting.controller;

import com.enfos.reporting.dto.DepartmentReportRow;
import com.enfos.reporting.dto.ProjectReportRow;
import com.enfos.reporting.dto.ReportMetadata;
import com.enfos.reporting.dto.UserReportRow;
import com.enfos.reporting.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportMetadata> getReports() {
        return reportService.getReports();
    }

    @GetMapping("/users")
    public List<UserReportRow> getUsersReport() {
        return reportService.getUsersReport();
    }

    @GetMapping("/departments")
    public List<DepartmentReportRow> getDepartmentsReport() {
        return reportService.getDepartmentsReport();
    }

    @GetMapping("/projects")
    public List<ProjectReportRow> getProjectsReport() {
        return reportService.getProjectsReport();
    }
}
