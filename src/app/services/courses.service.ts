import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
// import { COURSES, findLessonsForCourse } from './db-data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }

  OnInit() {

  }

  getCourses(filter: any) {
    console.log("Check Filter",filter);
    
    var responce = []
    this.db.collection('courses', ref => ref.where(filter.filterOne,filter.filterTwo,filter.filterThree).orderBy(filter.orderBy)).get().subscribe(snaps => {
      snaps.forEach(snap => {
        responce.push(snap.data())
      })
    })
    return responce
  }
}
