'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Cpu, GraduationCap, Factory, Stethoscope, Sprout, Building2 } from 'lucide-react'

type Language = 'en' | 'hi'

const translations = {
  en: {
    title: 'AI Initiatives',
    subtitle: 'Transforming India through sector-specific AI programs',
    learnMore: 'Learn More',
    status: 'Status'
  },
  hi: {
    title: 'AI पहल',
    subtitle: 'क्षेत्र-विशिष्ट AI कार्यक्रमों के माध्यम से भारत का रूपांतरण',
    learnMore: 'और जानें',
    status: 'स्थिति'
  }
}

const initiativesData = {
  en: [
    {
      icon: Cpu,
      title: 'AI Compute Infrastructure',
      category: 'Infrastructure',
      status: 'Active',
      description: 'Deploying 38,000+ GPUs across three tiers to provide accessible and affordable AI computing power to researchers, startups, and enterprises. The infrastructure includes high-performance computing clusters optimized for AI workloads.',
      highlights: [
        '10,000 GPUs for tier-1 access',
        '18,000 GPUs for tier-2 access',
        '10,000 GPUs for tier-3 access',
        'Subsidized rates for startups and researchers'
      ],
      impact: '500+ organizations already leveraging the compute infrastructure'
    },
    {
      icon: GraduationCap,
      title: 'AI Education & Skilling',
      category: 'Education',
      status: 'Active',
      description: 'Comprehensive AI education program targeting students, professionals, and educators to build a skilled workforce of 500,000+ AI professionals by 2028.',
      highlights: [
        'Free online AI courses in multiple languages',
        'Certification programs recognized by industry',
        'Partnerships with top universities',
        'Hands-on training with real-world datasets'
      ],
      impact: '100,000+ learners enrolled in the first year'
    },
    {
      icon: Stethoscope,
      title: 'AI for Healthcare',
      category: 'Healthcare',
      status: 'Active',
      description: 'Deploying AI solutions for disease diagnosis, treatment planning, drug discovery, and healthcare delivery optimization across urban and rural India.',
      highlights: [
        'AI-powered diagnostic tools in 500+ hospitals',
        'Telemedicine platforms with AI assistants',
        'Predictive analytics for disease outbreaks',
        'Personalized treatment recommendations'
      ],
      impact: '10 million+ patients benefited from AI-assisted healthcare'
    },
    {
      icon: Sprout,
      title: 'AI for Agriculture',
      category: 'Agriculture',
      status: 'Active',
      description: 'Leveraging AI to enhance crop yield, optimize resource usage, predict weather patterns, and provide real-time advisory to farmers.',
      highlights: [
        'Crop health monitoring via satellite imagery',
        'AI-based pest and disease detection',
        'Weather prediction and advisory systems',
        'Soil health analysis and recommendations'
      ],
      impact: '5 million+ farmers using AI-powered agricultural tools'
    },
    {
      icon: Factory,
      title: 'AI for Manufacturing',
      category: 'Industry',
      status: 'Pilot',
      description: 'Transforming manufacturing through predictive maintenance, quality control, supply chain optimization, and smart factory solutions.',
      highlights: [
        'Predictive maintenance reducing downtime by 30%',
        'AI-powered quality inspection systems',
        'Automated supply chain management',
        'Energy optimization in factories'
      ],
      impact: '200+ manufacturing units adopting AI solutions'
    },
    {
      icon: Building2,
      title: 'Smart Cities AI',
      category: 'Urban Development',
      status: 'Pilot',
      description: 'Building intelligent urban infrastructure with AI-driven traffic management, waste management, energy optimization, and citizen services.',
      highlights: [
        'AI-based traffic flow optimization',
        'Smart energy grids reducing consumption',
        'Automated waste collection systems',
        'Citizen grievance redressal via AI chatbots'
      ],
      impact: '50+ cities implementing smart AI solutions'
    }
  ],
  hi: [
    {
      icon: Cpu,
      title: 'AI कंप्यूट बुनियादी ढांचा',
      category: 'बुनियादी ढांचा',
      status: 'सक्रिय',
      description: 'शोधकर्ताओं, स्टार्टअप और उद्यमों को सुलभ और किफायती AI कंप्यूटिंग शक्ति प्रदान करने के लिए तीन स्तरों में 38,000+ GPU की तैनाती।',
      highlights: [
        'टियर-1 एक्सेस के लिए 10,000 GPU',
        'टियर-2 एक्सेस के लिए 18,000 GPU',
        'टियर-3 एक्सेस के लिए 10,000 GPU',
        'स्टार्टअप और शोधकर्ताओं के लिए सब्सिडी दरें'
      ],
      impact: '500+ संगठन पहले से ही कंप्यूट बुनियादी ढांचे का लाभ उठा रहे हैं'
    },
    {
      icon: GraduationCap,
      title: 'AI शिक्षा और कौशल',
      category: 'शिक्षा',
      status: 'सक्रिय',
      description: '2028 तक 500,000+ AI पेशेवरों का कुशल कार्यबल बनाने के लिए छात्रों, पेशेवरों और शिक्षकों को लक्षित व्यापक AI शिक्षा कार्यक्रम।',
      highlights: [
        'कई भाषाओं में मुफ्त ऑनलाइन AI पाठ्यक्रम',
        'उद्योग द्वारा मान्यता प्राप्त प्रमाणन कार्यक्रम',
        'शीर्ष विश्वविद्यालयों के साथ साझेदारी',
        'वास्तविक दुनिया के डेटासेट के साथ व्यावहारिक प्रशिक्षण'
      ],
      impact: 'पहले वर्ष में 100,000+ शिक्षार्थियों ने नामांकन किया'
    },
    {
      icon: Stethoscope,
      title: 'स्वास्थ्य के लिए AI',
      category: 'स्वास्थ्य',
      status: 'सक्रिय',
      description: 'शहरी और ग्रामीण भारत में रोग निदान, उपचार योजना, दवा खोज और स्वास्थ्य वितरण अनुकूलन के लिए AI समाधान तैनात करना।',
      highlights: [
        '500+ अस्पतालों में AI-संचालित निदान उपकरण',
        'AI सहायकों के साथ टेलीमेडिसिन प्लेटफॉर्म',
        'रोग प्रकोप के लिए पूर्वानुमानित विश्लेषण',
        'व्यक्तिगत उपचार सिफारिशें'
      ],
      impact: '10 मिलियन+ रोगियों को AI-सहायता प्राप्त स्वास्थ्य से लाभ'
    },
    {
      icon: Sprout,
      title: 'कृषि के लिए AI',
      category: 'कृषि',
      status: 'सक्रिय',
      description: 'फसल उपज बढ़ाने, संसाधन उपयोग का अनुकूलन करने, मौसम पैटर्न की भविष्यवाणी करने और किसानों को वास्तविक समय सलाह प्रदान करने के लिए AI का लाभ उठाना।',
      highlights: [
        'उपग्रह इमेजरी के माध्यम से फसल स्वास्थ्य निगरानी',
        'AI-आधारित कीट और रोग का पता लगाना',
        'मौसम पूर्वानुमान और सलाह प्रणाली',
        'मिट्टी स्वास्थ्य विश्लेषण और सिफारिशें'
      ],
      impact: '5 मिलियन+ किसान AI-संचालित कृषि उपकरणों का उपयोग कर रहे हैं'
    },
    {
      icon: Factory,
      title: 'विनिर्माण के लिए AI',
      category: 'उद्योग',
      status: 'पायलट',
      description: 'पूर्वानुमानित रखरखाव, गुणवत्ता नियंत्रण, आपूर्ति श्रृंखला अनुकूलन और स्मार्ट फैक्ट्री समाधानों के माध्यम से विनिर्माण परिवर्तन।',
      highlights: [
        'पूर्वानुमानित रखरखाव से 30% डाउनटाइम कम',
        'AI-संचालित गुणवत्ता निरीक्षण प्रणाली',
        'स्वचालित आपूर्ति श्रृंखला प्रबंधन',
        'कारखानों में ऊर्जा अनुकूलन'
      ],
      impact: '200+ विनिर्माण इकाइयां AI समाधान अपना रही हैं'
    },
    {
      icon: Building2,
      title: 'स्मार्ट शहर AI',
      category: 'शहरी विकास',
      status: 'पायलट',
      description: 'AI-संचालित ट्रैफिक प्रबंधन, कचरा प्रबंधन, ऊर्जा अनुकूलन और नागरिक सेवाओं के साथ बुद्धिमान शहरी बुनियादी ढांचा निर्माण।',
      highlights: [
        'AI-आधारित ट्रैफिक प्रवाह अनुकूलन',
        'स्मार्ट ऊर्जा ग्रिड खपत कम करना',
        'स्वचालित कचरा संग्रह प्रणाली',
        'AI चैटबॉट के माध्यम से नागरिक शिकायत निवारण'
      ],
      impact: '50+ शहर स्मार्ट AI समाधान लागू कर रहे हैं'
    }
  ]
}

export default function InitiativesPage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const initiatives = initiativesData[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const getStatusColor = (status: string) => {
    if (status === 'Active' || status === 'सक्रिय') {
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
    }
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-500'
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

        {/* Initiatives Grid */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon
              return (
                <Card key={index} className="hover:border-orange-500 transition-all hover:shadow-lg">
                  <CardContent className="p-6 sm:p-8">
                    {/* Icon and Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <Badge className={getStatusColor(initiative.status)}>
                        {t.status}: {initiative.status}
                      </Badge>
                    </div>

                    {/* Title and Category */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-4">
                      {initiative.category}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                      {initiative.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground mb-3">
                        {language === 'en' ? 'Key Highlights:' : 'मुख्य विशेषताएं:'}
                      </p>
                      <ul className="space-y-2">
                        {initiative.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="pt-4 border-t">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        {language === 'en' ? 'Impact:' : 'प्रभाव:'}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {initiative.impact}
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <button className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                      <span>{t.learnMore}</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
