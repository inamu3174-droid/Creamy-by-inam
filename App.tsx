import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FLAVORS } from './data'
import { useReveal, useWidth } from './hooks'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Nav from './components/Nav'
import type { SectionId } from './components/Nav'
import Reviews from './components/Reviews'
import Story from './components/Story'

const ORDER: SectionId[] = ['home', 'about', 'menu', 'faq', 'reviews', 'contact']
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function App() {
  const [flavor, setFlavor] = useState(0)
  const [section, setSection] = useState<SectionId>('home')
  const [navHidden, setNavHidden] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const scroller = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)
  const cardW = useWidth(wrap)
  useReveal(scroller)

  const f = FLAVORS[flavor]

  const goTo = useCallback((id: SectionId) => {
    const sc = scroller.current
    const el = document.getElementById(id)
    if (!sc || !el) return
    const top = id === 'contact' ? sc.scrollHeight : id === 'home' ? 0 : el.offsetTop
    sc.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const sc = scroller.current
    if (!sc) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = sc.scrollTop
      const h = sc.clientHeight
      let current: SectionId = 'home'
      for (const id of ORDER) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y + h * 0.35) current = id
      }
      if (y + h >= sc.scrollHeight - 4) current = 'contact'
      setSection(current)
      setHeroVisible(y < h * 0.5)
      // nav hides while scrolling down past the menu, returns on scroll up
      const faqTop = document.getElementById('faq')?.offsetTop ?? Infinity
      const dy = y - lastY.current
      if (y > faqTop - h * 0.2) { if (dy > 2) setNavHidden(true); else if (dy < -2) setNavHidden(false) }
      else setNavHidden(false)
      lastY.current = y
      // menu background melts into cream as the FAQ scrolls in
      const p = clamp01((y + h - faqTop) / (h * 0.7))
      document.getElementById('menu')?.style.setProperty('--fade', p.toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    sc.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { sc.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const vars = { '--stage': f.stage, '--h1': f.h1, '--h2': f.h2, '--btn': f.btn } as CSSProperties
  const sigma = (cardW / 1160) * 0.8

  return (
    <div className="stage" style={vars}>
      <div className="stage__tags">
        <ul>{['Tutorial', 'Figma', 'Motion', 'Web Design'].map(t => <li key={t}>{t}</li>)}</ul>
        <span className="pill">@uluuzaid</span>
      </div>

      <main className="stage__main">
        <div className="cardwrap" ref={wrap}>
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            <filter id="goo" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation={sigma} />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7.5" />
            </filter>
          </svg>
          <div className="card" data-section={section}>
            <Nav current={section} hidden={navHidden} onGo={goTo} />
            <div className="scroller" ref={scroller}>
              <div className="site">
                <div className="hero-sticky"><Hero index={flavor} setIndex={setFlavor} playing={heroVisible} /></div>
                <Story />
                <Menu />
                <Faq />
                <Reviews />
                <Footer onGo={goTo} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="stage__foot">
        <span>© 2025 All rights reserved</span>
        <span className="pill">@uluuzaid</span>
      </div>
    </div>
  )
}