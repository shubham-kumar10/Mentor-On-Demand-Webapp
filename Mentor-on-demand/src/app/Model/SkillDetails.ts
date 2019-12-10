import { Mentor } from './Mentor';
import { Skill } from './Skill';

export interface SkillDetails {
    skill: Skill
    yearsOfExperience: number
    self_rating: number
    mentor: Mentor
}   