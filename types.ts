
export interface ResearchTopic {
  id: string;
  title: string;
  author: string;
  tags: string[];
  description: string;
  likes: number;
}

export interface BrainstormResult {
  problem: string;
  suggestedSolution: string;
  technologies: string[];
  collaborativeSteps: string[];
}
