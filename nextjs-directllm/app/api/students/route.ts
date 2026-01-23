import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STUDENTS_FILE = path.join(process.cwd(), 'data', 'students.json');

type Student = {
  name: string;
  studentId: string;
  major: string;
  gpa: number;
  enrollmentStatus: "full-time" | "part-time" | "graduated";
  creditsCompleted: number;
};

type StudentDatabase = Record<string, Student>;

async function readStudents(): Promise<StudentDatabase> {
  try {
    const data = await fs.readFile(STUDENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading students file:', error);
    return {};
  }
}

async function writeStudents(students: StudentDatabase): Promise<void> {
  try {
    await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Error writing students file:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  const students = await readStudents();
  
  if (!query) {
    return NextResponse.json({ students: Object.values(students) });
  }
  
  const key = query.toLowerCase();
  const student = students[key];
  
  if (student) {
    return NextResponse.json({ student });
  }
  
  return NextResponse.json({ error: 'Student not found', query }, { status: 404 });
}

export async function POST(request: NextRequest) {
  try {
    const newStudent: Student = await request.json();
    
    // Generate student ID if not provided
    if (!newStudent.studentId) {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      newStudent.studentId = `STU-${year}-${randomNum}`;
    }
    
    const students = await readStudents();
    const key = newStudent.name.toLowerCase();
    
    // Check if student already exists
    if (students[key]) {
      return NextResponse.json({ error: 'Student already exists' }, { status: 409 });
    }
    
    students[key] = newStudent;
    await writeStudents(students);
    
    return NextResponse.json({ student: newStudent, message: 'Student enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling student:', error);
    return NextResponse.json({ error: 'Failed to enroll student' }, { status: 500 });
  }
}