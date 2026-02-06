'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Server, Brain, Database, Users, BookOpen, Shield, Zap } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    title: 'IndiaAI Mission',
    subtitle: '7 Pillars, 3 Sutras, and 7 Chakras for AI Excellence',
    overview: 'Mission Overview',
    overviewText: 'The IndiaAI Mission is a comprehensive national initiative designed to establish India as a global AI powerhouse. With a vision to democratize AI and make it accessible across all sectors, the mission combines cutting-edge infrastructure, world-class talent development, and ethical AI frameworks.',
    pillars: 'The 7 Pillars',
    sutras: 'The 3 Sutras (Principles)',
    chakras: 'The 7 Chakras (Centers of Excellence)',
    investment: 'Total Investment',
    investmentAmount: '₹10,372 Crores',
    timeline: 'Timeline',
    timelineText: '2024-2028'
  },
  hi: {
    title: 'IndiaAI मिशन',
    subtitle: 'AI उत्कृष्टता के लिए 7 स्तंभ, 3 सूत्र और 7 चक्र',
    overview: 'मिशन अवलोकन',
    overviewText: 'IndiaAI मिशन भारत को वैश्विक AI शक्ति के रूप में स्थापित करने के लिए एक व्यापक राष्ट्रीय पहल है। AI को लोकतांत्रिक बनाने और सभी क्षेत्रों में सुलभ बनाने की दृष्टि के साथ, यह मिशन अत्याधुनिक बुनियादी ढांचे, विश्व स्तरीय प्रतिभा विकास और नैतिक AI ढांचे को जोड़ता है।',
    pillars: '7 स्तंभ',
    sutras: '3 सूत्र (सिद्धांत)',
    chakras: '7 चक्र (उत्कृष्टता केंद्र)',
    investment: 'कुल निवेश',
    investmentAmount: '₹10,372 करोड़',
    timeline: 'समय सीमा',
    timelineText: '2024-2028'
  }
}

const pillarsData = {
  en: [
    {
      icon: Server,
      title: 'IndiaAI Compute',
      description: 'Building India\'s AI computing infrastructure with 38,000+ GPUs across multiple tiers to democratize access to compute power.',
      budget: '₹4,564 Crores'
    },
    {
      icon: Database,
      title: 'IndiaAI Innovation Centre',
      description: 'Fostering AI innovation through incubation, acceleration, and deployment of cutting-edge AI solutions.',
      budget: '₹2,000 Crores'
    },
    {
      icon: Brain,
      title: 'IndiaAI Datasets Platform',
      description: 'Creating high-quality, diverse datasets for training AI models across multiple domains and languages.',
      budget: '₹500 Crores'
    },
    {
      icon: Users,
      title: 'IndiaAI FutureSkills',
      description: 'Training and upskilling workforce in AI technologies to create a talent pool of 500,000+ AI professionals.',
      budget: '₹1,200 Crores'
    },
    {
      icon: BookOpen,
      title: 'IndiaAI Startup Financing',
      description: 'Providing financial support and funding to AI startups to accelerate innovation and entrepreneurship.',
      budget: '₹1,000 Crores'
    },
    {
      icon: Shield,
      title: 'Safe & Trusted AI',
      description: 'Establishing frameworks for responsible AI development, deployment, and governance.',
      budget: '₹500 Crores'
    },
    {
      icon: Zap,
      title: 'IndiaAI Mission Implementation',
      description: 'Coordinating and executing the entire mission across all stakeholders and initiatives.',
      budget: '₹608 Crores'
    }
  ],
  hi: [
    {
      icon: Server,
      title: 'IndiaAI कंप्यूट',
      description: '38,000+ GPU के साथ भारत का AI कंप्यूटिंग बुनियादी ढांचा बनाना और कंप्यूट पावर तक पहुंच को लोकतांत्रिक बनाना।',
      budget: '₹4,564 करोड़'
    },
    {
      icon: Database,
      title: 'IndiaAI इनोवेशन सेंटर',
      description: 'अत्याधुनिक AI समाधानों के इनक्यूबेशन, त्वरण और तैनाती के माध्यम से AI नवाचार को बढ़ावा देना।',
      budget: '₹2,000 करोड़'
    },
    {
      icon: Brain,
      title: 'IndiaAI डेटासेट प्लेटफॉर्म',
      description: 'कई डोमेन और भाषाओं में AI मॉडल प्रशिक्षण के लिए उच्च गुणवत्ता वाले डेटासेट बनाना।',
      budget: '₹500 करोड़'
    },
    {
      icon: Users,
      title: 'IndiaAI फ्यूचरस्किल्स',
      description: '500,000+ AI पेशेवरों का कुशल कार्यबल बनाने के लिए AI प्रौद्योगिकियों में प्रशिक्षण।',
      budget: '₹1,200 करोड़'
    },
    {
      icon: BookOpen,
      title: 'IndiaAI स्टार्टअप वित्तपोषण',
      description: 'नवाचार और उद्यमिता को तेज करने के लिए AI स्टार्टअप को वित्तीय सहायता प्रदान करना।',
      budget: '₹1,000 करोड़'
    },
    {
      icon: Shield,
      title: 'सुरक्षित और विश्वसनीय AI',
      description: 'जिम्मेदार AI विकास, तैनाती और शासन के लिए ढांचे की स्थापना।',
      budget: '₹500 करोड़'
    },
    {
      icon: Zap,
      title: 'IndiaAI मिशन कार्यान्वयन',
      description: 'सभी हितधारकों और पहलों में पूरे मिशन का समन्वय और निष्पादन।',
      budget: '₹608 करोड़'
    }
  ]
}

const sutrasData = {
  en: [
    {
      title: 'Democratization',
      description: 'Making AI accessible to all citizens, businesses, and institutions across India, regardless of their size or location.'
    },
    {
      title: 'Innovation',
      description: 'Fostering a culture of innovation and experimentation in AI research, development, and deployment.'
    },
    {
      title: 'Responsibility',
      description: 'Ensuring ethical, transparent, and accountable AI development that respects privacy and human rights.'
    }
  ],
  hi: [
    {
      title: 'लोकतंत्रीकरण',
      description: 'आकार या स्थान की परवाह किए बिना भारत में सभी नागरिकों, व्यवसायों और संस्थानों के लिए AI को सुलभ बनाना।'
    },
    {
      title: 'नवाचार',
      description: 'AI अनुसंधान, विकास और तैनाती में नवाचार और प्रयोग की संस्कृति को बढ़ावा देना।'
    },
    {
      title: 'जिम्मेदारी',
      description: 'नैतिक, पारदर्शी और जवाबदेह AI विकास सुनिश्चित करना जो गोपनीयता और मानवाधिकारों का सम्मान करता है।'
    }
  ]
}

export default function IndiaAIPage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const pillars = pillarsData[language]
  const sutras = sutrasData[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
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
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-orange-500 text-white rounded-lg">
                <p className="text-sm font-semibold mb-1">{t.investment}</p>
                <p className="text-2xl font-bold">{t.investmentAmount}</p>
              </div>
              <div className="px-6 py-3 bg-background border border-orange-500 rounded-lg">
                <p className="text-sm font-semibold text-muted-foreground mb-1">{t.timeline}</p>
                <p className="text-2xl font-bold text-foreground">{t.timelineText}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.overview}
              </h2>
              <Card className="border-orange-500/50">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {t.overviewText}
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* The 7 Pillars */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.pillars}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar, index) => {
                  const Icon = pillar.icon
                  return (
                    <Card key={index} className="hover:border-orange-500 transition-all hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {pillar.description}
                        </p>
                        <div className="pt-3 border-t">
                          <p className="text-xs text-muted-foreground mb-1">
                            {language === 'en' ? 'Budget Allocation:' : 'बजट आवंटन:'}
                          </p>
                          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {pillar.budget}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            <Separator />

            {/* The 3 Sutras */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.sutras}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {sutras.map((sutra, index) => (
                  <Card key={index} className="border-orange-500/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4 text-xl font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {sutra.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {sutra.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
