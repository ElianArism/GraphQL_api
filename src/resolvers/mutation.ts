import { IResolvers } from "@graphql-tools/utils";
import { database } from '../data/data.store';
import _ from 'lodash'; 

const courseErr = {
    "description": "", 
    "id": "-1",
    "title": "ERR: The course name already exists, change the name",
    "classes": 0, 
    "teacher": "", 
    "time": 0, 
    "logo": "", 
    "path": "",
}

// "Mutations are the GraphQL equivalent for http POST, PUT, DELETE and others"
const mutation: IResolvers = {
    
    Mutation: {
        newCourse(__: void, {course}): any {
            course.id = String(Date.now()); 
            course.reviews = [];
        
            const sameTitle = database.courses.filter(courseDB => courseDB.title === course.title)
            
            if(sameTitle.length < 1) {
                database.courses.push(course);
                return course; 
            } else {
                return courseErr; 
            }
        },
  
        modifyCourse(__: void, {course: courseToUpdate}): any {
            const index = database.courses.findIndex(courseDB => courseDB.id === courseToUpdate.id);
            if(index === -1) return courseErr; 
            database.courses[index] ={ ...database.courses[index], ...courseToUpdate};
            return courseToUpdate;
        },

        removeCourse(__:void, {id}) {
            let courseDeleted;
            
            database.courses = database.courses.filter(courseDB => {
                if(courseDB.id !== id) return courseDB; 
                else courseDeleted = courseDB;
            });

            return courseDeleted;  
        }

    }
}


export default mutation; 