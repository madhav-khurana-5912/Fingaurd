"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const common_1 = require("@nestjs/common");
const expense_entity_1 = require("../expenses/expense.entity");
let PredictionService = class PredictionService {
    simulatePurchase(user, purchaseAmount, expenses) {
        const DAYS_TO_SIMULATE = 30;
        const now = new Date();
        let currentBalance = Number(user.currentBalance) - purchaseAmount;
        const timeline = [{ date: new Date(now), balance: currentBalance }];
        const warnings = [];
        const monthlyVariableSpend = expenses
            .filter((e) => e.type === expense_entity_1.ExpenseType.VARIABLE)
            .reduce((sum, e) => sum + Number(e.amount), 0);
        const dailyVariableSpend = monthlyVariableSpend / 30;
        for (let i = 1; i <= DAYS_TO_SIMULATE; i++) {
            const simulationDate = new Date(now);
            simulationDate.setDate(now.getDate() + i);
            const simulatedDay = simulationDate.getDate();
            currentBalance -= dailyVariableSpend;
            let eventName = '';
            const dueExpenses = expenses.filter((e) => e.type === expense_entity_1.ExpenseType.FIXED && e.dueDay === simulatedDay);
            for (const expense of dueExpenses) {
                currentBalance -= Number(expense.amount);
                eventName += (eventName ? ', ' : '') + expense.name;
                if (currentBalance < Number(user.emergencyBuffer)) {
                    warnings.push(`Warning: On ${simulationDate.toLocaleDateString()}, payment for ${expense.name} will dip into your safety buffer.`);
                }
                if (currentBalance < 0) {
                    warnings.push(`CRITICAL: On ${simulationDate.toLocaleDateString()}, you may be unable to pay for ${expense.name}.`);
                }
            }
            timeline.push({
                date: new Date(simulationDate),
                balance: currentBalance,
                event: eventName || undefined,
            });
        }
        const safetyBufferRemaining = currentBalance - Number(user.emergencyBuffer);
        let riskLevel = 'Low';
        if (currentBalance < 0) {
            riskLevel = 'High';
        }
        else if (currentBalance < Number(user.emergencyBuffer)) {
            riskLevel = 'Medium';
        }
        return {
            futureBalance: currentBalance,
            safetyBufferRemaining,
            riskLevel,
            warnings: Array.from(new Set(warnings)),
            timeline,
        };
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)()
], PredictionService);
//# sourceMappingURL=prediction.service.js.map