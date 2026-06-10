import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  private generateTrackingId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const year = new Date().getFullYear();
    return `TW-${year}-${result}`;
  }

  async create(createReportDto: CreateReportDto) {
    const trackingId = this.generateTrackingId();

    let parsedEvidenceUrls: string[] = [];
    if (createReportDto.evidenceUrls) {
      try {
        parsedEvidenceUrls = JSON.parse(createReportDto.evidenceUrls);
      } catch (e) {
        parsedEvidenceUrls = [createReportDto.evidenceUrls];
      }
    }

    const report = await this.prisma.report.create({
      data: {
        title: createReportDto.title,
        category: createReportDto.category,
        location: createReportDto.location,
        description: createReportDto.description,
        evidenceUrls: parsedEvidenceUrls,
        trackingId,
        incidentDate: new Date(createReportDto.incidentDate),
      },
    });

    return {
      message: 'Report created successfully',
      trackingId: report.trackingId,
    };
  }

  async findByTrackingId(trackingId: string) {
    return this.prisma.report.findUnique({
      where: { trackingId },
      include: { messages: true },
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
