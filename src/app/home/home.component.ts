import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';


@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	// courses$: Observable<Course[]>;

	beginnersCourses$: Observable<Course[]>;

	advancedCourses$: Observable<Course[]>;

	beginnerCourses = []
	advancedCourses = []

	constructor(private router: Router, private courseService: CoursesService) {

	}

	ngOnInit() {
		this.getBeginnerCourses()
		this.getAdvancedCourses()
	}

	getBeginnerCourses() {
		var filter = {
			filterOne : 'categories',
			filterTwo : 'array-contains',
			filterThree : 'BEGINNER',
			orderBy:'seqNo'
		}
		this.beginnerCourses = this.courseService.getCourses(filter)
		console.log("Check Courses", this.beginnerCourses);
	}

  getAdvancedCourses(){
    var filter = {
			filterOne : 'categories',
			filterTwo : 'array-contains',
			filterThree : 'ADVANCED',
			orderBy:'seqNo'
		}
		this.advancedCourses = this.courseService.getCourses(filter)
		console.log("Check Advanced Courses", this.advancedCourses);
  }

}
