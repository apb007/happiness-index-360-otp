"use client"

interface AssessmentProgressProps {
  current: number
  total: number
}

export function AssessmentProgress({ current, total }: AssessmentProgressProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-border rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
