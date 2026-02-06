'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MapPin, Calendar, Users, Globe } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    title: 'About India AI Impact Summit 2026',
    subtitle: 'Shaping the Future of Artificial Intelligence in India',
    overview: 'Summit Overview',
    overviewText: 'The India AI Impact Summit 2026 is a landmark event bringing together global AI leaders, innovators, policymakers, and researchers to explore the transformative potential of artificial intelligence. This summit aims to position India as a global hub for AI innovation and development.',
    vision: 'Vision & Mission',
    visionText: 'To accelerate India\'s AI capabilities through collaborative innovation, ethical development, and inclusive growth. The summit focuses on building a robust AI ecosystem that benefits all sectors of society while maintaining responsible AI practices.',
    highlights: 'Event Highlights',
    highlight1: 'Over 35,000 expected attendees from across the globe',
    highlight2: 'World-renowned speakers and AI thought leaders',
    highlight3: 'Interactive workshops and hands-on demonstrations',
    highlight4: 'Networking opportunities with industry pioneers',
    highlight5: 'Showcase of cutting-edge AI innovations',
    highlight6: 'Policy discussions on AI governance and ethics',
    objectives: 'Key Objectives',
    obj1: 'Foster collaboration between academia, industry, and government',
    obj2: 'Showcase India\'s AI capabilities on the global stage',
    obj3: 'Accelerate AI adoption across critical sectors',
    obj4: 'Promote ethical and responsible AI development',
    obj5: 'Build a skilled AI workforce for the future',
    obj6: 'Attract global investment in India\'s AI ecosystem'
  },
  hi: {
    title: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026 के बारे में',
    subtitle: 'भारत में कृत्रिम बुद्धिमत्ता के भविष्य को आकार देना',
    overview: 'शिखर सम्मेलन अवलोकन',
    overviewText: 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026 एक ऐतिहासिक कार्यक्रम है जो वैश्विक AI नेताओं, नवप्रवर्तकों, नीति निर्माताओं और शोधकर्ताओं को एक साथ लाता है। यह शिखर सम्मेलन भारत को AI नवाचार और विकास के लिए एक वैश्विक केंद्र के रूप में स्थापित करने का लक्ष्य रखता है।',
    vision: 'दृष्टि और मिशन',
    visionText: 'सहयोगात्मक नवाचार, नैतिक विकास और समावेशी विकास के माध्यम से भारत की AI क्षमताओं को तेज करना। यह शिखर सम्मेलन एक मजबूत AI पारिस्थितिकी तंत्र बनाने पर केंद्रित है जो समाज के सभी क्षेत्रों को लाभान्वित करे।',
    highlights: 'कार्यक्रम की मुख्य बातें',
    highlight1: 'दुनिया भर से 35,000 से अधिक अपेक्षित उपस्थित',
    highlight2: 'विश्व प्रसिद्ध वक्ता और AI विचारक नेता',
    highlight3: 'इंटरैक्टिव कार्यशालाएं और प्रदर्शन',
    highlight4: 'उद्योग के अग्रदूतों के साथ नेटवर्किंग के अवसर',
    highlight5: 'अत्याधुनिक AI नवाचारों का प्रदर्शन',
    highlight6: 'AI शासन और नैतिकता पर नीति चर्चा',
    objectives: 'प्रमुख उद्देश्य',
    obj1: 'शिक्षा, उद्योग और सरकार के बीच सहयोग को बढ़ावा देना',
    obj2: 'वैश्विक मंच पर भारत की AI क्षमताओं को प्रदर्शित करना',
    obj3: 'महत्वपूर्ण क्षेत्रों में AI अपनाने को तेज करना',
    obj4: 'नैतिक और जिम्मेदार AI विकास को बढ़ावा देना',
    obj5: 'भविष्य के लिए कुशल AI कार्यबल का निर्माण करना',
    obj6: 'भारत के AI पारिस्थितिकी तंत्र में वैश्विक निवेश आकर्षित करना'
  }
}

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const stats = [
    { icon: Users, value: '35,000+', label: language === 'en' ? 'Attendees' : 'उपस्थित' },
    { icon: Globe, value: '50+', label: language === 'en' ? 'Countries' : 'देश' },
    { icon: Calendar, value: '3', label: language === 'en' ? 'Days' : 'दिन' },
    { icon: MapPin, value: 'India', label: language === 'en' ? 'Location' : 'स्थान' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      <main className="flex-1">
        {/* Hero Section with Banner */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="absolute inset-0">
            <Image
              src="/images/banner.jpg"
              alt="AI Impact Summit India Banner"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-b bg-background">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                      <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
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

            {/* Vision & Mission */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.vision}
              </h2>
              <Card className="border-orange-500/50">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {t.visionText}
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Event Highlights */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.highlights}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[t.highlight1, t.highlight2, t.highlight3, t.highlight4, t.highlight5, t.highlight6].map((highlight, index) => (
                  <Card key={index} className="hover:border-orange-500 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Objectives */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t.objectives}
              </h2>
              <Card className="border-orange-500/50">
                <CardContent className="p-6 sm:p-8">
                  <ul className="space-y-4">
                    {[t.obj1, t.obj2, t.obj3, t.obj4, t.obj5, t.obj6].map((obj, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                          {obj}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
