import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail(email: string): Promise<User | undefined>;
    findOneById(id: string): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
    updateBalance(id: string, balance: number): Promise<void>;
}
