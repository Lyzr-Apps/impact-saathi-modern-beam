'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Info,
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  Target
} from 'lucide-react'

type Language = 'en' | 'hi'

interface NavigationProps {
  language: Language
  onLanguageToggle: () => void
}

const translations = {
  en: {
    home: 'Home',
    about: 'About Summit',
    schedule: 'Schedule',
    speakers: 'Speakers',
    chat: 'Chat Assistant',
    indiaai: 'IndiaAI Mission',
    initiatives: 'Initiatives'
  },
  hi: {
    home: 'होम',
    about: 'शिखर सम्मेलन के बारे में',
    schedule: 'कार्यक्रम',
    speakers: 'वक्ता',
    chat: 'चैट सहायक',
    indiaai: 'IndiaAI मिशन',
    initiatives: 'पहल'
  }
}

const navItems = [
  { href: '/', label: 'home', icon: Home },
  { href: '/about', label: 'about', icon: Info },
  { href: '/schedule', label: 'schedule', icon: Calendar },
  { href: '/speakers', label: 'speakers', icon: Users },
  { href: '/indiaai', label: 'indiaai', icon: Target },
  { href: '/initiatives', label: 'initiatives', icon: BookOpen },
  { href: '/chat', label: 'chat', icon: MessageSquare }
]

export default function Navigation({ language, onLanguageToggle }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const t = translations[language]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/chat'
    }
    return pathname === href
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="Impact Saathi Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">Impact Saathi</h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                {language === 'en' ? 'India AI Impact Summit 2026' : 'भारत AI इम्पैक्ट शिखर सम्मेलन 2026'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={active ? 'default' : 'ghost'}
                    size="sm"
                    className={active ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {t[item.label as keyof typeof t]}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              onClick={onLanguageToggle}
              variant="outline"
              size="sm"
              className="font-semibold"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </Button>

            {/* Theme Toggle */}
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="ghost"
              size="icon"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={active ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        active ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {t[item.label as keyof typeof t]}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
