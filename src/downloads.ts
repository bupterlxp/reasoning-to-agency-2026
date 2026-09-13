import { deadlines, topics, workshop } from './data'

/** AoE is UTC−12. 23:59 on date D is 11:59 UTC on date D+1. */
export function deadlineUtc(date: string) {
  const instant = new Date(`${date}T23:59:00-12:00`)
  return instant
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

function utcStamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

// RFC 5545: fold content lines at 75 UTF-8 octets without splitting a character.
function foldLine(line: string) {
  const encoder = new TextEncoder()
  const lines: string[] = []
  let current = ''
  let bytes = 0
  for (const character of line) {
    const size = encoder.encode(character).length
    if (bytes + size > 75) {
      lines.push(current)
      current = ' '
      bytes = 1
    }
    current += character
    bytes += size
  }
  lines.push(current)
  return lines.join('\r\n')
}

export function calendarText() {
  const stamp = utcStamp(new Date())
  const events = deadlines.map((item) => [
    'BEGIN:VEVENT',
    `UID:r2a-2026-${item.id}@workshop`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${utcStamp(deadlineUtc(item.date))}`,
    'DURATION:PT1M',
    `SUMMARY:${escapeIcs(`${workshop.title}: ${item.label}`)}`,
    `DESCRIPTION:${escapeIcs(`${item.date}, 11:59 PM Anywhere on Earth (UTC-12). ${item.note}.${item.id === 'proceedings' ? ' Publication policy is not yet confirmed.' : ''}`)}`,
    'END:VEVENT',
  ])
  const start = workshop.confirmedWorkshopDay ?? workshop.workshopStart
  const end = new Date(`${workshop.confirmedWorkshopDay ?? workshop.workshopEnd}T00:00:00Z`)
  end.setUTCDate(end.getUTCDate() + 1)
  events.push([
    'BEGIN:VEVENT',
    'UID:r2a-2026-workshop@workshop',
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start.replaceAll('-', '')}`,
    `DTEND;VALUE=DATE:${end.toISOString().slice(0, 10).replaceAll('-', '')}`,
    `SUMMARY:${escapeIcs(`${workshop.title}${workshop.confirmedWorkshopDay ? '' : ' — workshop window (exact day TBA)'}`)}`,
    `LOCATION:${escapeIcs(workshop.location)}`,
    `DESCRIPTION:${escapeIcs(`An ${workshop.conference} workshop. ${workshop.confirmedWorkshopDay ? 'Workshop room and detailed program to be announced.' : 'November 9-10 is the conference workshop window. Our exact workshop day and room are to be announced.'}`)}`,
    `STATUS:${workshop.confirmedWorkshopDay ? 'CONFIRMED' : 'TENTATIVE'}`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
  ])
  return (
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Reasoning to Agency//AACL 2026//EN',
      'CALSCALE:GREGORIAN',
      ...events.flat(),
      'END:VCALENDAR',
    ]
      .map(foldLine)
      .join('\r\n') + '\r\n'
  )
}

export function cfpText() {
  return [
    workshop.title,
    workshop.subtitle,
    `${workshop.conference} | ${workshop.location}`,
    'Workshop window: November 9–10, 2026. Exact day to be announced.',
    '',
    'CALL FOR PAPERS',
    '',
    'How can foundation models turn reasoning into purposeful action—and learn from what happens next? We bring together researchers working across natural language processing, machine learning, and agentic AI to explore the connections between reasoning, learning, acting, and adaptation.',
    '',
    'We welcome empirical and theoretical research, systems, datasets, benchmarks, position papers, and carefully analyzed negative results. Topics include, but are not limited to:',
    '',
    ...topics.flatMap((topic) => [topic.title, ...topic.points.map((point) => `  - ${point}`), '']),
    'Applications spanning scientific discovery, software engineering, embodied intelligence, education, and multilingual or low-resource settings are welcome.',
    '',
    'IMPORTANT DATES — all deadlines at 11:59 PM AoE (UTC−12)',
    ...deadlines.map(
      (item) =>
        `${item.date}: ${item.label}${item.id === 'proceedings' ? ' (organizers only; if publishing proceedings)' : ''}`,
    ),
    '2026-11-09–2026-11-10: Workshop window; exact workshop day TBA',
    '',
    'SUBMISSION INFORMATION',
    workshop.submissionUrl
      ? `Submission portal: ${workshop.submissionUrl}`
      : 'Submission portal: to be announced.',
    'Format: official ACL/ARR template in review mode. Submit an anonymized PDF, including anonymized supplementary materials.',
    'Review: double-blind.',
    'Final page limits, presentation requirements, and publication arrangements will be announced with the submission guidelines. Archival status and policies affecting submission of the same work to other venues are to be confirmed. ARR eligibility and any separate commitment deadline are not yet confirmed.',
    'ACL formatting resources: https://github.com/acl-org/acl-style-files',
    '',
    'ORGANIZERS',
    ...workshop.organizers.map((person) => `${person.name} (${person.affiliation})`),
    '',
    `Workshop website: ${workshop.websiteUrl}`,
    `Conference: ${workshop.conferenceUrl}`,
    ...(workshop.contactEmail ? [`Contact: ${workshop.contactEmail}`] : []),
    '',
  ].join('\n')
}

export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
