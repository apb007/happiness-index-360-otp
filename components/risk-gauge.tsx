"use client"

interface RiskGaugeProps {
  score: number
  riskLevel: "low" | "moderate" | "high" | "critical"
  size?: "sm" | "md" | "lg"
}

export function RiskGauge({ score, riskLevel, size = "md" }: RiskGaugeProps) {
  const sizeMap = {
    sm: { container: "w-24 h-24", text: "text-lg" },
    md: { container: "w-32 h-32", text: "text-2xl" },
    lg: { container: "w-40 h-40", text: "text-3xl" },
  }

  const colorMap = {
    low: "text-green-600",
    moderate: "text-yellow-600",
    high: "text-orange-600",
    critical: "text-red-600",
  }

  const bgColorMap = {
    low: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
    moderate: "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
    high: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
    critical: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
  }

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`flex items-center justify-center`}>
      <div className={`relative ${sizeMap[size].container}`}>
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${colorMap[riskLevel]}`}
          />
        </svg>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b ${bgColorMap[riskLevel]} rounded-full`}
        >
          <span className={`font-bold ${colorMap[riskLevel]} ${sizeMap[size].text}`}>{Math.round(score)}%</span>
          <span className={`text-xs capitalize ${colorMap[riskLevel]} opacity-80`}>{riskLevel}</span>
        </div>
      </div>
    </div>
  )
}
