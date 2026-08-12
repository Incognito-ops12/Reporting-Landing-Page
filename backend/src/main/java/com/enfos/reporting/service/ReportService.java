package com.enfos.reporting.service;

import com.enfos.reporting.dto.DepartmentReportRow;
import com.enfos.reporting.dto.ProjectReportRow;
import com.enfos.reporting.dto.ReportMetadata;
import com.enfos.reporting.dto.UserReportRow;
import com.enfos.reporting.repository.InMemoryReportDataProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final InMemoryReportDataProvider dataProvider;

    public ReportService(InMemoryReportDataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public List<ReportMetadata> getReports() {
        return dataProvider.findAllReports();
    }

    public List<UserReportRow> getUsersReport() {
        return dataProvider.findAllUsers();
    }

    public List<DepartmentReportRow> getDepartmentsReport() {
        return dataProvider.findAllDepartments();
    }

    public List<ProjectReportRow> getProjectsReport() {
        return dataProvider.findAllProjects();
    }
}
