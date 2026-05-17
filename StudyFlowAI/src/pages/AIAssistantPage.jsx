import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Send, Plus } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { askAIAssistant, generateMotivationalQuote } from '../services/geminiService'
import { saveChatMessage, getUserChats, createTask, createHabit } from '../services/firestoreService'

export function AIAssistantPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedPrompts = [
    'How can I improve my study habits?',
    'What is the Pomodoro technique?',
    'How do I manage exam anxiety?',
    'What is the best way to take notes?'
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const loadChats = async () => {
      try {
        if (user?.uid) {
          const chats = await getUserChats(user.uid)
          const formattedMessages = chats.flatMap(chat => [
            { type: 'user', text: chat.message },
            { type: 'ai', text: chat.response }
          ])
          setMessages(formattedMessages)
        }
      } catch (error) {
        console.error('Error loading chats:', error)
      }
    }

    loadChats()
  }, [user])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return

    const userMessage = text
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setLoading(true)

    try {
      const response = await askAIAssistant(userMessage)
      
      let aiText = response;
      let parsed = null;
      try {
        const cleanJson = response.replace(/```json/gi, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleanJson);
        if (parsed.message) aiText = parsed.message;
        
        // Execute Agent Actions
        if (parsed.action === 'CREATE_TASK' && user?.uid) {
          await createTask(user.uid, {
            title: parsed.payload?.title || 'New Task',
            dueDate: parsed.payload?.dueDate || new Date().toISOString()
          });
          toast.success('Agent added a new task!');
        } else if (parsed.action === 'CREATE_HABIT' && user?.uid) {
          await createHabit(user.uid, {
            name: parsed.payload?.title || 'New Habit'
          });
          toast.success('Agent added a new habit!');
        }
      } catch (e) {
        console.error('AI response was not valid JSON agent format', e);
      }

      setMessages(prev => [...prev, { type: 'ai', text: aiText }])

      if (user?.uid) {
        await saveChatMessage(user.uid, userMessage, aiText)
      }
    } catch (error) {
      toast.error('Failed to get response')
      console.error(error)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <Header />
        
        <main className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold mb-2">Study Assistant</h1>
            <p className="text-slate-400">Chat with AI powered by Google Gemini</p>
          </motion.div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <h2 className="text-2xl font-bold mb-4">How can I help you?</h2>
                  <p className="text-slate-400 mb-8">Ask me anything about studying, productivity, or exam preparation</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestedPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(prompt)}
                        className="p-3 rounded-lg glassmorphism hover:bg-darkCard transition text-left"
                      >
                        <p className="text-sm">{prompt}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'glassmorphism'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="glassmorphism px-4 py-3 rounded-lg">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="glassmorphism p-4 rounded-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me something..."
                className="flex-1 bg-transparent outline-none"
                disabled={loading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="flex items-center gap-2"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AIAssistantPage