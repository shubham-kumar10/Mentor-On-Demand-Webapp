import { Skill } from './Skill';
import { User } from './User';

export interface Mentor {
    id: number
    linkedinUrl: String
    yearsOfExperience: number
    active: boolean
    user: User
}