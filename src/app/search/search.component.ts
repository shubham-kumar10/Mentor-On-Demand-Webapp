import { Component, OnInit } from '@angular/core';
import { Mentor } from '../Model/Mentor';
import { MentorService } from '../services/mentor.service';
import { MentorDTO } from '../Model/MentorDTO';
import { SkillDetails } from '../Model/SkillDetails';
import { UserService } from '../services/user.service';
import { Skill } from '../Model/Skill';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey: number;
  sortKey: string;
  itemList: SkillDetails[];
  filteredItemList: SkillDetails[];
  isAdmin: boolean;
  skillList: Skill[];
  constructor(private mentorService: MentorService, private userService: UserService) { }
  ngOnInit() {
    this.mentorService.getAllMentors().subscribe(
      data => {
        this.itemList = data;
        this.filteredItemList = this.itemList;
      }
    )
    this.userService.getAllSkills().subscribe(
      data => {
        this.skillList = data;
      }
    )
  }

  search() {
    this.filteredItemList = this.itemList.filter(item => item.skill.id == this.searchKey)
    this.mentorService.getSubject().next(this.filteredItemList);
  }



}
