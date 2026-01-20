// Raw score range: 32 (min, all 1s) to 160 (max, all 5s)
// Scaled score range: 0 to 100

export interface ScoringConfig {
  maxRawScore: number
  minRawScore: number
  thresholds: {
    critical: number
    high: number
    moderate: number
    low: number
  }
}

const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  maxRawScore: 160, // 32 questions × 5 points each
  minRawScore: 32, // 32 questions × 1 point each
  thresholds: {
    critical: 75, // 75-100 (scaled score)
    high: 50, // 50-75
    moderate: 25, // 25-50
    low: 0, // 0-25
  },
}

export function calculateScore(responses: Record<string, number>, config: ScoringConfig = DEFAULT_SCORING_CONFIG) {
  const totalScore = Object.values(responses).reduce((sum, value) => sum + value, 0)

  // Scale raw score from [32, 160] to [0, 100]
  const scaledScore = ((totalScore - config.minRawScore) / (config.maxRawScore - config.minRawScore)) * 100

  return {
    raw: totalScore,
    scaled: Math.round(scaledScore * 10) / 10, // Round to 1 decimal place
    maxRawScore: config.maxRawScore,
    minRawScore: config.minRawScore,
  }
}

export function determineRiskLevel(
  scaledScore: number,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG,
): "low" | "moderate" | "high" | "critical" {
  if (scaledScore >= config.thresholds.critical) return "critical"
  if (scaledScore >= config.thresholds.high) return "high"
  if (scaledScore >= config.thresholds.moderate) return "moderate"
  return "low"
}

export function getInterpretation(riskLevel: "low" | "moderate" | "high" | "critical") {
  const interpretations: Record<string, string> = {
    low: "Your Happiness Index indicates strong emotional wellbeing. Continue your positive habits to maintain this excellent state.",
    moderate:
      "Your Happiness Index suggests some areas of concern. Consider connecting with a school counselor to discuss ways to improve your wellbeing.",
    high: "Your Happiness Index indicates significant challenges. We recommend speaking with a counselor who can provide support and guidance.",
    critical:
      "Your Happiness Index shows urgent concerns about your mental health. Please reach out to a mental health professional or crisis resource immediately.",
  }

  return interpretations[riskLevel]
}

export function getScoreAnalysis(scaledScore: number) {
  const categories: Record<string, { min: number; max: number; description: string }> = {
    "0-25": {
      min: 0,
      max: 25,
      description: "Critical - Immediate support recommended. Your wellbeing is significantly affected.",
    },
    "25-50": {
      min: 25,
      max: 50,
      description: "High - Notable concerns. Professional support would be beneficial.",
    },
    "50-75": {
      min: 50,
      max: 75,
      description: "Moderate - Some areas need attention. Seeking support is recommended.",
    },
    "75-100": {
      min: 75,
      max: 100,
      description: "Excellent - Strong emotional wellbeing. Keep up your positive practices.",
    },
  }

  for (const [range, info] of Object.entries(categories)) {
    if (scaledScore >= info.min && scaledScore <= info.max) {
      return info.description
    }
  }

  return ""
}
