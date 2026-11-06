<script setup>
import PageHero from '../components/PageHero.vue'
import SmartImage from '../components/SmartImage.vue'
</script>

<template>
  <PageHero
    title="About IFAK"
    subtitle="Institut de Formation Apostolique de Kimihurura — a private Catholic secondary school of the Salesians of Don Bosco, serving young people in Kigali since 1964."
    :crumbs="[{ label: 'About' }]"
  />

  <!-- ============ WHO WE ARE ============ -->
  <section class="section" aria-labelledby="about-who-heading">
    <div class="container about-grid">
      <div>
        <p class="eyebrow">Who we are</p>
        <h2 id="about-who-heading" class="section-title">An education that forms the whole person</h2>
        <p>
          IFAK — Institut de Formation Apostolique de Kimihurura — is a private secondary school belonging to the
          Salesian Congregation (Salesians of Don Bosco). It is located at Kimihurura, Kimihurura Sector, Gasabo
          District, in the City of Kigali, Rwanda, and is open to young people admitted from Senior One to Senior Six.
        </p>
        <p>
          The school is committed to excellence and is known for high expectations and strong academic results,
          achieved through a complete and holistic formation that pairs the national curriculum of the Rwanda
          Education Board with the preventive educational system of Don Bosco — the Salesian approach of reason,
          religion and loving-kindness, in which education and evangelisation go together.
        </p>
        <blockquote class="about-quote">
          <p>
            “IFAK, as an Educational Institution, wants to provide to the young people a wide opportunity to develop
            holistic knowledge and skills, to acquire a positive attitude and a critical thinking, which will help them
            to be competitive at the labor market, contributing thus to the social and political life of our country.”
          </p>
          <cite>Rev. Fr Jean Bosco Ntirenganya — Principal, from the official IFAK website</cite>
        </blockquote>
      </div>
      <figure class="about-media">
        <SmartImage
          src="https://ifakdonbosco.ac.rw/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-22-at-2.15.05-PM-1024x576.jpeg"
          alt="IFAK Don Bosco Kimihurura campus during a school event"
          width="1024" height="576"
        />
        <figcaption>Image: IFAK campus, as published on the school’s official website. More photos in the <router-link to="/gallery">photo gallery</router-link>.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ KEY FACTS ============ -->
  <section class="facts-band" aria-label="Key facts about IFAK">
    <div class="container facts-grid">
      <div class="fact">
        <dt>Founded</dt>
        <dd>1964</dd>
      </div>
      <div class="fact">
        <dt>Golden jubilee</dt>
        <dd>2015 · 50 years</dd>
      </div>
      <div class="fact">
        <dt>62nd anniversary</dt>
        <dd>February 2026</dd>
      </div>
      <div class="fact">
        <dt>Ownership</dt>
        <dd>Salesians of Don Bosco</dd>
      </div>
      <div class="fact">
        <dt>Levels</dt>
        <dd>Ordinary &amp; Advanced</dd>
      </div>
      <div class="fact">
        <dt>A-Level combinations</dt>
        <dd>PCM · MCB · MCE · MEG · MPC</dd>
      </div>
    </div>
  </section>

  <!-- ============ WHAT WE OFFER ============ -->
  <section class="section alt-section" aria-labelledby="about-offer-heading">
    <div class="container">
      <p class="eyebrow">What we offer</p>
      <h2 id="about-offer-heading" class="section-title">Levels, curriculum and admission</h2>
      <div class="offer-grid">
        <article class="card offer-card">
          <h3>Ordinary Level — Senior 1 to 3</h3>
          <p>
            Admission into Senior One is through a competitive admission test, as is admission for new learners
            joining Senior Two. Students follow the national curriculum of the Rwanda Education Board, enriched by
            the preventive educational system of Don Bosco and a programme of extracurricular activities.
          </p>
        </article>
        <article class="card offer-card">
          <h3>Advanced Level — Senior 4 to 6</h3>
          <p>Admission into Senior Four is competitive and by admission test, as is admission for new learners joining Senior Five. Five combinations are offered:</p>
          <ul class="combo-list">
            <li><strong>PCM</strong> — Physics, Chemistry, Mathematics</li>
            <li><strong>MCB</strong> — Mathematics, Chemistry, Biology</li>
            <li><strong>MCE</strong> — Mathematics, Computer Science, Economics</li>
            <li><strong>MEG</strong> — Mathematics, Economics, Geography</li>
            <li><strong>MPC</strong> — Mathematics, Physics, Computer Science</li>
          </ul>
        </article>
        <article class="card offer-card">
          <h3>Life beyond the classroom</h3>
          <p>
            Beyond academics, IFAK forms young people through Salesian pastoral life, extracurricular activities and
            a faith-filled community — including preparations for national examinations (the school runs weekly
            tests for finalists), financial-literacy programmes such as the Money Makeover Challenge, and boarding
            for students, in line with the school’s commitment to inclusive boarding.
          </p>
          <p class="offer-links">
            <router-link to="/news">Read the school news →</router-link>
          </p>
        </article>
      </div>
    </div>
  </section>

  <!-- ============ MILESTONES ============ -->
  <section class="section" aria-labelledby="about-milestones-heading">
    <div class="container">
      <p class="eyebrow">Milestones</p>
      <h2 id="about-milestones-heading" class="section-title">A half-century and more at Kimihurura</h2>
      <ol class="timeline">
        <li>
          <span class="timeline-year">1964</span>
          <span class="timeline-body">IFAK is founded by the Salesians of Don Bosco, continuing Don Bosco’s mission of educating and evangelising young people.</span>
        </li>
        <li>
          <span class="timeline-year">2015</span>
          <span class="timeline-body">Golden jubilee — fifty years of education and evangelisation at Kimihurura.</span>
        </li>
        <li>
          <span class="timeline-year">2023</span>
          <span class="timeline-body">IFAK is selected as a pilot participant in the <a href="https://ifakdonbosco.ac.rw/ifak-don-bosco-selected-as-a-pilot-participant-in-tony-blairs-generation-global-program/" target="_blank" rel="noopener noreferrer">Tony Blair Institute’s Generation Global programme</a>, reflecting its commitment to global citizenship education.</span>
        </li>
        <li>
          <span class="timeline-year">2026</span>
          <span class="timeline-body">IFAK celebrates its <a href="https://ifakdonbosco.ac.rw/ifak-at-62-celebrating-st-john-boscos-day-with-a-commitment-to-inclusive-boarding/" target="_blank" rel="noopener noreferrer">62nd anniversary</a> on the Feast of St John Bosco (7 February 2026).</span>
        </li>
      </ol>
    </div>
  </section>

  <!-- ============ LEADERSHIP ============ -->
  <section class="section alt-section" aria-labelledby="about-leadership-heading">
    <div class="container">
      <p class="eyebrow">Leadership</p>
      <h2 id="about-leadership-heading" class="section-title">Key contacts at the school</h2>
      <p class="section-lede">As published on the official IFAK website. For anything not listed here, the school office will direct your enquiry.</p>
      <div class="lead-grid">
        <div class="card lead-card">
          <h3>Rev. Fr Jean Bosco Ntirenganya</h3>
          <p class="lead-role">Principal / Headmaster</p>
          <p>Leads the school and its Salesian educational mission. Enquiries through the school office: <a href="mailto:info@ifakdonbosco.ac.rw">info@ifakdonbosco.ac.rw</a> · <a href="tel:+250787949474">+250 787 949 474</a></p>
        </div>
        <div class="card lead-card">
          <h3>Mr Mwizerwa Isaïe</h3>
          <p class="lead-role">Dean of Studies</p>
          <p>Academic affairs, timetable and national examinations.</p>
          <p><a href="mailto:dos@ifakdonbosco.ac.rw">dos@ifakdonbosco.ac.rw</a> · <a href="tel:+250788519195">+250 788 519 195</a></p>
        </div>
        <div class="card lead-card">
          <h3>Rev. Fr Jean Claude Asifiwe, SDB</h3>
          <p class="lead-role">Dean of Discipline</p>
          <p>Discipline, student welfare and community life.</p>
          <p><a href="mailto:dod@ifakdonbosco.ac.rw">dod@ifakdonbosco.ac.rw</a> · <a href="tel:+250728223412">+250 728 223 412</a></p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ THE SALESIAN FAMILY ============ -->
  <section class="section" aria-labelledby="about-family-heading">
    <div class="container">
      <p class="eyebrow">The Salesian family at Kimihurura</p>
      <h2 id="about-family-heading" class="section-title">One mission, several works</h2>
      <p class="section-lede">
        IFAK is part of a Salesian presence in Kimihurura that also includes the schools, parish and community below.
        Each is governed separately; official pages are linked.
      </p>
      <dl class="family-grid">
        <div>
          <dt><a href="https://ifakdonbosco.ac.rw/ifak-primary-school/" target="_blank" rel="noopener noreferrer">Ecole Primaire d’Application de Kimihurura (EPAK)</a></dt>
          <dd>Salesian-founded (1990), government-aided primary school located beside IFAK. Headteacher: Br Jovite Sindayigaya, SDB.</dd>
        </div>
        <div>
          <dt><a href="https://ifakdonbosco.ac.rw/ifak-nursery-school/" target="_blank" rel="noopener noreferrer">Don Bosco Nursery and Primary School</a></dt>
          <dd>Nursery and primary education in the Salesian spirit at Kimihurura.</dd>
        </div>
        <div>
          <dt><a href="https://ifakdonbosco.ac.rw/paroisse-marie-auxiliatrice-2/" target="_blank" rel="noopener noreferrer">Paroisse Marie Auxiliatrice</a></dt>
          <dd>The Catholic parish of Mary Help of Christians, Kimihurura — a spiritual home for the community.</dd>
        </div>
        <div>
          <dt><a href="https://ifakdonbosco.ac.rw/communaute-salesienne/" target="_blank" rel="noopener noreferrer">Communauté Salésienne</a></dt>
          <dd>The Salesian religious community at Kimihurura.</dd>
        </div>
        <div>
          <dt><a href="https://ifakdonbosco.ac.rw/oratoire-5/" target="_blank" rel="noopener noreferrer">Oratoire</a></dt>
          <dd>The Salesian oratory — Don Bosco’s home for young people: prayer, play and belonging.</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- ============ CTA ============ -->
  <section class="cta-band" aria-labelledby="about-cta-heading">
    <div class="container cta-inner">
      <div>
        <h2 id="about-cta-heading">Come and see</h2>
        <p>Plan a visit, ask about admission or request information from the school office.</p>
      </div>
      <div class="cta-actions">
        <router-link class="btn btn-primary" to="/contact">Contact the school</router-link>
        <router-link class="btn btn-outline" to="/gallery">See the photo gallery</router-link>
      </div>
    </div>
  </section>

  <p class="sources-note container">
    Facts on this page were verified against the official IFAK website (ifakdonbosco.ac.rw) on 6 November 2026.
    If anything here differs from the school’s official communication, the official channels take precedence.
  </p>
</template>

<style scoped>
.section { padding-block: clamp(2rem, 4vw, 3.25rem); }
.alt-section { background: var(--surface); border-block: 1px solid var(--line); }
.section-lede { color: var(--muted); margin-top: 0.35rem; max-width: 70ch; }

.about-grid { display: grid; grid-template-columns: 7fr 5fr; gap: clamp(1.5rem, 3.5vw, 3rem); align-items: start; }
.about-grid p { margin-top: 0.85rem; line-height: 1.7; color: var(--ink); }
.about-media img { border-radius: var(--radius); border: 1px solid var(--line); width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.about-media figcaption { font-size: 0.78rem; color: var(--muted); margin-top: 0.5rem; line-height: 1.5; }
.about-media a { color: var(--navy); }

.about-quote {
  margin: 1.5rem 0 0; padding: 1rem 1.25rem;
  border-left: 3px solid var(--navy); background: var(--surface); border-radius: var(--radius-sm);
}
.about-quote p { margin: 0; font-style: italic; color: var(--navy-ink); line-height: 1.7; }
.about-quote cite { display: block; margin-top: 0.6rem; font-size: 0.82rem; font-style: normal; color: var(--muted); }

.facts-band { background: var(--navy); color: #fff; padding-block: 1.5rem; }
.facts-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.25rem; }
.fact dt { font-size: 0.64rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.62); }
.fact dd { font-size: 0.95rem; font-weight: 600; margin-top: 0.3rem; color: #fff; }

.offer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 1.5rem; }
.offer-card { padding: 1.35rem; }
.offer-card h3 { font-size: 1.02rem; font-weight: 600; color: var(--navy-ink); }
.offer-card p { margin-top: 0.55rem; color: var(--ink); line-height: 1.65; font-size: 0.94rem; }
.combo-list { margin: 0.65rem 0 0; padding-left: 1.1rem; display: grid; gap: 0.3rem; font-size: 0.92rem; color: var(--ink); }
.offer-links { margin-top: 0.75rem; }
.offer-links a { color: var(--navy); font-weight: 600; text-decoration: none; }
.offer-links a:hover { text-decoration: underline; }

.timeline { list-style: none; margin: 1.5rem 0 0; padding: 0; border-left: 2px solid var(--line-strong); }
.timeline li { display: grid; grid-template-columns: 90px 1fr; gap: 1.25rem; padding: 0.8rem 0 0.8rem 1.5rem; position: relative; }
.timeline li::before {
  content: ''; position: absolute; left: -7px; top: 1.35rem; width: 12px; height: 12px;
  border-radius: 50%; background: var(--navy); border: 2px solid #fff;
}
.timeline-year { font-weight: 700; color: var(--navy); font-size: 0.95rem; padding-top: 0.1rem; }
.timeline-body { color: var(--ink); line-height: 1.65; max-width: 78ch; }
.timeline-body a { color: var(--navy); }

.lead-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 1.5rem; }
.lead-card { padding: 1.35rem; }
.lead-card h3 { font-size: 1rem; font-weight: 600; color: var(--navy-ink); }
.lead-role { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 0.25rem; }
.lead-card p:not(.lead-role) { margin-top: 0.55rem; color: var(--ink); line-height: 1.6; font-size: 0.92rem; }
.lead-card a { color: var(--navy); }

.family-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 2rem; margin-top: 1.5rem; }
.family-grid > div { border-top: 1px solid var(--line); padding-top: 0.75rem; }
.family-grid dt { font-weight: 600; }
.family-grid dt a { color: var(--navy); text-decoration: none; }
.family-grid dt a:hover { text-decoration: underline; }
.family-grid dd { margin: 0.35rem 0 0; color: var(--muted); font-size: 0.9rem; line-height: 1.6; }

.cta-band { background: var(--navy-soft); border-block: 1px solid var(--line); padding-block: 1.75rem; }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.cta-inner h2 { font-size: 1.35rem; font-weight: 650; color: var(--navy-ink); }
.cta-inner p { color: var(--muted); margin-top: 0.25rem; }
.cta-actions { display: flex; gap: 0.65rem; flex-wrap: wrap; }

.sources-note { font-size: 0.8rem; color: var(--muted); padding-block: 1.25rem 0; margin-bottom: 1.5rem; }

@media (max-width: 1023px) {
  .about-grid { grid-template-columns: 1fr; }
  .offer-grid { grid-template-columns: 1fr; }
  .lead-grid { grid-template-columns: 1fr; }
  .facts-grid { grid-template-columns: repeat(3, 1fr); row-gap: 1.5rem; }
  .family-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .facts-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline li { grid-template-columns: 64px 1fr; gap: 0.85rem; }
}
</style>
