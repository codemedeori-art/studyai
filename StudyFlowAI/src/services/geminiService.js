import axios from 'axios'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export const generateStudySchedule = async (subjects, examDates, weakTopics, availableHours) => {
  const prompt = `Create a detailed 7-day study schedule for a student with:
- Subjects: ${subjects.join(', ')}
- Exam dates: ${examDates.join(', ')}
- Weak topics: ${weakTopics.join(', ')}
- Available study hours per day: ${availableHours}

You MUST return the response ONLY as a valid JSON object matching this exact schema, with NO markdown formatting, NO backticks, and NO extra text:
{
  "schedule": [
    {
      "day": "Day 1 (Monday)",
      "focus": "Main focus for the day",
      "sessions": [
        {
          "time": "09:00 AM - 11:00 AM",
          "subject": "Mathematics",
          "topic": "Calculus Fundamentals",
          "type": "Study" // can be Study, Break, or Revision
        }
      ]
    }
  ]
}`

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    )

    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error generating study schedule:', error)
    throw error
  }
}

export const askAIAssistant = async (message) => {
  const prompt = `You are StudyFlow AI, an advanced, fully functional agentic study assistant. 
You don't just give advice—you can actually execute actions on behalf of the user!

When the user asks you to do something, you MUST respond ONLY with a valid JSON object in this exact format (no markdown, no backticks):
{
  "action": "CREATE_TASK" | "CREATE_HABIT" | "NONE",
  "payload": { },
  "message": "The message to show to the user"
}

Actions you can take:
1. CREATE_TASK: if the user asks you to add a task, to-do, or reminder. 
   Payload schema: { "title": "string", "dueDate": "YYYY-MM-DD" }
2. CREATE_HABIT: if the user asks you to track a habit.
   Payload schema: { "title": "string" }
3. NONE: if you are just chatting, answering a question, or giving advice.

Example 1:
User: "Remind me to study physics tomorrow"
Response: { "action": "CREATE_TASK", "payload": { "title": "Study physics", "dueDate": "2024-10-15" }, "message": "I've added a task for you to study physics tomorrow!" }

Example 2:
User: "How do I beat procrastination?"
Response: { "action": "NONE", "payload": {}, "message": "Here are 3 tips to beat procrastination..." }

User's message:
${message}`

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    )

    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw error
  }
}

export const generateMotivationalQuote = async () => {
  const prompt = `Generate a short, inspiring motivational quote for a student studying hard. Make it motivating, concise (under 20 words), and relevant to academic success. Just provide the quote, nothing else.`

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    )

    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error generating quote:', error)
    throw error
  }
}