import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { COURSES, findLessonsForCourse } from './db-data';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    TempData = []
    Note: any
    constructor(private db: AngularFirestore) {
    }

    async uploadData() {
        const coursesCollection = this.db.collection('courses');
        const courses = await this.db.collection('courses').get();
        for (let course of Object.values(COURSES)) {
            const newCourse = this.removeId(course);
            const courseRef = await coursesCollection.add(newCourse);
            const lessons = await courseRef.collection('lessons');
            const courseLessons = findLessonsForCourse(course['id']);
            console.log(`Uploading course ${course['description']}`);
            for (const lesson of courseLessons) {
                const newLesson = this.removeId(lesson);
                delete newLesson.courseId;
                await lessons.add(newLesson);
            }
        }
    }

    removeId(data: any) {
        const newData: any = { ...data };
        delete newData.id;
        return newData;
    }

    onReadDoc() {
        this.db.doc('/courses/1gzBNubcpEbpCoIogFLn').get().subscribe(snap => {
            console.log("Check ID", snap.id);
            console.log("Check Data", snap.data());
            console.log("Check Exists", snap.exists);
            console.log("Check Data", snap.metadata);
        })
    }

    onReadCollection() {
        this.db.collection('courses').get().subscribe(snaps => {
            snaps.forEach(snap => {
                console.log("Check Collection Id", snap.id);
                console.log("Check Collection Data", snap.data());
            })
        })
    }

    onReadCollectionDocumentCollection() {
        this.db.collection('/courses/1gzBNubcpEbpCoIogFLn/lessons').get().subscribe(snaps => {
            snaps.forEach(snap => {
                console.log("Check Collection Document Collection Lessons Id", snap.id);
                console.log("Check Collection Document Collection Lessons Data", snap.data());
            })
        })
    }

    onReadCollectionComplexQueries() {
        this.db.collection('/courses/1gzBNubcpEbpCoIogFLn/lessons',
            //This is the customization here
            ref => ref.where("seqNo", ">=", 5).orderBy('seqNo'))

            .get().subscribe(snaps => {
                snaps.forEach(snap => {
                    console.log("Check Collection Document Collection Lessons Id", snap.id);
                    console.log("Check Collection Document Collection Lessons Data", snap.data());
                })
            })
    }


    onMultipleQueries() {
        this.Note = 'Only == Work For second Query Nothing else and for the we have to add specific index using log error link '

        this.db.collection('courses',
            //This is the customization here
            ref =>
                ref.where("seqNo", ">=", 5)
                    .where("lessonsCount", "==", 10).orderBy('seqNo')) // Only == Work For second Query Nothing else and for the we have to add specific index using log error link 
            .get().subscribe(snaps => {
                snaps.forEach(snap => {
                    console.log("Check Collection Document Collection Lessons Id", snap.id);
                    console.log("Check Collection Document Collection Lessons Data", snap.data());
                })
            })
    }


    onCollectionGroup() {
        this.Note = 'Only == Work For second Query Nothing else and for the we have to add specific index using log error link '
        this.db.collection('lessons',
            //This is the customization here
            ref =>
                ref.where("seqNo", ">=", 5)
                    .where("lessonsCount", "==", 10).orderBy('seqNo')) // Only == Work For second Query Nothing else and for the we have to add specific index using log error link 
            .get().subscribe(snaps => {
                snaps.forEach(snap => {
                    console.log("Check Collection Document Collection Lessons Id", snap.id);
                    console.log("Check Collection Document Collection Lessons Data", snap.data());
                })
            })
    }

    onReadSnapShotDoc() {
        this.TempData = []
        this.db.doc('/courses/1gzBNubcpEbpCoIogFLn').snapshotChanges().subscribe(snap => {
            console.log("Check ID", snap.payload.id);
            console.log("Check Data", snap.payload.data());
            var a: any = snap.payload.data()
            this.TempData.push(a.price)
        })
    }

    onReadSnapShotCollection() {
        this.TempData = []
        this.db.collection('courses').snapshotChanges().subscribe(snaps => {
            snaps.forEach(snap => {
                console.log("Check ID", snap.payload.doc.id);
                console.log("Check Data", snap.payload.doc.data());
                var a: any = snap.payload.doc.data()
                this.TempData.push(a.price)
            });
        })
    }

    onReadValueChangesDoc() {
        this.TempData = []
        //* We Cannot Get Id Here Onlyy The Data
        this.Note = 'We Cannot Get Id Here....... Only The Data'
        this.db.doc('/courses/1gzBNubcpEbpCoIogFLn').valueChanges().subscribe(snap => {
            console.log("Check ID", snap);
            var responce: any = snap
            this.TempData.push(responce.price)
        })
    }

    onReadValueChangesCollection() {
        this.TempData = []
        //* We Cannot Get Id Here Only The Data 
        this.Note = 'We Cannot Get Id Here........ Only The Data'
        this.db.collection('courses').valueChanges().subscribe(snap => {
            console.log("Check ID", snap);
            var responce: any = snap
            responce.forEach(element => {
                this.TempData.push(element.price)
            });
        })
    }




}
















