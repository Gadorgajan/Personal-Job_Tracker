export type ApplicationStage = 'draft' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  industry?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  salary?: string;
  url?: string;
  notes?: string;
}

export interface Application {
  id: string;
  jobId: string;
  companyId: string;
  stage: ApplicationStage;
  appliedDate?: string;
  lastUpdated: string;
  createdAt: string;
  // Denormalized for convenience
  jobTitle: string;
  companyName: string;
  location: string;
  salary?: string;
  type: 'remote' | 'hybrid' | 'onsite';
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  companyId: string;
  email?: string;
  linkedin?: string;
}

export interface Task {
  id: string;
  applicationId?: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  type: 'interview' | 'follow-up' | 'preparation' | 'other';
  // Denormalized
  companyName?: string;
  jobTitle?: string;
}

export interface AnalyticsData {
  totalApplications: number;
  thisWeek: number;
  interviewRate: number;
  offerRate: number;
  avgTimeToInterview: number;
  stageDistribution: Record<ApplicationStage, number>;
  weeklyApplications: { week: string; count: number }[];
}

export const STAGE_ORDER: ApplicationStage[] = ['draft', 'applied', 'interview', 'offer', 'rejected'];

export const STAGE_LABELS: Record<ApplicationStage, string> = {
  draft: 'Draft',
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};
