package com.enfos.reporting.dto;

import java.time.Instant;

public record ReportMetadata(
        String id,
        String name,
        String description,
        Instant lastUpdated,
        int rowCount
) {
}
