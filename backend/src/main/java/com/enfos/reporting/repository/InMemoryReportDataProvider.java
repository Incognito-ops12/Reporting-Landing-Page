package com.enfos.reporting.repository;

import com.enfos.reporting.dto.DepartmentReportRow;
import com.enfos.reporting.dto.ProjectReportRow;
import com.enfos.reporting.dto.ReportMetadata;
import com.enfos.reporting.dto.UserReportRow;
import com.enfos.reporting.model.ProjectStatus;
import com.enfos.reporting.model.UserStatus;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Repository
public class InMemoryReportDataProvider {

    private static final Instant LAST_UPDATED = Instant.parse("2026-08-11T14:30:00Z");

    private final List<UserReportRow> users = List.of(
            new UserReportRow("USR-1001", "Maya Thompson", "maya.thompson@example.test", "Program Manager", UserStatus.ACTIVE, LocalDate.of(2023, 2, 14)),
            new UserReportRow("USR-1002", "Jordan Lee", "jordan.lee@example.test", "Department Director", UserStatus.ACTIVE, LocalDate.of(2021, 8, 9)),
            new UserReportRow("USR-1003", "Elena Garcia", "elena.garcia@example.test", "Project Lead", UserStatus.ACTIVE, LocalDate.of(2022, 5, 23)),
            new UserReportRow("USR-1004", "Marcus Chen", "marcus.chen@example.test", "Data Analyst", UserStatus.ACTIVE, LocalDate.of(2024, 1, 8)),
            new UserReportRow("USR-1005", "Priya Patel", "priya.patel@example.test", "Compliance Manager", UserStatus.ACTIVE, LocalDate.of(2020, 11, 16)),
            new UserReportRow("USR-1006", "Noah Williams", "noah.williams@example.test", "Field Coordinator", UserStatus.ACTIVE, LocalDate.of(2024, 6, 3)),
            new UserReportRow("USR-1007", "Avery Johnson", "avery.johnson@example.test", "Financial Analyst", UserStatus.INACTIVE, LocalDate.of(2019, 9, 30)),
            new UserReportRow("USR-1008", "Sofia Martinez", "sofia.martinez@example.test", "Environmental Engineer", UserStatus.ACTIVE, LocalDate.of(2023, 7, 17)),
            new UserReportRow("USR-1009", "Ethan Brooks", "ethan.brooks@example.test", "Operations Specialist", UserStatus.ACTIVE, LocalDate.of(2022, 12, 5)),
            new UserReportRow("USR-1010", "Chloe Nguyen", "chloe.nguyen@example.test", "Reporting Analyst", UserStatus.ACTIVE, LocalDate.of(2025, 2, 10)),
            new UserReportRow("USR-1011", "Liam O'Connor", "liam.oconnor@example.test", "Site Manager", UserStatus.INACTIVE, LocalDate.of(2018, 4, 19)),
            new UserReportRow("USR-1012", "Amara Okafor", "amara.okafor@example.test", "Risk Advisor", UserStatus.ACTIVE, LocalDate.of(2021, 6, 28)),
            new UserReportRow("USR-1013", "Caleb Foster", "caleb.foster@example.test", "Systems Administrator", UserStatus.ACTIVE, LocalDate.of(2020, 3, 12)),
            new UserReportRow("USR-1014", "Isabella Rossi", "isabella.rossi@example.test", "Portfolio Coordinator", UserStatus.ACTIVE, LocalDate.of(2025, 5, 20)),
            new UserReportRow("USR-1015", "Henry Davis", "henry.davis@example.test", "Quality Specialist", UserStatus.ACTIVE, LocalDate.of(2023, 10, 2))
    );

    private final List<DepartmentReportRow> departments = List.of(
            new DepartmentReportRow("DEP-101", "Environmental Operations", "Jordan Lee", 24, "Chicago, IL"),
            new DepartmentReportRow("DEP-102", "Project Delivery", "Elena Garcia", 18, "Austin, TX"),
            new DepartmentReportRow("DEP-103", "Data & Reporting", "Marcus Chen", 11, "Denver, CO"),
            new DepartmentReportRow("DEP-104", "Compliance & Risk", "Priya Patel", 9, "Boston, MA"),
            new DepartmentReportRow("DEP-105", "Field Services", "Noah Williams", 32, "Phoenix, AZ"),
            new DepartmentReportRow("DEP-106", "Finance", "Amara Okafor", 8, "New York, NY"),
            new DepartmentReportRow("DEP-107", "Technology", "Caleb Foster", 14, "Seattle, WA"),
            new DepartmentReportRow("DEP-108", "Portfolio Management", "Isabella Rossi", 7, "Atlanta, GA")
    );

    private final List<ProjectReportRow> projects = List.of(
            new ProjectReportRow("PRJ-2001", "North Basin Remediation", "Environmental Operations", "Elena Garcia", ProjectStatus.ACTIVE, LocalDate.of(2025, 4, 7), null),
            new ProjectReportRow("PRJ-2002", "Reporting Platform Refresh", "Data & Reporting", "Chloe Nguyen", ProjectStatus.ACTIVE, LocalDate.of(2026, 1, 12), null),
            new ProjectReportRow("PRJ-2003", "Midwest Site Assessment", "Field Services", "Noah Williams", ProjectStatus.COMPLETED, LocalDate.of(2024, 3, 18), LocalDate.of(2025, 2, 28)),
            new ProjectReportRow("PRJ-2004", "Compliance Controls Review", "Compliance & Risk", "Priya Patel", ProjectStatus.COMPLETED, LocalDate.of(2025, 1, 6), LocalDate.of(2025, 9, 19)),
            new ProjectReportRow("PRJ-2005", "Mobile Field Toolkit", "Technology", "Caleb Foster", ProjectStatus.PLANNED, LocalDate.of(2026, 10, 5), null),
            new ProjectReportRow("PRJ-2006", "Western Region Expansion", "Portfolio Management", "Isabella Rossi", ProjectStatus.ON_HOLD, LocalDate.of(2025, 8, 11), null),
            new ProjectReportRow("PRJ-2007", "Cost Forecast Modernization", "Finance", "Amara Okafor", ProjectStatus.ACTIVE, LocalDate.of(2026, 2, 2), null),
            new ProjectReportRow("PRJ-2008", "River District Closure", "Environmental Operations", "Sofia Martinez", ProjectStatus.COMPLETED, LocalDate.of(2022, 6, 13), LocalDate.of(2024, 11, 22)),
            new ProjectReportRow("PRJ-2009", "Client Delivery Playbook", "Project Delivery", "Maya Thompson", ProjectStatus.COMPLETED, LocalDate.of(2024, 9, 9), LocalDate.of(2025, 6, 30)),
            new ProjectReportRow("PRJ-2010", "Executive Metrics Catalog", "Data & Reporting", "Marcus Chen", ProjectStatus.ACTIVE, LocalDate.of(2025, 11, 3), null),
            new ProjectReportRow("PRJ-2011", "Safety Audit Program", "Field Services", "Henry Davis", ProjectStatus.PLANNED, LocalDate.of(2026, 9, 14), LocalDate.of(2027, 3, 31)),
            new ProjectReportRow("PRJ-2012", "Access Review Automation", "Technology", "Caleb Foster", ProjectStatus.ON_HOLD, LocalDate.of(2025, 10, 20), null)
    );

    private final List<ReportMetadata> reports = List.of(
            new ReportMetadata("users", "Users", "People in the system", LAST_UPDATED, users.size()),
            new ReportMetadata("departments", "Departments", "Org structure", LAST_UPDATED, departments.size()),
            new ReportMetadata("projects", "Projects", "Active & past work", LAST_UPDATED, projects.size())
    );

    public List<ReportMetadata> findAllReports() {
        return reports;
    }

    public List<UserReportRow> findAllUsers() {
        return users;
    }

    public List<DepartmentReportRow> findAllDepartments() {
        return departments;
    }

    public List<ProjectReportRow> findAllProjects() {
        return projects;
    }
}
