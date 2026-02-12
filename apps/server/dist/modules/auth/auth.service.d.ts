import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registrationData: any): Promise<{
        id: string;
        email: string;
        currentBalance: number;
        emergencyBuffer: number;
        expenses: import("../expenses/expense.entity").Expense[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
