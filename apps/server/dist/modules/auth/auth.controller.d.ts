import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: any;
    } | {
        message: string;
    }>;
    register(body: any): Promise<{
        id: string;
        email: string;
        currentBalance: number;
        emergencyBuffer: number;
        expenses: import("../expenses/expense.entity").Expense[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
