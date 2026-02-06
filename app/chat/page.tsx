'use client'

import { useState, useEffect, useRef } from 'react'
import { callAIAgent } from '@/lib/aiAgent'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Loader2,
  Send,
  History,
  Plus,
  Trash2,
  User,
  X,
  Globe,
  Database
} from 'lucide-react'

// Agent configuration
const AGENT_ID = '69858ad2e17e33c11eed19f5'

// TypeScript interfaces
interface AgentResult {
  answer: string
  sources: string[]
  related_topics: string[]
  confidence: string
  language: string
  information_source?: 'knowledge_base' | 'web_search' | 'combined'
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  related_topics?: string[]
  information_source?: string
  timestamp: Date
}

interface ConversationMeta {
  sessionId: string
  title: string
  lastUpdated: string
  messageCount: number
}

type Language = 'en' | 'hi'

// Markdown formatter
function formatMarkdown(text: string) {
  const lines = text.split('\n')
  const elements: JSX.Element[] = []
  let listItems: string[] = []
  let inList = false

  lines.forEach((line, index) => {
    if (line.match(/^\d+\.\s/)) {
      const content = line.replace(/^\d+\.\s/, '')
      listItems.push(content)
      inList = true
    } else if (inList && line.trim() === '') {
      elements.push(
        <ol key={`list-${index}`} className="list-decimal list-inside space-y-1.5 ml-4 my-3">
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ol>
      )
      listItems = []
      inList = false
    } else if (inList) {
      listItems[listItems.length - 1] += ' ' + line.trim()
    } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      const text = line.replace(/\*\*/g, '')
      elements.push(<h3 key={index} className="font-bold text-lg mt-4 mb-2">{text}</h3>)
    } else if (line.trim() === '') {
      elements.push(<br key={index} />)
    } else {
      elements.push(
        <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
      )
    }
  })

  if (listItems.length > 0) {
    elements.push(
      <ol key="list-final" className="list-decimal list-inside space-y-1.5 ml-4 my-3">
        {listItems.map((item, i) => (
          <li key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
        ))}
      </ol>
    )
  }

  return <div className="space-y-2">{elements}</div>
}

function formatInlineMarkdown(text: string): string {
  let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
  formatted = formatted.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
  formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
  return formatted
}

// Translations
const translations = {
  en: {
    title: 'Impact Saathi',
    subtitle: 'Your AI Guide to India AI Impact Summit 2026',
    placeholder: 'Ask about the summit, speakers, or IndiaAI initiatives...',
    send: 'Send',
    newChat: 'New Chat',
    history: 'History',
    welcomeTitle: 'Welcome to Impact Saathi',
    welcomeSubtitle: 'Your intelligent guide to India AI Impact Summit 2026',
    suggestions: [
      'Tell me about the summit schedule',
      'Who are the confirmed speakers?',
      'What is the IndiaAI Mission?'
    ],
    basedOn: 'Sources:',
    relatedTopics: 'Related topics:',
    typing: 'Impact Saathi is typing',
    noConversations: 'No previous conversations',
    conversationHistory: 'Conversation History',
    attendee: 'Summit Attendee',
    messages: 'messages'
  },
  hi: {
    title: 'इम्पैक्ट साथी',
    subtitle: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026 के लिए आपका AI गाइड',
    placeholder: 'सम्मेलन, वक्ताओं या IndiaAI पहलों के बारे में पूछें...',
    send: 'भेजें',
    newChat: 'नई चैट',
    history: 'इतिहास',
    welcomeTitle: 'इम्पैक्ट साथी में आपका स्वागत है',
    welcomeSubtitle: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026 के लिए आपका बुद्धिमान मार्गदर्शक',
    suggestions: [
      'मुझे कार्यक्रम के बारे में बताएं',
      'पुष्ट वक्ता कौन हैं?',
      'IndiaAI मिशन क्या है?'
    ],
    basedOn: 'स्रोत:',
    relatedTopics: 'संबंधित विषय:',
    typing: 'इम्पैक्ट साथी टाइप कर रहा है',
    noConversations: 'कोई पिछली बातचीत नहीं',
    conversationHistory: 'बातचीत का इतिहास',
    attendee: 'शिखर सम्मेलन में उपस्थित',
    messages: 'संदेश'
  }
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [sessionId, setSessionId] = useState(() => `session-${Date.now()}`)
  const [showHistory, setShowHistory] = useState(false)
  const [conversations, setConversations] = useState<ConversationMeta[]>([])
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = translations[language]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load conversations list
  const loadConversations = () => {
    const conversationList = localStorage.getItem('impact_saathi_conversations')
    if (conversationList) {
      try {
        setConversations(JSON.parse(conversationList))
      } catch (e) {
        console.error('Failed to load conversations:', e)
      }
    }
  }

  // Save conversation metadata
  const saveConversationMeta = (sid: string, msgCount: number, firstMessage?: string) => {
    const conversationList = localStorage.getItem('impact_saathi_conversations')
    let convos: ConversationMeta[] = conversationList ? JSON.parse(conversationList) : []

    const existingIndex = convos.findIndex(c => c.sessionId === sid)
    const title = firstMessage?.substring(0, 50) || 'New Conversation'

    const meta: ConversationMeta = {
      sessionId: sid,
      title,
      lastUpdated: new Date().toISOString(),
      messageCount: msgCount
    }

    if (existingIndex >= 0) {
      convos[existingIndex] = meta
    } else {
      convos.unshift(meta)
    }

    convos = convos.slice(0, 50)
    localStorage.setItem('impact_saathi_conversations', JSON.stringify(convos))
    setConversations(convos)
  }

  // Load a specific conversation
  const loadConversation = (sid: string) => {
    const savedMessages = localStorage.getItem(`impact_saathi_chat_${sid}`)
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
        setSessionId(sid)
        setShowHistory(false)
      } catch (e) {
        console.error('Failed to load conversation:', e)
      }
    }
  }

  // Delete a conversation
  const deleteConversation = (sid: string) => {
    localStorage.removeItem(`impact_saathi_chat_${sid}`)
    const conversationList = localStorage.getItem('impact_saathi_conversations')
    if (conversationList) {
      const convos: ConversationMeta[] = JSON.parse(conversationList)
      const filtered = convos.filter(c => c.sessionId !== sid)
      localStorage.setItem('impact_saathi_conversations', JSON.stringify(filtered))
      setConversations(filtered)
    }
    if (sid === sessionId) {
      startNewConversation()
    }
  }

  // Start new conversation
  const startNewConversation = () => {
    const newSessionId = `session-${Date.now()}`
    setSessionId(newSessionId)
    setMessages([])
    setShowHistory(false)
  }

  // Initialize user and load preferences
  useEffect(() => {
    let storedUserId = localStorage.getItem('impact_saathi_user_id')
    if (!storedUserId) {
      storedUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('impact_saathi_user_id', storedUserId)
    }
    setUserId(storedUserId)

    const savedLanguage = localStorage.getItem('impact_saathi_language') as Language | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage)
    }

    loadConversations()

    const savedMessages = localStorage.getItem(`impact_saathi_chat_${sessionId}`)
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      } catch (e) {
        console.error('Failed to load chat history:', e)
      }
    }
  }, [sessionId])

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`impact_saathi_chat_${sessionId}`, JSON.stringify(messages))
      const firstUserMessage = messages.find(m => m.role === 'user')?.content
      saveConversationMeta(sessionId, messages.length, firstUserMessage)
    }
  }, [messages, sessionId])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('impact_saathi_language', language)
  }, [language])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading || !userId) return

    setInput('')

    const languageInstruction = language === 'hi'
      ? '\n\n[Please respond in Hindi language]'
      : ''
    const messageWithLanguage = text + languageInstruction

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const result = await callAIAgent(messageWithLanguage, AGENT_ID, {
        user_id: userId,
        session_id: sessionId
      })

      if (result.success && result.response.status === 'success') {
        const agentResult = result.response.result as AgentResult

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: agentResult.answer || 'No response available',
          sources: agentResult.sources || [],
          related_topics: agentResult.related_topics || [],
          information_source: agentResult.information_source,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        const errorMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
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

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Chat Controls Bar */}
      <div className="border-b bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-2">
              {/* Mobile History Toggle */}
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="icon"
                className="lg:hidden"
              >
                {showHistory ? <X className="h-5 w-5" /> : <History className="h-5 w-5" />}
              </Button>

              {/* Desktop History Toggle */}
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="sm"
                className="hidden lg:flex"
              >
                <History className="h-4 w-4 mr-2" />
                {t.history}
              </Button>

              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {t.title}
              </span>
            </div>

            {/* Right Section */}
            <Button
              onClick={startNewConversation}
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t.newChat}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* History Sidebar */}
        {showHistory && (
          <aside className="w-full lg:w-80 border-r bg-background overflow-hidden flex flex-col absolute lg:relative inset-0 z-20 lg:z-0">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* User Profile */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{t.attendee}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          ID: {userId.substring(0, 20)}...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Separator />

                {/* Conversation History */}
                <div>
                  <h2 className="text-lg font-bold mb-3">{t.conversationHistory}</h2>
                  {conversations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.noConversations}</p>
                  ) : (
                    <div className="space-y-2">
                      {conversations.map((conv) => (
                        <Card
                          key={conv.sessionId}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            conv.sessionId === sessionId ? 'border-orange-500 bg-accent' : ''
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div
                                onClick={() => loadConversation(conv.sessionId)}
                                className="flex-1 min-w-0"
                              >
                                <p className="text-sm font-medium truncate">
                                  {conv.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {conv.messageCount} {t.messages} • {new Date(conv.lastUpdated).toLocaleDateString()}
                                </p>
                              </div>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteConversation(conv.sessionId)
                                }}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </aside>
        )}

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-4 py-6">
            <div className="container max-w-4xl mx-auto space-y-6">
              {/* Welcome Card */}
              {messages.length === 0 && (
                <Card className="border-orange-500/50">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        {t.welcomeTitle}
                      </h2>
                      <p className="text-muted-foreground">
                        {t.welcomeSubtitle}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {t.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(suggestion)}
                          className="w-full text-left px-4 py-3 rounded-lg border border-border hover:border-orange-500 hover:bg-accent transition-all font-medium text-sm sm:text-base"
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
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[85%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                    {message.role === 'user' ? (
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 sm:px-5 py-3 shadow-md">
                        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                          {message.content}
                        </p>
                        <p className="text-xs mt-1 opacity-75">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-4 sm:p-5">
                          <div className="break-words text-sm sm:text-base">
                            {formatMarkdown(message.content)}
                          </div>

                          {/* Information Source Badge */}
                          {message.information_source && (
                            <div className="mt-3 flex items-center gap-2 text-xs">
                              {message.information_source === 'web_search' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                  <Globe className="w-3 h-3" />
                                  Web Search
                                </span>
                              )}
                              {message.information_source === 'knowledge_base' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                  <Database className="w-3 h-3" />
                                  Knowledge Base
                                </span>
                              )}
                              {message.information_source === 'combined' && (
                                <>
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                    <Database className="w-3 h-3" />
                                    KB
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                    <Globe className="w-3 h-3" />
                                    Web
                                  </span>
                                </>
                              )}
                            </div>
                          )}

                          {/* Sources */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t">
                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                {t.basedOn}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.sources.map((source, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded border border-orange-200 dark:border-orange-800"
                                  >
                                    {source}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Related Topics */}
                          {message.related_topics && message.related_topics.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                {t.relatedTopics}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.related_topics.map((topic, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleSendMessage(topic)}
                                    disabled={isLoading}
                                    className="text-sm px-3 py-1.5 border border-orange-500 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {topic}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground mt-3">
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
                  <Card className="max-w-[85%]">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                        <span className="text-sm">{t.typing}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Footer */}
          <div className="border-t bg-background p-4">
            <div className="container max-w-4xl mx-auto">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.placeholder}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6"
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
          </div>
        </main>
      </div>
    </div>
  )
}
