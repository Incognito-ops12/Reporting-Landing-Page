package com.enfos.reporting.service;

import com.enfos.reporting.dto.DepartmentReportRow;
import com.enfos.reporting.dto.ProjectReportRow;
import com.enfos.reporting.dto.ReportMetadata;
import com.enfos.reporting.dto.UserReportRow;
import com.enfos.reporting.repository.InMemoryReportDataProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ReportServiceTests {

    private InMemoryReportDataProvider dataProvider;
    private ReportService reportService;

    @BeforeEach
    void setUp() {
        dataProvider = mock(InMemoryReportDataProvider.class);
        reportService = new ReportService(dataProvider);
    }

    @Test
    void returnsReportMetadataFromDataProvider() {
        List<ReportMetadata> expected = List.of();
        when(dataProvider.findAllReports()).thenReturn(expected);

        assertThat(reportService.getReports()).isSameAs(expected);
        verify(dataProvider).findAllReports();
    }

    @Test
    void returnsUsersFromDataProvider() {
        List<UserReportRow> expected = List.of();
        when(dataProvider.findAllUsers()).thenReturn(expected);

        assertThat(reportService.getUsersReport()).isSameAs(expected);
        verify(dataProvider).findAllUsers();
    }

    @Test
    void returnsDepartmentsFromDataProvider() {
        List<DepartmentReportRow> expected = List.of();
        when(dataProvider.findAllDepartments()).thenReturn(expected);

        assertThat(reportService.getDepartmentsReport()).isSameAs(expected);
        verify(dataProvider).findAllDepartments();
    }

    @Test
    void returnsProjectsFromDataProvider() {
        List<ProjectReportRow> expected = List.of();
        when(dataProvider.findAllProjects()).thenReturn(expected);

        assertThat(reportService.getProjectsReport()).isSameAs(expected);
        verify(dataProvider).findAllProjects();
    }
}
