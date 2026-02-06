'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Building2, MapPin } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    title: 'Featured Speakers',
    subtitle: 'Learn from world-renowned AI experts and thought leaders',
    keynote: 'Keynote Speaker',
    panelist: 'Panelist',
    workshop: 'Workshop Leader'
  },
  hi: {
    title: 'विशेष वक्ता',
    subtitle: 'विश्व प्रसिद्ध AI विशेषज्ञों और विचारक नेताओं से सीखें',
    keynote: 'मुख्य वक्ता',
    panelist: 'पैनल सदस्य',
    workshop: 'कार्यशाला नेता'
  }
}

const speakersData = {
  en: [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Minister of Technology',
      organization: 'Government of India',
      location: 'New Delhi, India',
      category: 'Keynote Speaker',
      bio: 'Leading India\'s digital transformation and AI initiatives with over 25 years of experience in technology policy and innovation.',
      sessions: ['Opening Keynote: The Future of AI in India']
    },
    {
      name: 'Prof. Anita Sharma',
      title: 'Director, AI Research Lab',
      organization: 'IIT Delhi',
      location: 'Delhi, India',
      category: 'Keynote Speaker',
      bio: 'Renowned researcher in machine learning and AI ethics, with 100+ publications and multiple patents in AI systems.',
      sessions: ['AI Ethics and Governance Panel']
    },
    {
      name: 'Dr. Vikram Patel',
      title: 'Chief AI Officer',
      organization: 'Tech Giants India',
      location: 'Bangalore, India',
      category: 'Panelist',
      bio: 'Industry leader driving AI adoption across healthcare, finance, and education sectors in India.',
      sessions: ['AI Ethics and Governance Panel', 'AI and Job Creation Panel']
    },
    {
      name: 'Sarah Chen',
      title: 'VP, Global AI Initiatives',
      organization: 'OpenAI',
      location: 'San Francisco, USA',
      category: 'Keynote Speaker',
      bio: 'Leading global AI research and deployment strategies, focused on responsible AI development.',
      sessions: ['AI Ethics and Governance Panel']
    },
    {
      name: 'Dr. Priya Menon',
      title: 'Director',
      organization: 'AIIMS',
      location: 'New Delhi, India',
      category: 'Keynote Speaker',
      bio: 'Pioneer in applying AI to healthcare diagnostics and treatment planning in resource-constrained environments.',
      sessions: ['AI in Healthcare and Life Sciences Keynote']
    },
    {
      name: 'Dr. Amit Singh',
      title: 'Research Lead',
      organization: 'OpenAI',
      location: 'London, UK',
      category: 'Workshop Leader',
      bio: 'Expert in large language models and natural language processing with groundbreaking research in multilingual AI.',
      sessions: ['Large Language Models Technical Session']
    },
    {
      name: 'Ramesh Iyer',
      title: 'Secretary',
      organization: 'Ministry of Electronics and IT',
      location: 'New Delhi, India',
      category: 'Keynote Speaker',
      bio: 'Spearheading the IndiaAI Mission and driving national AI strategy for inclusive growth.',
      sessions: ['IndiaAI Mission - Progress and Future']
    },
    {
      name: 'Dr. Lisa Wang',
      title: 'Chief Scientist',
      organization: 'Google DeepMind',
      location: 'Singapore',
      category: 'Panelist',
      bio: 'Leading AI safety research and developing frameworks for secure and beneficial AI systems.',
      sessions: ['AI Safety and Security Workshop']
    }
  ],
  hi: [
    {
      name: 'डॉ. राजेश कुमार',
      title: 'प्रौद्योगिकी मंत्री',
      organization: 'भारत सरकार',
      location: 'नई दिल्ली, भारत',
      category: 'मुख्य वक्ता',
      bio: '25 से अधिक वर्षों के अनुभव के साथ भारत के डिजिटल परिवर्तन और AI पहलों का नेतृत्व कर रहे हैं।',
      sessions: ['उद्घाटन भाषण: भारत में AI का भविष्य']
    },
    {
      name: 'प्रो. अनीता शर्मा',
      title: 'निदेशक, AI शोध प्रयोगशाला',
      organization: 'IIT दिल्ली',
      location: 'दिल्ली, भारत',
      category: 'मुख्य वक्ता',
      bio: 'मशीन लर्निंग और AI नैतिकता में प्रसिद्ध शोधकर्ता, 100+ प्रकाशन और कई पेटेंट के साथ।',
      sessions: ['AI नैतिकता और शासन पैनल']
    },
    {
      name: 'डॉ. विक्रम पटेल',
      title: 'मुख्य AI अधिकारी',
      organization: 'टेक जायंट्स इंडिया',
      location: 'बेंगलुरु, भारत',
      category: 'पैनल सदस्य',
      bio: 'भारत में स्वास्थ्य, वित्त और शिक्षा क्षेत्रों में AI अपनाने का नेतृत्व।',
      sessions: ['AI नैतिकता और शासन पैनल', 'AI और रोजगार पैनल']
    },
    {
      name: 'सारा चेन',
      title: 'वीपी, वैश्विक AI पहल',
      organization: 'OpenAI',
      location: 'सैन फ्रांसिस्को, USA',
      category: 'मुख्य वक्ता',
      bio: 'जिम्मेदार AI विकास पर केंद्रित वैश्विक AI शोध और तैनाती रणनीतियों का नेतृत्व।',
      sessions: ['AI नैतिकता और शासन पैनल']
    },
    {
      name: 'डॉ. प्रिया मेनन',
      title: 'निदेशक',
      organization: 'AIIMS',
      location: 'नई दिल्ली, भारत',
      category: 'मुख्य वक्ता',
      bio: 'स्वास्थ्य निदान और उपचार में AI को लागू करने में अग्रणी।',
      sessions: ['स्वास्थ्य में AI मुख्य भाषण']
    },
    {
      name: 'डॉ. अमित सिंह',
      title: 'शोध प्रमुख',
      organization: 'OpenAI',
      location: 'लंदन, UK',
      category: 'कार्यशाला नेता',
      bio: 'बड़े भाषा मॉडल और बहुभाषी AI में महत्वपूर्ण शोध के साथ विशेषज्ञ।',
      sessions: ['बड़े भाषा मॉडल तकनीकी सत्र']
    },
    {
      name: 'रमेश अय्यर',
      title: 'सचिव',
      organization: 'इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय',
      location: 'नई दिल्ली, भारत',
      category: 'मुख्य वक्ता',
      bio: 'समावेशी विकास के लिए IndiaAI मिशन और राष्ट्रीय AI रणनीति का नेतृत्व।',
      sessions: ['IndiaAI मिशन - प्रगति और भविष्य']
    },
    {
      name: 'डॉ. लिसा वांग',
      title: 'मुख्य वैज्ञानिक',
      organization: 'Google DeepMind',
      location: 'सिंगापुर',
      category: 'पैनल सदस्य',
      bio: 'सुरक्षित और लाभकारी AI प्रणालियों के लिए AI सुरक्षा शोध का नेतृत्व।',
      sessions: ['AI सुरक्षा कार्यशाला']
    }
  ]
}

export default function SpeakersPage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const speakers = speakersData[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const getCategoryColor = (category: string) => {
    if (category.includes('Keynote') || category.includes('मुख्य')) {
      return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-500'
    } else if (category.includes('Panel') || category.includes('पैनल')) {
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-500'
    }
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
  }

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

        {/* Speakers Grid */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker, index) => (
              <Card key={index} className="hover:border-orange-500 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>

                  {/* Name & Category */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {speaker.name}
                    </h3>
                    <Badge className={getCategoryColor(speaker.category)}>
                      {speaker.category}
                    </Badge>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-foreground">
                      {speaker.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{speaker.organization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{speaker.location}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {speaker.bio}
                  </p>

                  {/* Sessions */}
                  {speaker.sessions && speaker.sessions.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        {language === 'en' ? 'Sessions:' : 'सत्र:'}
                      </p>
                      <ul className="space-y-1">
                        {speaker.sessions.map((session, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{session}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
