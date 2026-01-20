import { createClient } from "@/lib/supabase/server"

export interface ClassAnalytics {
  classId: string
  className: string
  studentCount: number
  assessmentCount: number
  averageScore: number
  riskDistribution: Record<string, number>
}

export interface SchoolAnalytics {
  schoolId: string
  studentCount: number
  totalAssessments: number
  averageScore: number
  riskDistribution: Record<string, number>
  classAnalytics: ClassAnalytics[]
}

export async function getClassAnalytics(classId: string): Promise<ClassAnalytics> {
  const supabase = await createClient()

  // Get class name
  const { data: classData } = await supabase.from("classes").select("name").eq("id", classId).single()

  // Get students in class
  const { data: classStudents } = await supabase.from("class_students").select("student_id").eq("class_id", classId)

  const studentIds = classStudents?.map((cs) => cs.student_id) || []

  // Get assessments for students
  const { data: assessments } = await supabase
    .from("assessments")
    .select("score, risk_level")
    .in("student_id", studentIds)

  const riskDistribution: Record<string, number> = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
  }

  assessments?.forEach((a) => {
    if (a.risk_level) {
      riskDistribution[a.risk_level]++
    }
  })

  const averageScore = assessments?.length ? assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length : 0

  return {
    classId,
    className: classData?.name || "Unknown Class",
    studentCount: studentIds.length,
    assessmentCount: assessments?.length || 0,
    averageScore: Math.round(averageScore * 10) / 10,
    riskDistribution,
  }
}

export async function getSchoolAnalytics(schoolId: string): Promise<SchoolAnalytics> {
  const supabase = await createClient()

  // Get all classes in school
  const { data: classes } = await supabase.from("classes").select("id").eq("school_id", schoolId)

  // Get all students in school
  const { data: classStudents } = await supabase
    .from("class_students")
    .select("student_id")
    .in("class_id", classes?.map((c) => c.id) || [])

  const uniqueStudentIds = [...new Set(classStudents?.map((cs) => cs.student_id) || [])]

  // Get all assessments
  const { data: assessments } = await supabase.from("assessments").select("score, risk_level").eq("school_id", schoolId)

  const riskDistribution: Record<string, number> = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
  }

  assessments?.forEach((a) => {
    if (a.risk_level) {
      riskDistribution[a.risk_level]++
    }
  })

  const averageScore = assessments?.length ? assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length : 0

  // Get analytics for each class
  const classAnalytics = await Promise.all((classes || []).map((c) => getClassAnalytics(c.id)))

  return {
    schoolId,
    studentCount: uniqueStudentIds.length,
    totalAssessments: assessments?.length || 0,
    averageScore: Math.round(averageScore * 10) / 10,
    riskDistribution,
    classAnalytics,
  }
}
