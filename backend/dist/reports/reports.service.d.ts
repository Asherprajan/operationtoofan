import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateTrackingId;
    create(createReportDto: CreateReportDto): Promise<{
        message: string;
        trackingId: string;
    }>;
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
}
