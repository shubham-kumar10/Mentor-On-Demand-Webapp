import { User } from './User';
import { Mentor } from './Mentor';
import { Skill } from './Skill';


export interface Training {
    id: number;
    user: User;
    mentor: Mentor;
    skill: Skill;
    status: string;
    progress: number;
    rating: number;
    startDate: Date;
    endDate: Date;
}