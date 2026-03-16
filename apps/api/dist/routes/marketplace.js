"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketplaceRoutes = void 0;
var db_1 = require("@clawcloud/db");
var safetyScorer_1 = require("../services/safetyScorer");
var marketplaceRoutes = function (fastify, opts) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // 1. Get all Verified Skills from the global Registry
        fastify.get('/api/marketplace/skills', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var verifiedSkills;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prisma.skillRegistry.findMany({
                            where: { isVerified: true },
                            orderBy: { installs: 'desc' }
                        })];
                    case 1:
                        verifiedSkills = _a.sent();
                        return [2 /*return*/, verifiedSkills];
                }
            });
        }); });
        // 2. Submit a new Skill for Community Review
        fastify.post('/api/marketplace/submit', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, name, description, repoUrl, codeMock, analysis, review;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, repoUrl = _a.repoUrl, codeMock = _a.codeMock;
                        analysis = safetyScorer_1.SafetyScorer.analyzeSkill(repoUrl, codeMock);
                        return [4 /*yield*/, db_1.prisma.skillReview.create({
                                data: {
                                    skillName: name,
                                    description: description,
                                    repoUrl: repoUrl,
                                    submitterId: 'user_mock_123',
                                    safetyScore: analysis.score,
                                    status: analysis.status,
                                    reportJson: analysis.report
                                }
                            })];
                    case 1:
                        review = _b.sent();
                        if (!(analysis.status === 'APPROVED')) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1.prisma.skillRegistry.create({
                                data: {
                                    name: name,
                                    description: description,
                                    author: 'Community',
                                    repoUrl: repoUrl,
                                    isVerified: true,
                                    safetyScore: analysis.score,
                                    installs: 0
                                }
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, review];
                }
            });
        }); });
        // 3. Admin: Get Review Queue
        fastify.get('/api/marketplace/queue', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db_1.prisma.skillReview.findMany({
                        orderBy: { createdAt: 'desc' }
                    })];
            });
        }); });
        // 4. Admin: Approve a Review manually
        fastify.post('/api/marketplace/queue/:id/approve', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var id, review, newSkill;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, db_1.prisma.skillReview.update({
                                where: { id: id },
                                data: { status: 'APPROVED' }
                            })];
                    case 1:
                        review = _a.sent();
                        return [4 /*yield*/, db_1.prisma.skillRegistry.create({
                                data: {
                                    name: review.skillName,
                                    description: review.description,
                                    author: 'Community',
                                    repoUrl: review.repoUrl,
                                    isVerified: true,
                                    safetyScore: review.safetyScore,
                                    installs: 0
                                }
                            })];
                    case 2:
                        newSkill = _a.sent();
                        return [2 /*return*/, newSkill];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.marketplaceRoutes = marketplaceRoutes;
