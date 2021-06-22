import { IResolvers } from "@graphql-tools/utils";
import { database } from "../data/data.store";

/**
 * Query = GET 
 * Mutations = POST PUT DELETE 
 * Subscribe = obs 
 */

const query: IResolvers = {
    
    Query: {
        students(): any {
            return database.students; 
        }, 
        
        student(__: void, {id}): any {
            const student = database.students.filter(student => student.id === id)[0]; // only the first equal 
            return (student) 
            ? student 
            : {id: '-1', name: 'The Student does not exists.', email: '', courses: []};
        }, 
        
        courses(): any {
            return database.courses; 
        }, 

        course(__: void, {id}): any {
            return database.courses.filter((course) => course.id === id)[0] || null; 
        }
    }
}

export default query; 