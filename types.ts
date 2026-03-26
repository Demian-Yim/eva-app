export interface UserInput {
  job: string;
  rank: string;
  style: string;
  painPoint: string;
}

export interface DetailedDesign {
  structure: string[];
  buttons: string[];
  dataStructure: string;
  flow: string;
  aiFeatures: string[];
}

export interface PromptData {
  appName: string;
  purpose: string;
  techStack: string;
  requirements: string;
  components: string;
  dataModel: string;
  stepByStepImplementation: string;
  finalRequest: string;
}

export interface AppRecommendation {
  id: number;
  name: string;
  description: string;
  features: string[];
  targetAudience: string;
  difficulty: string;
  detailedDesign: DetailedDesign;
  prompt: PromptData;
}

export interface Advice {
  improvements: string[];
  limitations: string[];
  finalWord: string;
}

export interface EvaResponse {
  userUnderstanding: string;
  recommendations: AppRecommendation[];
  advice: Advice;
}
