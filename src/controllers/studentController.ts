import { Request, Response } from "express";
import database from "../config/database.ts";
import { QueryError, QueryResult, RowDataPacket} from "mysql2";

interface Student {
    id: number;
    student_name: string;
    age: number;
    kelas: string;
    exam_score: number;
    enrollment_date: string;
}

export const getStudent = (req: Request, res: Response) => {
    const query = "SELECT * FROM students"
    database.query(
        query, (err : QueryError, result: QueryResult) => {
            const allStudent = result as Student[];
            if (err) {
                console.log("Database query error:", err);
                res.status(500).send("Internal Server Error");
            }
            if (allStudent.length === 0) {
                return res.status(404).send("Student not found");
            }
            else {
                res.status(200).send(allStudent);
            }
        }
    )
};

export const getStudentAge = (req: Request, res: Response) => {
    const {age} = req.params;
    const query = "SELECT * FROM students WHERE age = ?";
    const params = [age];

    database.query(
      query,
      params,
      (err: QueryError | null, result: QueryResult) => {
        const studentAge = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentAge.length === 0) {
            return res.status(404).send("Student age not found");
        }
        else {
            res.status(200).send(studentAge)
        }
      }
    );
  };

  export const getStudentClass = (req: Request, res: Response) => {
    const {kelas} = req.params;
    const query = "SELECT student_name, exam_score FROM students WHERE kelas = ?";
    const params = [kelas];

    database.query(
        query,
        params,
        (err: QueryError | null, result: QueryResult) => {
            const studentClass = result as Student[];
            if (err) {
                console.log("Database query error:", err);
                res.status(500).send("Internal Server Error");
            }
            if (studentClass.length === 0) {
                return res.status(404).send("Class not found");
            }
            else {
                res.status(200).send(studentClass);
            }
        }
    )
  };

  export const getStudentExamScore = (req: Request, res: Response) => {
    const {exam_score} = req.params;
    const query = "SELECT student_name, exam_score FROM students ORDER BY exam_score = ? DESC LIMIT 0,1000";
    const params = [exam_score];

    database.query (
        query,
        params,
        (err: QueryError | null, result: QueryResult) => {
            const studentExam = result as Student[];
            if (err) {
                console.log("Database query error:", err);
                res.status(500).send("Internal Server Error");
            }
            if (studentExam.length === 0) {
                return res.status(404).send("Exam score not found");
            }
            else {
                res.status(200).send(studentExam);
            }
        }
    )
  };

export const getSumStudent = (req: Request, res: Response) => {
    const query = "SELECT kelas, COUNT(*) FROM students GROUP BY kelas";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const sumStudent = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (sumStudent.length === 0) {
            return res.status(404).send("Student not found");
        }
        else {
            res.status(200).send(sumStudent);
        }
    }
    )
};

export const getStudentScoreAverage = (req: Request, res: Response) => {
    const query = "SELECT kelas, AVG(exam_score) FROM students GROUP BY kelas LIMIT 2";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentScoreAverage = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentScoreAverage.length === 0) {
            return res.status(404).send("Score not found");
        }
        else {
            res.status(200).send(studentScoreAverage);
        }
    }
    )
};

export const getStudentClassUnique = (req: Request, res: Response) => {
    const query = "SELECT kelas FROM students GROUP BY kelas HAVING COUNT(*) = 1";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentClassUnique = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentClassUnique.length === 0) {
            return res.status(404).send("Class not found");
        }
        else {
            res.status(200).send(studentClassUnique);
        }
    }
    ) 
};

export const getEnrollmentStudent = (req: Request, res: Response) => {
    const query = "SELECT student_name, enrollment_date FROM students ORDER BY enrollment_date = ? LIMIT 5";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentEnrollmentDate = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentEnrollmentDate.length === 0) {
            return res.status(404).send("Score not found");
        }
        else {
            res.status(200).send(studentEnrollmentDate);
        }
    }
    ) 
};

export const getStudentByScoreAge = (req: Request, res: Response) => {
    const query = "SELECT student_name, exam_score FROM students WHERE exam_score > ? AND age > ?";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentByScoreAge = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentByScoreAge.length === 0) {
            return res.status(404).send("Student not found");
        }
        else {
            res.status(200).send(studentByScoreAge);
        }
    }
    ) 
};

export const getStudentAverageAndAge = (req: Request, res: Response) => {
    const query = "SELECT AVG(exam_score), age FROM students WHERE age = ?";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentAverageAndAge = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentAverageAndAge.length === 0) {
            return res.status(404).send("Student not found");
        }
        else {
            res.status(200).send(studentAverageAndAge);
        }
    }
    ) 
};

export const getStudentHighestScore = (req: Request, res: Response) => {
    const query = "SELECT student_name, exam_score FROM students WHERE kelas = ? ORDER BY exam_score DESC LIMIT 1";
    database.query ( 
        query,
        (err: QueryError| null, result: QueryResult) => {
        const studentHighestScore = result as Student[];
        if (err) {
            console.log("Database query error:", err);
            res.status(500).send("Internal Server Error");
        }
        if (studentHighestScore.length === 0) {
            return res.status(404).send("Student not found");
        }
        else {
            res.status(200).send(studentHighestScore);
        }
    }
    ) 
}