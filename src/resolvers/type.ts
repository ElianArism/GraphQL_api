import { IResolvers } from "@graphql-tools/utils";
import { database } from "../data/data.store";
import _ from 'lodash'; 

// Sub queries
const type: IResolvers = {
    
    // Schema 
    Student: {
        // Property courses: [Course!]! from Student Schema
        courses: parent => {
            let list: any[] = []; 

            parent.courses.map((course: any) => {
                list = database.courses.filter((courseDB: any) => courseDB.id === course); 
            })

            return list; 
        }
    },

    // Schema 
    Course: {
        // Property courses: [Student!]! from Course Schema
        students: parent => {
            let listStudents: any[] = []; 
            const courseId = parent.id;

            database.students.map((student: any) => 
                (student.id === courseId) ? listStudents = [...listStudents, student] : '' 
            )

            return listStudents;
        },

        // Property path: String from Course Schema 
        path: parent => {
            return `https://www.udemy.com/course${parent.path}`; 
        }
    }
}

export default type; 