export interface DevChallengeApp {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
}

// Default to empty array until you add your actual DevChallenges repositories
export const DEV_CHALLENGES_APPS: DevChallengeApp[] = [];
