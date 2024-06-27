import express, {Router} from 'express';
import {
   getStudent,
   getStudentAge,
   getStudentClass,
   getStudentExamScore,
   getSumStudent,
   getStudentScoreAverage,
   getStudentClassUnique,
   getEnrollmentStudent,
   getStudentByScoreAge,
   getStudentAverageAndAge,
   getStudentHighestScore
} from "../controllers/studentController.ts";

const router: Router = express.Router();
router.get('/get_student', getStudent);
router.get('/student_age', getStudentAge);
router.get('/student_class', getStudentClass);
router.get('/student_examscore', getStudentExamScore);
router.get('/sum_student', getSumStudent);
router.get('/student_scoreaverage', getStudentScoreAverage);
router.get('/student_classunique', getStudentClassUnique);
router.get('/enrollment_student', getEnrollmentStudent);
router.get('/student_byscoreage', getStudentByScoreAge);
router.get('/student_average_and_age', getStudentAverageAndAge);
router.get('student_highest_score', getStudentHighestScore);
export {router as studentRouter};