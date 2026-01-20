import { createClient } from "@/lib/supabase/client"

export interface SchoolBranding {
  logo_url?: string
  logo_alt_text?: string
  primary_color?: string
  secondary_color?: string
  accent_color?: string
  welcome_message?: string
  footer_text?: string
  school_name?: string
  school_email?: string
  school_phone?: string
  school_website?: string
  address?: string
}

export async function getSchoolBranding(schoolId: string): Promise<SchoolBranding> {
  const supabase = createClient()

  try {
    // Get school info
    const { data: schoolData } = await supabase.from("schools").select("*").eq("id", schoolId).single()

    // Get school settings
    const { data: settingsData } = await supabase.from("school_settings").select("*").eq("school_id", schoolId).single()

    return {
      school_name: schoolData?.name,
      school_email: schoolData?.school_email,
      school_phone: schoolData?.school_phone,
      school_website: schoolData?.school_website,
      address: schoolData?.address,
      logo_url: settingsData?.logo_url,
      logo_alt_text: settingsData?.logo_alt_text || "School Logo",
      primary_color: settingsData?.primary_color || "#0891b2",
      secondary_color: settingsData?.secondary_color || "#f97316",
      accent_color: settingsData?.accent_color || "#06b6d4",
      welcome_message: settingsData?.welcome_message,
      footer_text: settingsData?.footer_text,
    }
  } catch (error) {
    console.error("Error fetching school branding:", error)
    return {
      primary_color: "#0891b2",
      secondary_color: "#f97316",
      accent_color: "#06b6d4",
    }
  }
}

export async function updateSchoolBranding(schoolId: string, branding: SchoolBranding): Promise<boolean> {
  const supabase = createClient()

  try {
    // Update school info
    if (branding.school_email || branding.school_phone || branding.school_website || branding.address) {
      const { error: schoolError } = await supabase
        .from("schools")
        .update({
          school_email: branding.school_email,
          school_phone: branding.school_phone,
          school_website: branding.school_website,
          address: branding.address,
          updated_at: new Date(),
        })
        .eq("id", schoolId)

      if (schoolError) throw schoolError
    }

    // Update school settings
    const { error: settingsError } = await supabase
      .from("school_settings")
      .upsert({
        school_id: schoolId,
        logo_url: branding.logo_url,
        logo_alt_text: branding.logo_alt_text,
        primary_color: branding.primary_color,
        secondary_color: branding.secondary_color,
        accent_color: branding.accent_color,
        welcome_message: branding.welcome_message,
        footer_text: branding.footer_text,
        updated_at: new Date(),
      })
      .eq("school_id", schoolId)

    if (settingsError) throw settingsError
    return true
  } catch (error) {
    console.error("Error updating school branding:", error)
    return false
  }
}
