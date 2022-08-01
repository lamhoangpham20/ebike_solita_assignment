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
exports.Journey = void 0;
const typeorm_1 = require("typeorm");
const Station_1 = require("./Station");
let Journey = class Journey extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Journey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp with time zone" }),
    __metadata("design:type", Date)
], Journey.prototype, "departure_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp with time zone" }),
    __metadata("design:type", Date)
], Journey.prototype, "return_date", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Journey.prototype, "cover_distance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Station_1.Station, (departure_station) => departure_station.departurn_journeys),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Station_1.Station)
], Journey.prototype, "departure_station", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Station_1.Station, (return_station) => return_station.return_journeys),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Station_1.Station)
], Journey.prototype, "return_station", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journey.prototype, "departure_station_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journey.prototype, "return_station_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Journey.prototype, "duration", void 0);
Journey = __decorate([
    (0, typeorm_1.Entity)()
], Journey);
exports.Journey = Journey;
//# sourceMappingURL=Journey.js.map