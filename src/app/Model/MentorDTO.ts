import { Mentor } from './Mentor';
import { Skill } from './Skill';

export interface MentorDTO {
    mentor: Mentor
    skills: Skill[]
}