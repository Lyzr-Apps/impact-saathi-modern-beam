'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, Calendar, Users, Target, BookOpen, ArrowRight, Sparkles } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    hero: {
      title: 'India AI Impact Summit 2026',
      subtitle: 'Shaping the Future of Artificial Intelligence',
      dates: 'March 15-17, 2026 • New Delhi, India',
      description: 'Join leaders, innovators, and visionaries in exploring how AI is transforming India and the world. Experience three days of keynotes, panels, workshops, and networking.',
      chatCta: 'Chat with Impact Saathi',
      learnMore: 'Learn More'
    },
    features: {
      title: 'Summit Highlights',
      chat: {
        title: 'AI-Powered Assistant',
        description: 'Get instant answers about the summit, speakers, schedule, and IndiaAI initiatives from Impact Saathi.'
      },
      schedule: {
        title: '3-Day Schedule',
        description: 'Comprehensive agenda with keynotes, panel discussions, workshops, and networking sessions.'
      },
      speakers: {
        title: '50+ Expert Speakers',
        description: 'Learn from global leaders in AI, government officials, industry pioneers, and research experts.'
      },
      indiaai: {
        title: 'IndiaAI Mission',
        description: 'Discover India\'s ₹10,372 Crore initiative with 7 pillars transforming AI infrastructure and adoption.'
      },
      initiatives: {
        title: 'Sector AI Programs',
        description: 'Explore AI applications in healthcare, agriculture, manufacturing, education, and smart cities.'
      }
    },
    stats: {
      attendees: '35,000+ Attendees',
      countries: '50+ Countries',
      speakers: '50+ Speakers',
      sessions: '100+ Sessions'
    },
    cta: {
      title: 'Ready to Explore?',
      subtitle: 'Start your journey with Impact Saathi, your intelligent guide to the summit',
      button: 'Start Chatting Now'
    }
  },
  hi: {
    hero: {
      title: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026',
      subtitle: 'कृत्रिम बुद्धिमत्ता के भविष्य को आकार देना',
      dates: '15-17 मार्च, 2026 • नई दिल्ली, भारत',
      description: 'नेताओं, नवप्रवर्तकों और दूरदर्शियों के साथ जुड़ें और जानें कि AI कैसे भारत और दुनिया को बदल रहा है। तीन दिनों के मुख्य भाषणों, पैनलों, कार्यशालाओं और नेटवर्किंग का अनुभव करें।',
      chatCta: 'इम्पैक्ट साथी से चैट करें',
      learnMore: 'और जानें'
    },
    features: {
      title: 'शिखर सम्मेलन की मुख्य बातें',
      chat: {
        title: 'AI-संचालित सहायक',
        description: 'इम्पैक्ट साथी से सम्मेलन, वक्ताओं, कार्यक्रम और IndiaAI पहलों के बारे में तुरंत उत्तर प्राप्त करें।'
      },
      schedule: {
        title: '3-दिवसीय कार्यक्रम',
        description: 'मुख्य भाषणों, पैनल चर्चाओं, कार्यशालाओं और नेटवर्किंग सत्रों के साथ व्यापक एजेंडा।'
      },
      speakers: {
        title: '50+ विशेषज्ञ वक्ता',
        description: 'AI में वैश्विक नेताओं, सरकारी अधिकारियों, उद्योग अग्रणियों और अनुसंधान विशेषज्ञों से सीखें।'
      },
      indiaai: {
        title: 'IndiaAI मिशन',
        description: 'भारत की ₹10,372 करोड़ की पहल को जानें जो AI बुनियादी ढांचे और अपनाने को बदल रही है।'
      },
      initiatives: {
        title: 'क्षेत्र AI कार्यक्रम',
        description: 'स्वास्थ्य, कृषि, विनिर्माण, शिक्षा और स्मार्ट शहरों में AI अनुप्रयोगों का अन्वेषण करें।'
      }
    },
    stats: {
      attendees: '35,000+ उपस्थित',
      countries: '50+ देश',
      speakers: '50+ वक्ता',
      sessions: '100+ सत्र'
    },
    cta: {
      title: 'अन्वेषण के लिए तैयार हैं?',
      subtitle: 'अपनी यात्रा शुरू करें इम्पैक्ट साथी के साथ, सम्मेलन के लिए आपका बुद्धिमान मार्गदर्शक',
      button: 'अभी चैट शुरू करें'
    }
  }
}

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const features = [
    {
      icon: MessageSquare,
      title: t.features.chat.title,
      description: t.features.chat.description,
      href: '/chat',
      color: 'orange'
    },
    {
      icon: Calendar,
      title: t.features.schedule.title,
      description: t.features.schedule.description,
      href: '/schedule',
      color: 'blue'
    },
    {
      icon: Users,
      title: t.features.speakers.title,
      description: t.features.speakers.description,
      href: '/speakers',
      color: 'green'
    },
    {
      icon: Target,
      title: t.features.indiaai.title,
      description: t.features.indiaai.description,
      href: '/indiaai',
      color: 'purple'
    },
    {
      icon: BookOpen,
      title: t.features.initiatives.title,
      description: t.features.initiatives.description,
      href: '/initiatives',
      color: 'pink'
    }
  ]

  const stats = [
    { value: t.stats.attendees, label: language === 'en' ? 'Expected' : 'अपेक्षित' },
    { value: t.stats.countries, label: language === 'en' ? 'Represented' : 'प्रतिनिधित्व' },
    { value: t.stats.speakers, label: language === 'en' ? 'Industry Experts' : 'उद्योग विशेषज्ञ' },
    { value: t.stats.sessions, label: language === 'en' ? 'Learning Sessions' : 'सीखने के सत्र' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      <main className="flex-1">
        {/* Hero Section with Banner */}
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/banner.jpg"
              alt="India AI Impact Summit 2026"
              fill
              className="object-cover opacity-20 dark:opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
          </div>

          <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {language === 'en' ? 'Powered by AI' : 'AI द्वारा संचालित'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {t.hero.title}
              </h1>

              <p className="text-xl sm:text-2xl text-orange-600 dark:text-orange-400 font-semibold mb-6">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                {t.hero.dates}
              </p>

              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
                {t.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/chat">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 h-auto"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {t.hero.chatCta}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 text-lg px-8 py-6 h-auto"
                  >
                    {t.hero.learnMore}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y bg-gradient-to-r from-orange-500/5 to-orange-600/5">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.features.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.href}>
                  <Card className="h-full hover:border-orange-500 transition-all hover:shadow-lg cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-orange-600 dark:text-orange-400 mt-4 font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>{language === 'en' ? 'Explore' : 'अन्वेषण करें'}</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="border-t bg-gradient-to-r from-orange-500/10 to-orange-600/10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.cta.subtitle}
              </p>
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 h-auto"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {t.cta.button}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {language === 'en'
                ? '© 2026 India AI Impact Summit. All rights reserved.'
                : '© 2026 भारत AI इम्पैक्ट शिखर सम्मेलन। सर्वाधिकार सुरक्षित।'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
