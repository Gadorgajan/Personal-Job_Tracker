import { Application, Task, AnalyticsData } from './types';

export const mockApplications: Application[] = [
  {
    id: '1', jobId: 'j1', companyId: 'c1', stage: 'draft',
    lastUpdated: '2026-02-24', createdAt: '2026-02-24',
    jobTitle: 'Senior Frontend Engineer', companyName: 'Stripe', location: 'San Francisco, CA', salary: '$180k–$220k', type: 'hybrid',
  },
  {
    id: '2', jobId: 'j2', companyId: 'c2', stage: 'applied',
    appliedDate: '2026-02-20', lastUpdated: '2026-02-20', createdAt: '2026-02-18',
    jobTitle: 'Full-Stack Developer', companyName: 'Vercel', location: 'Remote', salary: '$160k–$200k', type: 'remote',
  },
  {
    id: '3', jobId: 'j3', companyId: 'c3', stage: 'applied',
    appliedDate: '2026-02-19', lastUpdated: '2026-02-19', createdAt: '2026-02-17',
    jobTitle: 'Software Engineer II', companyName: 'Figma', location: 'New York, NY', salary: '$170k–$210k', type: 'hybrid',
  },
  {
    id: '4', jobId: 'j4', companyId: 'c4', stage: 'interview',
    appliedDate: '2026-02-10', lastUpdated: '2026-02-22', createdAt: '2026-02-08',
    jobTitle: 'React Developer', companyName: 'Linear', location: 'Remote', salary: '$150k–$190k', type: 'remote',
  },
  {
    id: '5', jobId: 'j5', companyId: 'c5', stage: 'interview',
    appliedDate: '2026-02-12', lastUpdated: '2026-02-23', createdAt: '2026-02-10',
    jobTitle: 'Frontend Architect', companyName: 'Notion', location: 'San Francisco, CA', salary: '$200k–$250k', type: 'hybrid',
  },
  {
    id: '6', jobId: 'j6', companyId: 'c6', stage: 'offer',
    appliedDate: '2026-01-28', lastUpdated: '2026-02-24', createdAt: '2026-01-25',
    jobTitle: 'Staff Engineer', companyName: 'Shopify', location: 'Remote', salary: '$220k–$280k', type: 'remote',
  },
  {
    id: '7', jobId: 'j7', companyId: 'c7', stage: 'rejected',
    appliedDate: '2026-02-05', lastUpdated: '2026-02-18', createdAt: '2026-02-03',
    jobTitle: 'Platform Engineer', companyName: 'Datadog', location: 'Boston, MA', type: 'onsite',
  },
  {
    id: '8', jobId: 'j8', companyId: 'c8', stage: 'rejected',
    appliedDate: '2026-02-01', lastUpdated: '2026-02-15', createdAt: '2026-01-30',
    jobTitle: 'UI Engineer', companyName: 'Airbnb', location: 'San Francisco, CA', salary: '$190k–$230k', type: 'hybrid',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1', applicationId: '4', title: 'Technical Interview - Round 2',
    description: 'System design round with senior engineer', dueDate: '2026-02-26',
    isCompleted: false, type: 'interview', companyName: 'Linear', jobTitle: 'React Developer',
  },
  {
    id: 't2', applicationId: '5', title: 'Prepare case study presentation',
    description: 'Frontend architecture case study', dueDate: '2026-02-27',
    isCompleted: false, type: 'preparation', companyName: 'Notion', jobTitle: 'Frontend Architect',
  },
  {
    id: 't3', applicationId: '6', title: 'Review offer details & negotiate',
    dueDate: '2026-02-28', isCompleted: false, type: 'follow-up',
    companyName: 'Shopify', jobTitle: 'Staff Engineer',
  },
  {
    id: 't4', applicationId: '2', title: 'Follow up on application status',
    dueDate: '2026-02-25', isCompleted: false, type: 'follow-up',
    companyName: 'Vercel', jobTitle: 'Full-Stack Developer',
  },
  {
    id: 't5', applicationId: '4', title: 'Send thank-you email after interview',
    dueDate: '2026-02-23', isCompleted: true, type: 'follow-up',
    companyName: 'Linear', jobTitle: 'React Developer',
  },
];

export const mockAnalytics: AnalyticsData = {
  totalApplications: 8,
  thisWeek: 2,
  interviewRate: 25,
  offerRate: 12.5,
  avgTimeToInterview: 12,
  stageDistribution: { draft: 1, applied: 2, interview: 2, offer: 1, rejected: 2 },
  weeklyApplications: [
    { week: 'Jan 20', count: 3 },
    { week: 'Jan 27', count: 5 },
    { week: 'Feb 3', count: 4 },
    { week: 'Feb 10', count: 6 },
    { week: 'Feb 17', count: 3 },
    { week: 'Feb 24', count: 2 },
  ],
};
