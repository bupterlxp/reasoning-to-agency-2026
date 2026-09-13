import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  GitBranch,
  Globe2,
  Layers3,
  MapPin,
  Menu,
  MessagesSquare,
  MoveUpRight,
  Network,
  Plus,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { deadlines, faqs, topicFilters, topics, workshop } from './data'
import type { Person, TopicFilter } from './data'
import { calendarText, cfpText, deadlineUtc, downloadFile } from './downloads'
import Orbit from './Orbit'

const navItems = [
  ['About', 'about'],
  ['Topics', 'topics'],
  ['Dates', 'dates'],
  ['Program', 'program'],
  ['Organizers', 'organizers'],
] as const

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark${small ? ' small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <ellipse cx="20" cy="20" rx="14" ry="6.5" transform="rotate(-45 20 20)" />
        <ellipse cx="20" cy="20" rx="14" ry="6.5" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="2" />
      </svg>
    </span>
  )
}

function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <div className={`section-label${light ? ' light' : ''}`}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  )
}

function ExternalLink({
  href,
  className = '',
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    )
    document.querySelectorAll('main > section[id]').forEach((element) => {
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const resize = () => {
      if (window.innerWidth > 900) setOpen(false)
    }
    document.addEventListener('keydown', close)
    window.addEventListener('resize', resize)
    return () => {
      document.removeEventListener('keydown', close)
      window.removeEventListener('resize', resize)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Reasoning to Agency home"
          onClick={() => setOpen(false)}
        >
          <Mark />
          <span>
            reasoning<span className="brand-arrow">↗</span>agency
            <span className="brand-year">AACL–IJCNLP 2026</span>
          </span>
        </a>
        <nav
          className={`desktop-nav${open ? ' is-open' : ''}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="button button-dark nav-cta"
            href="#cfp"
            aria-current={active === 'cfp' ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            Call for papers <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const workshopDate = workshop.confirmedWorkshopDay
    ? new Date(`${workshop.confirmedWorkshopDay}T12:00:00Z`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : 'November 9–10, 2026'
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            AN AACL–IJCNLP 2026 WORKSHOP
          </div>
          <h1 id="hero-title">
            From Reasoning
            <br />
            to <span>Agency.</span>
            <span className="title-spark" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-subtitle">
            Learning, Acting, and Adapting
            <br className="desktop-break" /> with Foundation Models
          </p>
          <p className="hero-description">
            Beyond generating answers. Toward systems that
            <br className="wide-break" /> reason, act, and learn from the world.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#cfp">
              Explore the call for papers <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="#about">
              Discover the workshop <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <CalendarDays size={17} />
              <span>
                {workshopDate}
                <small>
                  {workshop.confirmedWorkshopDay
                    ? 'Workshop date'
                    : 'Workshop window · exact day TBA'}
                </small>
              </span>
            </div>
            <div>
              <MapPin size={17} />
              <span>
                Hengqin, Zhuhai, China<small>Just across the water from Macau</small>
              </span>
            </div>
          </div>
        </div>
        <Orbit />
      </div>
      <div className="container">
        <div className="announcement">
          <span className="announcement-tag">
            <span className="status-dot" />
            CALL FOR PAPERS
          </span>
          <p>Ideas that connect reasoning to real-world agency.</p>
          <a href="#dates">
            Submission deadline <strong>Sep 30, 2026</strong>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div>
            <SectionLabel number="01">THE WORKSHOP</SectionLabel>
            <h2 id="about-title">
              Reasoning is a beginning.
              <br />
              <span className="muted-heading">Agency is the next step.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Foundation models are becoming more capable reasoners. The next challenge is to turn
              that capability into <strong>purposeful action</strong>: making plans, using tools,
              interacting with environments, and learning from experience.
            </p>
            <p>
              This workshop brings together the NLP, machine learning, and agentic AI communities to
              study that transition. We ask how reasoning supports action, how interaction creates
              new learning opportunities, and how agents can adapt reliably over time.
            </p>
            <a href="#topics" className="text-link">
              Find your research direction <ArrowDown size={15} />
            </a>
          </div>
        </div>
        <div className="principles">
          <div>
            <span className="principle-icon">
              <GitBranch size={21} />
            </span>
            <div>
              <h3>Reason with purpose</h3>
              <p>From inference to plans and decisions.</p>
            </div>
            <ArrowRight className="principle-arrow" size={21} />
          </div>
          <div>
            <span className="principle-icon">
              <MoveUpRight size={23} />
            </span>
            <div>
              <h3>Act in the world</h3>
              <p>From text to tools and environments.</p>
            </div>
            <ArrowRight className="principle-arrow" size={21} />
          </div>
          <div>
            <span className="principle-icon">
              <Workflow size={22} />
            </span>
            <div>
              <h3>Adapt through experience</h3>
              <p>From feedback to lasting improvement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const topicIcons: Record<string, LucideIcon> = {
  reasoning: GitBranch,
  learning: Sparkles,
  tools: Workflow,
  memory: Layers3,
  collaboration: Network,
  evaluation: ShieldCheck,
}

function Topics() {
  const [filter, setFilter] = useState<TopicFilter>('All topics')
  const visible = topics.filter((topic) => filter === 'All topics' || topic.category === filter)
  return (
    <section className="section topics-section" id="topics" aria-labelledby="topics-title">
      <div className="container">
        <SectionLabel number="02">TOPICS OF INTEREST</SectionLabel>
        <div className="section-heading-row">
          <h2 id="topics-title">
            Many directions.
            <br />
            One connected conversation.
          </h2>
          <p>
            We welcome work across the full path from
            <br className="wide-break" /> reasoning to agency, including but not limited
            <br className="wide-break" /> to the following themes.
          </p>
        </div>
        <div className="topic-toolbar">
          <div className="topic-filters" role="group" aria-label="Filter research topics">
            {topicFilters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                className={filter === item ? 'selected' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === 'All topics' && <span>06</span>}
              </button>
            ))}
          </div>
          <span className="topic-count" aria-live="polite">
            {String(visible.length).padStart(2, '0')} research themes
          </span>
        </div>
        <div className="topic-grid">
          {visible.map((topic) => {
            const Icon = topicIcons[topic.icon]
            return (
              <article className="topic-card" key={topic.id}>
                <div className="topic-card-top">
                  <span className="topic-icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </span>
                  <span className="topic-number">/{topic.id}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <ul>
                  {topic.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="topic-tags">
                  {topic.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
        <div className="scope-note">
          <span className="scope-note-icon">
            <Plus size={19} />
          </span>
          <p>
            <strong>Working between these themes? You belong here.</strong> We also welcome
            applications in scientific discovery, software engineering, embodied intelligence,
            education, and multilingual or low-resource settings.
          </p>
        </div>
      </div>
    </section>
  )
}

function CallForPapers({ announce }: { announce: (message: string) => void }) {
  return (
    <section className="section cfp-section" id="cfp" aria-labelledby="cfp-title">
      <div className="container cfp-grid">
        <div className="cfp-copy">
          <SectionLabel number="03" light>
            CALL FOR PAPERS
          </SectionLabel>
          <h2 id="cfp-title">
            Bring a new perspective.
            <br />
            <span>Move the field forward.</span>
          </h2>
          <p>
            We invite original contributions that deepen our understanding of foundation models as
            reasoning, learning, and acting systems.
          </p>
          <p>
            From a new method to a thoughtful position, from a useful benchmark to an illuminating
            negative result—there is room for different kinds of progress.
          </p>
          <div className="review-badges">
            <span>
              <FileText size={12} />
              ACL / ARR template
            </span>
            <span>
              <ShieldCheck size={12} />
              Double-blind review
            </span>
          </div>
          <div className="cfp-actions">
            <button
              className="button button-lime"
              type="button"
              onClick={() => {
                downloadFile(
                  'reasoning-to-agency-2026-cfp.txt',
                  cfpText(),
                  'text/plain;charset=utf-8',
                )
                announce('Call for papers downloaded.')
              }}
            >
              Download the CFP <ArrowDownToLine size={16} />
            </button>
            <ExternalLink href="https://github.com/acl-org/acl-style-files" className="text-link">
              ACL / ARR template
            </ExternalLink>
          </div>
          <span className="format-resource">
            Use review mode and anonymize your paper and supplementary materials.
          </span>
        </div>
        <div className="submission-panel">
          <div className="submission-panel-top">
            <FileText size={21} />
            <span>YOUR CONTRIBUTION STARTS HERE</span>
          </div>
          <div className="submission-types">
            <div>
              <h3>Research & methods</h3>
              <p>Empirical studies, theoretical insights, new methods, and agent systems.</p>
            </div>
            <div>
              <h3>Perspectives & resources</h3>
              <p>Position papers, datasets, benchmarks, analyses, and emerging ideas.</p>
            </div>
          </div>
          <div className="submission-deadline">
            <span>Paper submission deadline</span>
            <strong>September 30, 2026</strong>
            <span>
              <Clock3 size={13} />
              11:59 PM Anywhere on Earth (UTC−12)
            </span>
          </div>
          {workshop.submissionUrl ? (
            <ExternalLink
              className="button button-lime submit-portal"
              href={workshop.submissionUrl}
            >
              Submit your paper
            </ExternalLink>
          ) : (
            <div className="submission-pending">
              <span className="status-dot" />
              <div>
                <strong>Submission portal coming soon</strong>
                <p>Page limits and publication policy are to be confirmed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Dates({ announce }: { announce: (message: string) => void }) {
  const [local, setLocal] = useState(false)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const workshopStart = new Date(
    `${workshop.confirmedWorkshopDay ?? workshop.workshopStart}T12:00:00Z`,
  )
  const shortWorkshopDate = workshop.confirmedWorkshopDay
    ? workshopStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    : 'Nov 9–10'
  return (
    <section className="section dates-section" id="dates" aria-labelledby="dates-title">
      <div className="container dates-grid">
        <div className="dates-intro">
          <SectionLabel number="04">IMPORTANT DATES</SectionLabel>
          <h2 id="dates-title">
            Make space
            <br />
            for what’s next.
          </h2>
          <p>
            A few dates for your calendar.
            <br />
            All deadlines are at <strong>11:59 PM AoE</strong>
            <br />
            (Anywhere on Earth, UTC−12).
          </p>
          <button
            className="button button-outline"
            type="button"
            onClick={() => {
              downloadFile(
                'reasoning-to-agency-2026.ics',
                calendarText(),
                'text/calendar;charset=utf-8',
              )
              announce('Workshop dates downloaded. Open the .ics file in your calendar app.')
            }}
          >
            <CalendarDays size={17} />
            Add dates to calendar <ArrowDownToLine size={15} />
          </button>
          <div className="dates-footnote">
            <Globe2 size={16} />
            <span>
              A global community.
              <br />
              One shared deadline.
            </span>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline-toolbar">
            <span>2026 · WORKSHOP TIMELINE</span>
            <div className="timezone-toggle" role="group" aria-label="Deadline time zone">
              <button
                type="button"
                className={!local ? 'selected' : ''}
                aria-pressed={!local}
                onClick={() => setLocal(false)}
              >
                AoE
              </button>
              <button
                type="button"
                className={local ? 'selected' : ''}
                aria-pressed={local}
                onClick={() => setLocal(true)}
              >
                Your time
              </button>
            </div>
          </div>
          {local && (
            <div className="local-time-note" role="status">
              Deadlines shown in {timezone.replaceAll('_', ' ')}. Workshop dates follow local venue
              time.
            </div>
          )}
          <div className="deadline-list">
            {deadlines.map((item) => {
              const utc = deadlineUtc(item.date)
              const display = local ? utc : new Date(`${item.date}T12:00:00Z`)
              const dateLabel = display.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                ...(!local ? { timeZone: 'UTC' } : {}),
              })
              const current = item.id === 'submission'
              return (
                <div key={item.id} className={`deadline-row${current ? ' deadline-featured' : ''}`}>
                  <div className="timeline-marker">
                    {item.id === 'cfp' ? <Check size={12} /> : <span />}
                  </div>
                  <time dateTime={utc.toISOString()}>
                    {dateLabel}
                    {local && (
                      <small>
                        {utc.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </small>
                    )}
                  </time>
                  <div className="deadline-name">
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                  </div>
                  {current && <ArrowUpRight size={19} />}
                </div>
              )
            })}
            <div className="deadline-row workshop-date-row">
              <div className="timeline-marker">
                <span />
              </div>
              <time dateTime={workshop.confirmedWorkshopDay ?? workshop.workshopStart}>
                {shortWorkshopDate}
              </time>
              <div className="deadline-name">
                <strong>
                  {workshop.confirmedWorkshopDay ? 'See you at the workshop' : 'See you in Hengqin'}
                </strong>
                <small>
                  {workshop.confirmedWorkshopDay
                    ? 'Workshop day · room to be announced'
                    : 'Workshop window · exact day to be announced'}
                </small>
              </div>
              <span className="workshop-date-icon">
                <MapPin size={19} />
              </span>
            </div>
          </div>
          <p className="timeline-note">
            The proceedings deadline applies to organizers, if archival publication is confirmed.
            Any ARR-specific timeline will be announced separately.
          </p>
        </div>
      </div>
    </section>
  )
}

function Program() {
  const items = [
    {
      icon: AudioLines,
      label: '01 / INVITED TALKS',
      title: 'Ideas from the frontier',
      text: 'Perspectives on reasoning, agent learning, and adaptation from researchers across the field.',
    },
    {
      icon: FileText,
      label: '02 / RESEARCH EXCHANGE',
      title: 'Work worth talking about',
      text: 'Contributed presentations, posters, and space to share emerging work with the community.',
    },
    {
      icon: MessagesSquare,
      label: '03 / OPEN DISCUSSION',
      title: 'Better questions, together',
      text: 'A conversation about open problems, meaningful evaluation, and the road toward capable agents.',
    },
  ]
  return (
    <section className="section program-section" id="program" aria-labelledby="program-title">
      <div className="container">
        <SectionLabel number="05">THE PROGRAM</SectionLabel>
        <div className="section-heading-row">
          <h2 id="program-title">
            A day for ideas.
            <br />
            And the people behind them.
          </h2>
          <div>
            <span className="outline-badge">PROGRAM IN DEVELOPMENT</span>
            <p>
              The planned program brings together talks,
              <br className="wide-break" /> research presentations, and open discussion.
              <br className="wide-break" /> The final schedule will be announced here.
            </p>
          </div>
        </div>
        <div className="program-grid">
          {items.map(({ icon: Icon, label, title, text }) => (
            <article className="program-card" key={label}>
              <Icon size={27} strokeWidth={1.5} />
              <span className="program-card-label">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PeopleList({ people }: { people: Person[] }) {
  return (
    <div className="people-list">
      {people.map((person) => (
        <div className="person" key={person.name}>
          {person.image ? (
            <img src={person.image} alt="" loading="lazy" />
          ) : (
            <span className="person-initials" aria-hidden="true">
              {person.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </span>
          )}
          <div>
            {person.url ? (
              <ExternalLink href={person.url} className="person-name">
                {person.name}
              </ExternalLink>
            ) : (
              <strong>{person.name}</strong>
            )}
            <p>{person.affiliation}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function People() {
  return (
    <section className="section people-section" id="organizers" aria-labelledby="people-title">
      <div className="container">
        <SectionLabel number="06">THE ORGANIZERS</SectionLabel>
        <div className="section-heading-row">
          <h2 id="people-title">
            Different perspectives.
            <br />
            Shared curiosity.
          </h2>
          <p>
            Meet the team bringing our community together
            <br className="wide-break" /> across NLP, machine learning, and agentic AI.
          </p>
        </div>
        {workshop.organizers.length ? (
          <PeopleList people={workshop.organizers} />
        ) : (
          <div className="people-card">
            <h3>Organizing committee</h3>
            <p>The organizing team and contact details will be announced here.</p>
          </div>
        )}
        {workshop.speakers.length ? (
          <>
            <div className="people-card-heading">
              <h3>Invited speakers</h3>
            </div>
            <PeopleList people={workshop.speakers} />
          </>
        ) : (
          <div className="speakers-announcement">
            <AudioLines size={21} />
            <div>
              <strong>More voices joining the conversation.</strong>
              <p>Invited speakers will be announced as the program takes shape.</p>
            </div>
            <span className="people-status">STAY TUNED</span>
          </div>
        )}
        {workshop.contactEmail && (
          <a className="text-link people-contact" href={`mailto:${workshop.contactEmail}`}>
            Contact the organizers <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </section>
  )
}

function Venue() {
  return (
    <section className="venue-section" id="venue" aria-labelledby="venue-title">
      <div className="container">
        <div className="venue-card">
          <div className="venue-image">
            <img
              src="./images/hengqin-venue.webp"
              alt="Tianmu Melody Convention Exhibition Center on an island in the Tianmu River in Hengqin, Zhuhai"
              loading="lazy"
              width="1200"
              height="800"
            />
            <div className="venue-image-caption">
              <span>Hengqin</span>
              <span>
                ZHUHAI, CHINA
                <br />A PLACE TO CONNECT.
              </span>
            </div>
            <a
              className="photo-credit"
              href="https://2026.aaclnet.org/venue"
              target="_blank"
              rel="noreferrer"
            >
              Photo: AACL-IJCNLP 2026 <ArrowUpRight size={11} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="venue-copy">
            <div className="eyebrow">
              <MapPin size={14} />
              MEET US IN NOVEMBER
            </div>
            <h2 id="venue-title">
              New connections.
              <br />A beautiful setting.
            </h2>
            <p>
              Join us in Hengqin, Zhuhai, just across the water from Macau, for a meeting of ideas
              at AACL-IJCNLP 2026.
            </p>
            <div className="venue-detail">
              <MapPin size={18} />
              <div>
                <strong>{workshop.venue}</strong>
                <span>Main conference venue · workshop room TBA</span>
              </div>
            </div>
            <ExternalLink className="text-link" href={workshop.venueUrl}>
              Venue & travel information
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div>
          <SectionLabel number="07">A FEW MORE DETAILS</SectionLabel>
          <h2 id="faq-title">
            Before you
            <br />
            submit.
          </h2>
          <p>The essentials, in one place.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                {faq.question}
                <Plus className="faq-plus" size={19} />
                <ChevronDown className="faq-chevron" size={19} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a href="#home" className="footer-brand">
              <Mark small />
              <span>From Reasoning to Agency</span>
            </a>
            <p>
              Learning, Acting, and Adapting
              <br />
              with Foundation Models
            </p>
          </div>
          <div className="footer-links">
            <span>THE WORKSHOP</span>
            <a href="#about">About</a>
            <a href="#topics">Topics of interest</a>
            <a href="#cfp">Call for papers</a>
          </div>
          <div className="footer-links">
            <span>PLAN AHEAD</span>
            <a href="#dates">Important dates</a>
            <a href="#program">Program</a>
            <a href="#venue">Venue & travel</a>
          </div>
          <div className="footer-conference">
            <span>PART OF AACL–IJCNLP 2026</span>
            <ExternalLink href={workshop.conferenceUrl}>Meet us in Hengqin</ExternalLink>
            <p>
              November 9–10, 2026
              <br />
              Exact workshop day to be announced
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 From Reasoning to Agency Workshop</span>
          <span>
            Reason. Act. Adapt.
            <span className="footer-spark" aria-hidden="true">
              ✳
            </span>
          </span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [message, setMessage] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const announce = (text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setMessage(text)
    toastTimer.current = setTimeout(() => setMessage(''), 5000)
  }
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    },
    [],
  )

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Topics />
        <CallForPapers announce={announce} />
        <Dates announce={announce} />
        <Program />
        <People />
        <Venue />
        <FAQ />
      </main>
      <Footer />
      <div className={`toast${message ? ' visible' : ''}`} role="status" aria-live="polite">
        {message && (
          <>
            <Check size={18} />
            <span>{message}</span>
            <button type="button" aria-label="Dismiss notification" onClick={() => setMessage('')}>
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </>
  )
}
