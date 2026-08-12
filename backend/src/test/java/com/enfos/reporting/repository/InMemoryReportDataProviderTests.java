package com.enfos.reporting.repository;

import com.enfos.reporting.model.ProjectStatus;
import org.junit.jupiter.api.Test;

import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class InMemoryReportDataProviderTests {

    private final InMemoryReportDataProvider dataProvider = new InMemoryReportDataProvider();

    @Test
    void suppliesEveryReportWithMatchingRowCounts() {
        var reports = dataProvider.findAllReports();

        assertThat(reports).extracting("id")
                .containsExactly("users", "departments", "projects");
        assertThat(reports).extracting("rowCount")
                .containsExactly(
                        dataProvider.findAllUsers().size(),
                        dataProvider.findAllDepartments().size(),
                        dataProvider.findAllProjects().size()
                );
    }

    @Test
    void suppliesCredibleReportSizesAndUniqueIdentifiers() {
        assertThat(dataProvider.findAllUsers()).hasSizeBetween(10, 20);
        assertThat(dataProvider.findAllDepartments()).hasSize(8);
        assertThat(dataProvider.findAllProjects()).hasSize(12);

        assertThat(new HashSet<>(dataProvider.findAllUsers().stream().map(user -> user.userId()).toList()))
                .hasSameSizeAs(dataProvider.findAllUsers());
        assertThat(new HashSet<>(dataProvider.findAllDepartments().stream().map(department -> department.departmentId()).toList()))
                .hasSameSizeAs(dataProvider.findAllDepartments());
        assertThat(new HashSet<>(dataProvider.findAllProjects().stream().map(project -> project.projectId()).toList()))
                .hasSameSizeAs(dataProvider.findAllProjects());
    }

    @Test
    void keepsProjectDatesLogicallyConsistent() {
        assertThat(dataProvider.findAllProjects()).allSatisfy(project -> {
            if (project.endDate() != null) {
                assertThat(project.endDate()).isAfterOrEqualTo(project.startDate());
            }

            if (project.status() == ProjectStatus.COMPLETED) {
                assertThat(project.endDate()).isNotNull();
            }
        });
    }

    @Test
    void exposesImmutableCollections() {
        assertThatThrownByAddingTo(dataProvider.findAllReports());
        assertThatThrownByAddingTo(dataProvider.findAllUsers());
        assertThatThrownByAddingTo(dataProvider.findAllDepartments());
        assertThatThrownByAddingTo(dataProvider.findAllProjects());
    }

    private static void assertThatThrownByAddingTo(java.util.List<?> values) {
        assertThatThrownBy(values::clear)
                .isInstanceOf(UnsupportedOperationException.class);
    }
}
