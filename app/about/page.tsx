'use client';

import { VscGithub, VscMail } from 'react-icons/vsc';
import Link from 'next/link';

import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.name}>Ansh Varshney</h1>
              <p className={styles.role}>Data Science @ IIT Madras | Summer Intern @ IIT Ropar | OSCI 2026 Contributor | Founder @ Technical Innovations Forum</p>
              <div className={styles.location}>
                <span className={styles.dot} />
                Chennai, Tamil Nadu, India
              </div>
            </div>
          </div>

          <div className={styles.headerActions}>
            <a
              href="https://github.com/anshvarshney1502"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
            >
              <VscGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/anshvarshneyy/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
            >
              in
            </a>
            <Link href="/contact" className={styles.iconButton}>
              <VscMail size={20} />
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          {/* Bio Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>01</span>
              <h2 className={styles.sectionTitle}>About</h2>
            </div>

            <div className={styles.sectionBody}>
              <p className={styles.paragraph}>
                Building intelligent software with data, AI, and open source. Currently
                pursuing a BS in Data Science and Applications at IIT Madras, with hands-on
                experience through a Summer Internship at IIT Ropar (VLED Lab), open-source
                contributions via OSCI 2026, and community leadership at the Technical
                Innovations Forum.
              </p>

              <p className={styles.paragraph}>
                Deeply interested in Artificial Intelligence, Machine Learning, Large Language
                Models, and software engineering that creates meaningful real-world impact.
                Active member of the Cohere Labs Open Science Community and Coders High.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>02</span>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Aug 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Open Source Contributor | OSCI 2026</h3>
                <p className={styles.expCompany}>Open Source Connect · Part-time · Remote</p>
                <ul className={styles.expList}>
                  <li>Selected as a contributor for Open Source Contribution Initiative (OSCI) 2026</li>
                  <li>Collaborating on real-world open-source projects with global maintainers</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jul 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Open Source Contributor</h3>
                <p className={styles.expCompany}>Indian Institute of Technology, Ropar · Part-time · Remote</p>
                <ul className={styles.expList}>
                  <li>Continuing open-source contributions at IIT Ropar post-internship</li>
                  <li>Focused on Open-Source Development workflows and collaboration</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jul 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Founder & Community Lead</h3>
                <p className={styles.expCompany}>Technical Innovations Forum · Self-employed</p>
                <ul className={styles.expList}>
                  <li>Founded and lead a technical community of 50+ members</li>
                  <li>Curate and share AI tools, GitHub repositories, developer resources, APIs, and free learning opportunities</li>
                  <li>Facilitate discussions on AI, open source, software development, and emerging technologies</li>
                  <li>Support members by sharing useful technical resources and developer tools</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>May 2026 - Jul 2026</span>
                </div>
                <h3 className={styles.expRole}>Summer Intern – AI & Open Source</h3>
                <p className={styles.expCompany}>Indian Institute of Technology, Ropar · Internship · Remote</p>
                <ul className={styles.expList}>
                  <li>Summer Internship 2026 at Vicharanashala Lab for Education Design (VLED Lab), IIT Ropar</li>
                  <li><strong>CSFAQ:</strong> Contributed to a student-facing FAQ and query-resolution platform enabling students to raise questions, seek support, and escalate queries</li>
                  <li><strong>PyBe:</strong> Helped lead development of an interactive, case-based Python learning platform focused on real-world scenarios and structured problem-solving</li>
                  <li>Worked with Git/GitHub, open-source workflows, feature development, and collaborative software development</li>
                  <li><strong>Achievements:</strong> SPURTI Leaderboard All-Time Rank 7 · Cohort Rank 4 · 1,621 SP · Level 16</li>
                  <li><strong>Recognition:</strong> Legend (All-Time), 3,600-Minute Club, Matrix Mystics SPA Cohort Rank 1 (Sextillionaire Score)</li>
                  <li>Invited to the Coders High Community during the internship</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Aug 2025 - Nov 2025</span>
                </div>
                <h3 className={styles.expRole}>Perplexity Campus Partner</h3>
                <p className={styles.expCompany}>Perplexity · Part-time · Remote</p>
                <ul className={styles.expList}>
                  <li>Selected as a 2025 Perplexity Campus Partner to drive AI adoption and promote the Comet browser on campus</li>
                  <li>Collaborated with the Perplexity team and fellow Campus Partners on marketing campaigns and community engagement</li>
                  <li>Created educational content, gathered user feedback, and drove awareness of Perplexity&apos;s AI products</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Apr 2025 - Mar 2026</span>
                </div>
                <h3 className={styles.expRole}>Tutor</h3>
                <p className={styles.expCompany}>Self-Employed · Part-time · On-site</p>
                <ul className={styles.expList}>
                  <li>Taught and mentored students in academic subjects for one year</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Nov 2022 - Apr 2024</span>
                </div>
                <h3 className={styles.expRole}>Content Creator, Video Editor & Social Media Manager</h3>
                <p className={styles.expCompany}>Self-Employed</p>
                <ul className={styles.expList}>
                  <li>Created content, edited videos, and managed social media for over 1.5 years</li>
                  <li>Invited by MyGov India to participate in the nomination process for the National Creators Awards 2024</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>03</span>
              <h2 className={styles.sectionTitle}>Education</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>2024 - Present</span>
                </div>
                <h3 className={styles.expRole}>BS in Data Science and Applications</h3>
                <p className={styles.expCompany}>Indian Institute of Technology, Madras</p>
              </div>
            </div>
          </section>

          {/* Skills & Languages Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>04</span>
              <h2 className={styles.sectionTitle}>Skills & Languages</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.skillsGrid}>
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Technical Skills</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Python</span>
                    <span className={styles.skillTag}>Machine Learning</span>
                    <span className={styles.skillTag}>Open Science</span>
                    <span className={styles.skillTag}>Open-Source Development</span>
                    <span className={styles.skillTag}>MERN Stack</span>
                    <span className={styles.skillTag}>GitHub</span>
                    <span className={styles.skillTag}>Data Science</span>
                    <span className={styles.skillTag}>Artificial Intelligence</span>
                    <span className={styles.skillTag}>Problem Solving</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Leadership & Soft Skills</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Community Management</span>
                    <span className={styles.skillTag}>Leadership</span>
                    <span className={styles.skillTag}>Teamwork</span>
                    <span className={styles.skillTag}>Teaching</span>
                    <span className={styles.skillTag}>Technical Curation</span>
                  </div>
                </div>

                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Spoken Languages</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Hindi (Native/Bilingual)</span>
                    <span className={styles.skillTag}>English (Professional Working)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>05</span>
              <h2 className={styles.sectionTitle}>Licenses & Certifications</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>ML Summer School 2026</h3>
                <p className={styles.expCompany}>Cohere · Issued Aug 2026</p>
                <ul className={styles.expList}>
                  <li>Credential ID: aca4e320-9de8-4f0c-9746-836fc13aa0b4</li>
                  <li>Skills: Open Science, Machine Learning</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Summer Analytics 2026 — Capstone Completion</h3>
                <p className={styles.expCompany}>Consulting & Analytics Club, IIT Guwahati · Issued Jul 2026</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Summer Analytics 2026 — Merit & Participation Certificate</h3>
                <p className={styles.expCompany}>Consulting & Analytics Club, IIT Guwahati · Issued Jul 2026</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>Academic Process Mining Fundamentals</h3>
                <p className={styles.expCompany}>Celonis · Issued Jun 2026</p>
              </div>

              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>5-Day AI Agents: Intensive Vibe Coding Course</h3>
                <p className={styles.expCompany}>Google · Issued Jun 2026</p>
              </div>
            </div>
          </section>

          {/* Volunteering Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>06</span>
              <h2 className={styles.sectionTitle}>Volunteering</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Aug 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Intern · Health</h3>
                <p className={styles.expCompany}>Handheld for PCOS</p>
              </div>
            </div>
          </section>

          {/* Organizations Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>07</span>
              <h2 className={styles.sectionTitle}>Organizations</h2>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Aug 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Open Science Community Member</h3>
                <p className={styles.expCompany}>Cohere Labs Open Science Community</p>
                <ul className={styles.expList}>
                  <li>Engaging in technical discussions, collaborative learning, and knowledge exchange with AI, ML, and LLM researchers, engineers, and practitioners</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jun 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Community Member</h3>
                <p className={styles.expCompany}>Coders High (Associated with IIT Ropar)</p>
                <ul className={styles.expList}>
                  <li>Active in discussions and learning initiatives on programming, software development, and data science</li>
                  <li>Exchange knowledge, solve problems, and stay current with industry trends</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <Link href="/projects" className={styles.footerLink}>
            View my projects →
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
