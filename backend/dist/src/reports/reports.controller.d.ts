import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto): Promise<{
        message: string;
        trackingId: string;
    }>;
    findAll(): Promise<{
        id: string;
        trackingId: string;
        title: string;
        category: string;
        location: string;
        incidentDate: Date;
        description: string;
        evidenceUrls: string[];
        status: import("@prisma/client").$Enums.ReportStatus;
        priority: import("@prisma/client").$Enums.Priority;
        internalNotes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByTrackingId(trackingId: string): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            isFromAdmin: boolean;
            reportId: string;
        }[];
    } & {
        id: string;
        trackingId: string;
        title: string;
        category: string;
        location: string;
        incidentDate: Date;
        description: string;
        evidenceUrls: string[];
        status: import("@prisma/client").$Enums.ReportStatus;
        priority: import("@prisma/client").$Enums.Priority;
        internalNotes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
