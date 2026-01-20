import { getSchoolBranding } from "@/lib/school-branding"
import Image from "next/image"

interface SchoolHeaderProps {
  schoolId: string
  showLogo?: boolean
}

export async function SchoolHeader({ schoolId, showLogo = true }: SchoolHeaderProps) {
  const branding = await getSchoolBranding(schoolId)

  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showLogo && branding.logo_url && (
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image
                src={branding.logo_url || "/placeholder.svg"}
                alt={branding.logo_alt_text || "School Logo"}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{branding.school_name}</h1>
            {branding.school_email && <p className="text-sm text-muted-foreground">{branding.school_email}</p>}
          </div>
        </div>
        {branding.school_phone && (
          <div className="text-sm text-muted-foreground text-right">
            <p>{branding.school_phone}</p>
          </div>
        )}
      </div>
    </div>
  )
}
