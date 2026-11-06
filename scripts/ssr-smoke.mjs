import { render } from '../dist-ssr/entry-server.js'

const checks = [
  { url: '/', must: ['IFAK', 'Latest news', 'Upcoming events', 'Announcements', 'DSC_0206.jpg', 'ifak-at-62'] },
  { url: '/news', must: ['Featured', 'IFAK at 62', 'Search articles', 'Clear filters', 'Showing'] },
  { url: '/news/ifak-at-62-feast-of-st-john-bosco', must: ['IFAK at 62: Celebrating St John Bosco', 'Mukyo Thadee', 'Share this story', 'Continue reading', 'Feb'] },
  { url: '/news/barore-reflects-on-ifak-values', must: ['Barore', 'Cleophas', 'le mot du soir', 'Share this story'] },
  { url: '/news/weekly-tests-national-examinations', must: ['National Examinations', 'Isaïe Mwizerwa'] },
  { url: '/news/money-makeover-challenge-cohort-3', must: ['Money Makeover', 'Balinda Cyemezo Bruce', '450,000'] },
  { url: '/news/kwibuka31-amb-nsengimana-urges-love-and-unity', must: ['Kwibuka31', 'Joseph Nsengimana'] },
  { url: '/news/kimihurura-parish-adma-vows', must: ['ADMA', 'Mary Help of Christians', 'Uwumukiza', '12.02.43-PM-1-1024x682.jpeg'] },
  { url: '/news/does-not-exist', must: ['Article not found', 'Back to all news'] },
  { url: '/events', must: ['Upcoming events', 'School calendar', 'Past events', 'cal-day', 'Christmas Celebration', 'Feast of St John Bosco', 'indicative'] },
  { url: '/events/ifak-at-62-celebration-2026', must: ['IFAK at 62', 'When &amp; where', 'Read the full story', 'Add to Google Calendar'] },
  { url: '/events/feast-of-st-john-bosco-2027', must: ['Feast of St John Bosco', '31 January 2027', 'Add to Google Calendar'] },
  { url: '/events/nope', must: ['Event not found'] },
  { url: '/events/mary-help-parish-feast-2025', must: ['Mary Help', '12.02.38-PM-1024x682.jpeg'] },
  { url: '/announcements', must: ['School Announcements', 'Admissions Enquiries', 'ifak-admissions-2026-2027.pdf', 'Read full notice'] },
  { url: '/totally-unknown-route', must: ['404', 'wandered'] }
]

let failures = 0
for (const { url, must } of checks) {
  try {
    const html = await render(url)
    const missing = must.filter((m) => !html.includes(m))
    if (missing.length) {
      failures++
      console.log(`FAIL  ${url}  missing: ${JSON.stringify(missing)}`)
    } else {
      console.log(`PASS  ${url}  (${html.length} bytes)`)
    }
  } catch (err) {
    failures++
    console.log(`ERROR ${url}: ${err.message}`)
  }
}
process.exit(failures ? 1 : 0)
