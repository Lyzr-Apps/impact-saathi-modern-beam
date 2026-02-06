'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, MapPin, Users } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    title: 'Summit Schedule',
    subtitle: 'Three days of innovation, networking, and knowledge sharing',
    day1: 'Day 1',
    day2: 'Day 2',
    day3: 'Day 3',
    all: 'All Days'
  },
  hi: {
    title: 'कार्यक्रम अनुसूची',
    subtitle: 'नवाचार, नेटवर्किंग और ज्ञान साझाकरण के तीन दिन',
    day1: 'दिन 1',
    day2: 'दिन 2',
    day3: 'दिन 3',
    all: 'सभी दिन'
  }
}

const scheduleData = {
  en: {
    day1: [
      {
        time: '09:00 - 10:00',
        title: 'Registration & Welcome Coffee',
        location: 'Main Lobby',
        type: 'Registration',
        speakers: []
      },
      {
        time: '10:00 - 11:30',
        title: 'Opening Keynote: The Future of AI in India',
        location: 'Main Auditorium',
        type: 'Keynote',
        speakers: ['Dr. Rajesh Kumar', 'Minister of Technology']
      },
      {
        time: '11:30 - 12:00',
        title: 'Coffee Break & Networking',
        location: 'Exhibition Hall',
        type: 'Break',
        speakers: []
      },
      {
        time: '12:00 - 13:30',
        title: 'Panel Discussion: AI Ethics and Governance',
        location: 'Conference Room A',
        type: 'Panel',
        speakers: ['Prof. Anita Sharma', 'Dr. Vikram Patel', 'Sarah Chen']
      },
      {
        time: '13:30 - 14:30',
        title: 'Lunch Break',
        location: 'Dining Hall',
        type: 'Break',
        speakers: []
      },
      {
        time: '14:30 - 16:00',
        title: 'Workshop: Building AI Solutions with IndiaAI Compute',
        location: 'Workshop Room 1',
        type: 'Workshop',
        speakers: ['Tech Team IndiaAI']
      },
      {
        time: '16:00 - 17:30',
        title: 'Startup Pitch Session: AI Innovations',
        location: 'Innovation Stage',
        type: 'Presentation',
        speakers: ['10+ AI Startups']
      }
    ],
    day2: [
      {
        time: '09:00 - 10:30',
        title: 'Keynote: AI in Healthcare and Life Sciences',
        location: 'Main Auditorium',
        type: 'Keynote',
        speakers: ['Dr. Priya Menon', 'AIIMS Director']
      },
      {
        time: '10:30 - 11:00',
        title: 'Coffee Break',
        location: 'Exhibition Hall',
        type: 'Break',
        speakers: []
      },
      {
        time: '11:00 - 12:30',
        title: 'Technical Session: Large Language Models',
        location: 'Tech Theater',
        type: 'Technical',
        speakers: ['Dr. Amit Singh', 'Research Lead OpenAI']
      },
      {
        time: '12:30 - 14:00',
        title: 'Lunch & Demo Showcase',
        location: 'Dining Hall & Exhibition',
        type: 'Break',
        speakers: []
      },
      {
        time: '14:00 - 15:30',
        title: 'Workshop: AI for Agriculture and Rural Development',
        location: 'Workshop Room 2',
        type: 'Workshop',
        speakers: ['Ministry of Agriculture Team']
      },
      {
        time: '15:30 - 17:00',
        title: 'Panel: AI and Job Creation in India',
        location: 'Conference Room B',
        type: 'Panel',
        speakers: ['Industry Leaders', 'Policy Makers']
      },
      {
        time: '17:30 - 19:00',
        title: 'Networking Reception',
        location: 'Rooftop Lounge',
        type: 'Networking',
        speakers: []
      }
    ],
    day3: [
      {
        time: '09:00 - 10:30',
        title: 'Keynote: IndiaAI Mission - Progress and Future',
        location: 'Main Auditorium',
        type: 'Keynote',
        speakers: ['Secretary, MeitY']
      },
      {
        time: '10:30 - 11:00',
        title: 'Coffee Break',
        location: 'Exhibition Hall',
        type: 'Break',
        speakers: []
      },
      {
        time: '11:00 - 12:30',
        title: 'AI Safety and Security Workshop',
        location: 'Security Lab',
        type: 'Workshop',
        speakers: ['Cybersecurity Experts']
      },
      {
        time: '12:30 - 14:00',
        title: 'Lunch Break',
        location: 'Dining Hall',
        type: 'Break',
        speakers: []
      },
      {
        time: '14:00 - 15:30',
        title: 'Fireside Chat: Global AI Leaders',
        location: 'Main Auditorium',
        type: 'Fireside',
        speakers: ['International AI Pioneers']
      },
      {
        time: '15:30 - 16:30',
        title: 'Closing Ceremony & Awards',
        location: 'Main Auditorium',
        type: 'Ceremony',
        speakers: ['Summit Organizers']
      },
      {
        time: '16:30 - 17:00',
        title: 'Vote of Thanks & Networking',
        location: 'Main Lobby',
        type: 'Closing',
        speakers: []
      }
    ]
  },
  hi: {
    day1: [
      {
        time: '09:00 - 10:00',
        title: 'पंजीकरण और स्वागत कॉफी',
        location: 'मुख्य लॉबी',
        type: 'पंजीकरण',
        speakers: []
      },
      {
        time: '10:00 - 11:30',
        title: 'उद्घाटन भाषण: भारत में AI का भविष्य',
        location: 'मुख्य सभागार',
        type: 'मुख्य भाषण',
        speakers: ['डॉ. राजेश कुमार', 'प्रौद्योगिकी मंत्री']
      },
      {
        time: '11:30 - 12:00',
        title: 'कॉफी ब्रेक और नेटवर्किंग',
        location: 'प्रदर्शनी हॉल',
        type: 'विराम',
        speakers: []
      },
      {
        time: '12:00 - 13:30',
        title: 'पैनल चर्चा: AI नैतिकता और शासन',
        location: 'सम्मेलन कक्ष A',
        type: 'पैनल',
        speakers: ['प्रो. अनीता शर्मा', 'डॉ. विक्रम पटेल', 'सारा चेन']
      },
      {
        time: '13:30 - 14:30',
        title: 'दोपहर का भोजन विराम',
        location: 'भोजन कक्ष',
        type: 'विराम',
        speakers: []
      },
      {
        time: '14:30 - 16:00',
        title: 'कार्यशाला: IndiaAI कंप्यूट के साथ AI समाधान',
        location: 'कार्यशाला कक्ष 1',
        type: 'कार्यशाला',
        speakers: ['IndiaAI तकनीकी टीम']
      },
      {
        time: '16:00 - 17:30',
        title: 'स्टार्टअप पिच: AI नवाचार',
        location: 'नवाचार मंच',
        type: 'प्रस्तुति',
        speakers: ['10+ AI स्टार्टअप']
      }
    ],
    day2: [
      {
        time: '09:00 - 10:30',
        title: 'मुख्य भाषण: स्वास्थ्य में AI',
        location: 'मुख्य सभागार',
        type: 'मुख्य भाषण',
        speakers: ['डॉ. प्रिया मेनन', 'AIIMS निदेशक']
      },
      {
        time: '10:30 - 11:00',
        title: 'कॉफी ब्रेक',
        location: 'प्रदर्शनी हॉल',
        type: 'विराम',
        speakers: []
      },
      {
        time: '11:00 - 12:30',
        title: 'तकनीकी सत्र: बड़े भाषा मॉडल',
        location: 'टेक थिएटर',
        type: 'तकनीकी',
        speakers: ['डॉ. अमित सिंह', 'OpenAI शोध प्रमुख']
      },
      {
        time: '12:30 - 14:00',
        title: 'दोपहर का भोजन और प्रदर्शन',
        location: 'भोजन कक्ष और प्रदर्शनी',
        type: 'विराम',
        speakers: []
      },
      {
        time: '14:00 - 15:30',
        title: 'कार्यशाला: कृषि के लिए AI',
        location: 'कार्यशाला कक्ष 2',
        type: 'कार्यशाला',
        speakers: ['कृषि मंत्रालय टीम']
      },
      {
        time: '15:30 - 17:00',
        title: 'पैनल: भारत में AI और रोजगार',
        location: 'सम्मेलन कक्ष B',
        type: 'पैनल',
        speakers: ['उद्योग नेता', 'नीति निर्माता']
      },
      {
        time: '17:30 - 19:00',
        title: 'नेटवर्किंग रिसेप्शन',
        location: 'रूफटॉप लाउंज',
        type: 'नेटवर्किंग',
        speakers: []
      }
    ],
    day3: [
      {
        time: '09:00 - 10:30',
        title: 'मुख्य भाषण: IndiaAI मिशन',
        location: 'मुख्य सभागार',
        type: 'मुख्य भाषण',
        speakers: ['सचिव, MeitY']
      },
      {
        time: '10:30 - 11:00',
        title: 'कॉफी ब्रेक',
        location: 'प्रदर्शनी हॉल',
        type: 'विराम',
        speakers: []
      },
      {
        time: '11:00 - 12:30',
        title: 'AI सुरक्षा कार्यशाला',
        location: 'सुरक्षा प्रयोगशाला',
        type: 'कार्यशाला',
        speakers: ['साइबर सुरक्षा विशेषज्ञ']
      },
      {
        time: '12:30 - 14:00',
        title: 'दोपहर का भोजन विराम',
        location: 'भोजन कक्ष',
        type: 'विराम',
        speakers: []
      },
      {
        time: '14:00 - 15:30',
        title: 'फायरसाइड चैट: वैश्विक AI नेता',
        location: 'मुख्य सभागार',
        type: 'फायरसाइड',
        speakers: ['अंतर्राष्ट्रीय AI अग्रदूत']
      },
      {
        time: '15:30 - 16:30',
        title: 'समापन समारोह और पुरस्कार',
        location: 'मुख्य सभागार',
        type: 'समारोह',
        speakers: ['शिखर सम्मेलन आयोजक']
      },
      {
        time: '16:30 - 17:00',
        title: 'धन्यवाद और नेटवर्किंग',
        location: 'मुख्य लॉबी',
        type: 'समापन',
        speakers: []
      }
    ]
  }
}

export default function SchedulePage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const schedule = scheduleData[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Keynote': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      'मुख्य भाषण': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      'Panel': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      'पैनल': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      'Workshop': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      'कार्यशाला': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      'Technical': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      'तकनीकी': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    }
    return colors[type] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
  }

  const renderScheduleDay = (events: typeof schedule.day1) => (
    <div className="space-y-4">
      {events.map((event, index) => (
        <Card key={index} className="hover:border-orange-500 transition-colors">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Time */}
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold min-w-[140px]">
                <Clock className="w-4 h-4" />
                <span className="text-sm sm:text-base">{event.time}</span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(event.type)} whitespace-nowrap`}>
                    {event.type}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.speakers && event.speakers.length > 0 && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mt-0.5" />
                    <span>{event.speakers.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-gradient-to-r from-orange-500/10 to-orange-600/10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">{t.all}</TabsTrigger>
              <TabsTrigger value="day1">{t.day1}</TabsTrigger>
              <TabsTrigger value="day2">{t.day2}</TabsTrigger>
              <TabsTrigger value="day3">{t.day3}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t.day1}</h2>
                {renderScheduleDay(schedule.day1)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t.day2}</h2>
                {renderScheduleDay(schedule.day2)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t.day3}</h2>
                {renderScheduleDay(schedule.day3)}
              </div>
            </TabsContent>

            <TabsContent value="day1">
              {renderScheduleDay(schedule.day1)}
            </TabsContent>

            <TabsContent value="day2">
              {renderScheduleDay(schedule.day2)}
            </TabsContent>

            <TabsContent value="day3">
              {renderScheduleDay(schedule.day3)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
