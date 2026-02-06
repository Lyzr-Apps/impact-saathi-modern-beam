'use client'

import { useState, useEffect, useRef } from 'react'
import { callAIAgent } from '@/lib/aiAgent'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Send } from 'lucide-react'

// Agent configuration
const AGENT_ID = '69858ad2e17e33c11eed19f5'

// TypeScript interfaces from actual agent response schema
interface AgentResult {
  answer: string
  sources: string[]
  related_topics: string[]
  confidence: string
  language: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  related_topics?: string[]
  timestamp: Date
}

// Simple markdown formatter component
function formatMarkdown(text: string) {
  // Convert markdown to HTML-like React elements
  const lines = text.split('\n')
  const elements: JSX.Element[] = []
  let listItems: string[] = []
  let inList = false

  lines.forEach((line, index) => {
    // Handle numbered lists
    if (line.match(/^\d+\.\s/)) {
      const content = line.replace(/^\d+\.\s/, '')
      listItems.push(content)
      inList = true
    } else if (inList && line.trim() === '') {
      // End of list
      elements.push(
        <ol key={`list-${index}`} className="list-decimal list-inside space-y-1 ml-4 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ol>
      )
      listItems = []
      inList = false
    } else if (inList) {
      // Continue list item content
      listItems[listItems.length - 1] += ' ' + line.trim()
    } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      // Subheading
      const text = line.replace(/\*\*/g, '')
      elements.push(<h3 key={index} className="font-bold text-lg mt-3 mb-1">{text}</h3>)
    } else if (line.trim() === '') {
      // Empty line
      elements.push(<br key={index} />)
    } else {
      // Regular paragraph
      elements.push(
        <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
      )
    }
  })

  // Handle remaining list items
  if (listItems.length > 0) {
    elements.push(
      <ol key="list-final" className="list-decimal list-inside space-y-1 ml-4 my-2">
        {listItems.map((item, i) => (
          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
        ))}
      </ol>
    )
  }

  return <div className="space-y-2">{elements}</div>
}

function formatInlineMarkdown(text: string): string {
  // Convert **bold** to <strong>
  let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
  // Convert inline code
  formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
  return formatted
}

// Language type
type Language = 'en' | 'hi'

// Translation strings
const translations = {
  en: {
    title: 'Impact Saathi',
    placeholder: 'Ask about the summit, speakers, or IndiaAI initiatives...',
    send: 'Send',
    welcomeTitle: 'Welcome to Impact Saathi',
    welcomeSubtitle: 'Your guide to India AI Impact Summit 2026',
    suggestions: [
      'Tell me about the schedule',
      'Who are the speakers?',
      'What is IndiaAI Mission?'
    ],
    basedOn: 'Based on:',
    relatedTopics: 'Related topics:',
    typing: 'Impact Saathi is typing'
  },
  hi: {
    title: 'इम्पैक्ट साथी',
    placeholder: 'सम्मेलन, वक्ताओं या IndiaAI पहलों के बारे में पूछें...',
    send: 'भेजें',
    welcomeTitle: 'इम्पैक्ट साथी में आपका स्वागत है',
    welcomeSubtitle: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026 के लिए आपका मार्गदर्शक',
    suggestions: [
      'मुझे कार्यक्रम के बारे में बताएं',
      'वक्ता कौन हैं?',
      'IndiaAI मिशन क्या है?'
    ],
    basedOn: 'आधारित:',
    relatedTopics: 'संबंधित विषय:',
    typing: 'इम्पैक्ट साथी टाइप कर रहा है'
  }
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = translations[language]

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    // Clear input
    setInput('')

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Call agent
      const result = await callAIAgent(text, AGENT_ID, { session_id: sessionId })

      if (result.success && result.response.status === 'success') {
        const agentResult = result.response.result as AgentResult

        // Add assistant message
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: agentResult.answer || 'No response available',
          sources: agentResult.sources || [],
          related_topics: agentResult.related_topics || [],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        // Error handling
        const errorMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      // Network error handling
      const errorMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered a network error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF9933] to-[#FF6600] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">IS</span>
            </div>
            <h1 className="text-2xl font-bold text-[#000080]">{t.title}</h1>
          </div>

          {/* Language Toggle */}
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="font-semibold border-[#FF9933] text-[#000080] hover:bg-[#FF9933] hover:text-white transition-colors"
          >
            {language === 'en' ? 'हिं' : 'EN'}
          </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 mt-16 mb-24 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Welcome Card */}
          {messages.length === 0 && (
            <Card className="mb-6 border-[#FF9933] shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-[#000080] mb-2">
                    {t.welcomeTitle}
                  </h2>
                  <p className="text-gray-600">
                    {t.welcomeSubtitle}
                  </p>
                </div>

                {/* Quick Start Suggestions */}
                <div className="space-y-3">
                  {t.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#FF9933] hover:bg-orange-50 transition-all text-[#000080] font-medium"
                      disabled={isLoading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                  {/* Message Bubble */}
                  {message.role === 'user' ? (
                    <div className="bg-[#3B82F6] text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-md">
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="text-xs text-blue-100 mt-1 opacity-75">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  ) : (
                    <Card className="shadow-md border-gray-200">
                      <CardContent className="p-5">
                        <div className="text-[#000080] break-words">
                          {formatMarkdown(message.content)}
                        </div>

                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-2">
                              {t.basedOn}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.sources.map((source, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-orange-50 text-[#FF9933] rounded border border-[#FF9933]"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Related Topics Chips */}
                        {message.related_topics && message.related_topics.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-600 mb-2">
                              {t.relatedTopics}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {message.related_topics.map((topic, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSendMessage(topic)}
                                  disabled={isLoading}
                                  className="text-sm px-3 py-1.5 bg-white border border-[#FF9933] text-[#FF9933] rounded-full hover:bg-[#FF9933] hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {topic}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-gray-400 mt-2">
                          {formatTime(message.timestamp)}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="shadow-md border-gray-200 max-w-[85%]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#FF9933] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-[#FF9933] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-[#FF9933] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-sm">{t.typing}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Fixed Input Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1 border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933] text-[#000080] placeholder:text-gray-400"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-[#FF9933] hover:bg-[#FF6600] text-white px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="ml-2 hidden sm:inline">{t.send}</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
