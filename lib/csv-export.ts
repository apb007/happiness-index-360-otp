import { createClient } from "@/lib/supabase/server"

export async function exportAssessmentsToCSV(schoolId: string): Promise<string> {
  const supabase = await createClient()

  // Get all assessments with student details
  const { data: assessments } = await supabase
    .from("assessments")
    .select(
      `
      id,
      student_id,
      score,
      raw_score,
      risk_level,
      created_at,
      profiles!student_id(email, first_name, last_name)
    `,
    )
    .eq("school_id", schoolId)
    .order("created_at", { ascending: false })

  // Create CSV headers
  const headers = [
    "Student ID",
    "Student Name",
    "Email",
    "Raw Score (32-160)",
    "Scaled Score (0-100)",
    "Risk Level",
    "Assessment Date",
  ]

  // Create CSV rows
  const rows =
    assessments?.map((a: any) => [
      a.student_id,
      `${a.profiles?.first_name || ""} ${a.profiles?.last_name || ""}`.trim(),
      a.profiles?.email || "",
      a.raw_score || "N/A",
      Math.round(a.score * 10) / 10,
      a.risk_level,
      new Date(a.created_at).toLocaleDateString(),
    ]) || []

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

  return csvContent
}

export function downloadCSV(csvContent: string, filename: string) {
  if (typeof window === "undefined") return

  const element = document.createElement("a")
  element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`)
  element.setAttribute("download", filename)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
