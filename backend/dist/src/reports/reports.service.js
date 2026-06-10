"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateTrackingId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const year = new Date().getFullYear();
        return `TW-${year}-${result}`;
    }
    async create(createReportDto) {
        const trackingId = this.generateTrackingId();
        let parsedEvidenceUrls = [];
        if (createReportDto.evidenceUrls) {
            try {
                parsedEvidenceUrls = JSON.parse(createReportDto.evidenceUrls);
            }
            catch (e) {
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
    async findByTrackingId(trackingId) {
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
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map