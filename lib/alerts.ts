import { createClient } from "./supabase/server"

export async function createAlert(
  studentId: string,
  schoolId: string,
  alertType: "high_risk" | "moderate_risk" | "improvement" | "manual",
  message: string,
  teacherId?: string,
) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("alerts").insert({
    student_id: studentId,
    school_id: schoolId,
    alert_type: alertType,
    message,
    teacher_id: teacherId,
  })

  if (error) throw error
  return data
}

export async function checkAndCreateAlerts(
  studentId: string,
  schoolId: string,
  score: number,
  riskLevel: "low" | "moderate" | "high" | "critical",
) {
  // Check if alert should be created based on risk level
  let alertType: "high_risk" | "moderate_risk" | "improvement" | "manual" | null = null
  let message = ""

  if (riskLevel === "critical" || riskLevel === "high") {
    alertType = riskLevel === "critical" ? "high_risk" : "high_risk"
    message = `Student assessment indicates ${riskLevel} risk level (Score: ${Math.round(score)}%). Immediate follow-up recommended.`
  } else if (riskLevel === "moderate") {
    alertType = "moderate_risk"
    message = `Student assessment indicates moderate risk (Score: ${Math.round(score)}%). Monitor for changes.`
  }

  if (alertType) {
    return await createAlert(studentId, schoolId, alertType, message)
  }

  return null
}

export async function resolveAlert(alertId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("alerts")
    .update({
      is_resolved: true,
      resolved_at: new Date(),
    })
    .eq("id", alertId)

  if (error) throw error
  return data
}
