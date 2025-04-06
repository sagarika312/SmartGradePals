
import { toast } from 'sonner';

// Type definitions
type GradeLevel = 'middle' | 'high' | 'college' | 'graduate';

type FeedbackData = {
  score: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  grammarFeedback: { issue: string; suggestion: string }[];
};

// Mock AI service functions - in a real app, these would call the Gemini API
export const gradeEssay = async (
  essayText: string,
  prompt: string,
  gradeLevel: string,
  title: string
): Promise<FeedbackData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is a mock implementation
  // In a real app, we would:
  // 1. Send the essay to a backend API
  // 2. The backend would contain the API key and call the Gemini API
  // 3. Process the response and return it to the frontend
  
  console.log(`Grading essay: ${title}`, { essayLength: essayText.length, gradeLevel, hasPrompt: !!prompt });
  
  // Generate mock feedback based on essay length for demo
  let score = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
  
  // Simple heuristic for demo - longer essays get slightly better scores
  if (essayText.length > 1000) {
    score += 5;
  }
  
  // Cap at 100
  score = Math.min(score, 100);
  
  return {
    score,
    overallFeedback: generateOverallFeedback(score),
    strengths: generateStrengths(),
    improvements: generateImprovements(),
    grammarFeedback: generateGrammarFeedback(),
  };
};

// Helper functions to generate mock feedback
function generateOverallFeedback(score: number): string {
  if (score >= 90) {
    return "This is an excellent essay that demonstrates strong analytical skills, clear organization, and effective use of evidence. The arguments are well-developed and the writing is sophisticated.";
  } else if (score >= 80) {
    return "This is a good essay that shows solid understanding of the topic. The arguments are generally well-presented, though there is room for improvement in terms of depth of analysis and clarity of expression.";
  } else {
    return "This essay demonstrates some understanding of the topic but would benefit from more focused arguments, better organization, and more thorough analysis. There are also some issues with grammar and style that need attention.";
  }
}

function generateStrengths(): string[] {
  return [
    "Strong thesis statement that clearly outlines the main argument",
    "Effective use of evidence to support key points",
    "Good paragraph structure with clear topic sentences",
    "Appropriate academic tone and vocabulary",
    "Thoughtful engagement with counter-arguments"
  ].sort(() => 0.5 - Math.random()).slice(0, 3);
}

function generateImprovements(): string[] {
  return [
    "Strengthen transitions between paragraphs to improve flow",
    "Provide more specific examples to support your arguments",
    "Consider alternative perspectives to deepen analysis",
    "Clarify your conclusion to better reinforce your thesis",
    "Vary sentence structure to improve readability",
    "Add more critical analysis rather than description"
  ].sort(() => 0.5 - Math.random()).slice(0, 3);
}

function generateGrammarFeedback(): { issue: string; suggestion: string }[] {
  const possibleFeedback = [
    {
      issue: "Inconsistent verb tense throughout the essay",
      suggestion: "Maintain consistent verb tense, using past tense for historical events and present tense for ongoing analysis"
    },
    {
      issue: "Overuse of passive voice",
      suggestion: "Use active voice more frequently to make your writing more direct and engaging"
    },
    {
      issue: "Run-on sentences in several paragraphs",
      suggestion: "Break longer sentences into smaller ones for clarity, or use appropriate punctuation like semicolons"
    },
    {
      issue: "Occasional subject-verb agreement errors",
      suggestion: "Ensure that singular subjects take singular verbs and plural subjects take plural verbs"
    },
    {
      issue: "Comma splices connecting independent clauses",
      suggestion: "Use conjunctions, semicolons, or periods instead of commas to join independent clauses"
    }
  ];
  
  return possibleFeedback.sort(() => 0.5 - Math.random()).slice(0, 2);
}

// Function for creating and formatting AI prompts
export const createGeminiPrompt = (essayText: string, prompt: string, gradeLevel: GradeLevel): string => {
  // This would create a properly formatted prompt for the Gemini API
  // In a production app, we would send this to the backend
  const systemPrompt = `
    You are an experienced educator with expertise in ${gradeLevel} level writing. 
    Evaluate the following essay ${prompt ? 'that responds to this prompt: ' + prompt : ''}.
    Provide a comprehensive assessment including:
    1. An overall score out of 100
    2. General feedback on the essay's quality
    3. Three specific strengths
    4. Three areas for improvement
    5. Specific grammar and style suggestions
  `;
  
  return `${systemPrompt}\n\nESSAY:\n${essayText}`;
};

// Example of how we'd implement the actual Gemini API call on a backend server:
/*
async function callGeminiAPI(prompt: string) {
  try {
    // This would be on a backend server to protect the API key
    const API_KEY = process.env.GEMINI_API_KEY;
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
*/
