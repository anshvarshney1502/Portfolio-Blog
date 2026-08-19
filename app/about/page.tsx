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
              <p className={styles.role}>Data Science @ IIT Madras | Summer Intern @ IIT Ropar | Open Source Contributor @ ECSoC</p>
              <div className={styles.location}>
                <span className={styles.dot} />
                Aligarh, Uttar Pradesh, India
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
                pursuing a BS in Data Science at IIT Madras while gaining hands-on experience 
                through a Summer Internship at IIT Ropar and contributing to open-source projects 
                through Elite Coders Summer of Code (ECSoC).
              </p>
              
              <p className={styles.paragraph}>
                I am deeply interested in Artificial Intelligence, Machine Learning, and software 
                engineering that creates meaningful real-world impact.
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
                  <span className={styles.expPeriod}>July 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Open Source Contributor</h3>
                <p className={styles.expCompany}>Elite Coders (ECSoC)</p>
                <ul className={styles.expList}>
                  <li>Actively contributing to open-source software projects through Elite Coders Summer of Code</li>
                  <li>Collaborating with developers on core features, optimizations, and bug fixes</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>July 2026 - Present</span>
                </div>
                <h3 className={styles.expRole}>Founder & Community Lead</h3>
                <p className={styles.expCompany}>Technical Innovations Forum</p>
                <ul className={styles.expList}>
                  <li>Founded and lead a technical community with 50+ active members</li>
                  <li>Curate and share AI tools, GitHub repos, developer resources, and free learning opportunities</li>
                  <li>Facilitate engaging discussions on AI, open source, and emerging technologies</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>May 2026 - July 2026</span>
                </div>
                <h3 className={styles.expRole}>Summer Intern, AI & Open Source</h3>
                <p className={styles.expCompany}>Indian Institute of Technology, Ropar</p>
                <ul className={styles.expList}>
                  <li>Selected for Summer Internship 2026 at VLED Lab, IIT Ropar</li>
                  <li>Worked on India-centric AI and open-source software projects (such as CS9 crowdsourced FAQ portal)</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>August 2025 - November 2025</span>
                </div>
                <h3 className={styles.expRole}>Campus Partner</h3>
                <p className={styles.expCompany}>Perplexity</p>
                <ul className={styles.expList}>
                  <li>Selected as 2025 Perplexity Campus Partner to drive AI adoption</li>
                  <li>Promoted Comet browser and modern AI workflows among student communities</li>
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
                    <span className={styles.skillTag}>JavaScript / TypeScript</span>
                    <span className={styles.skillTag}>Data Science</span>
                    <span className={styles.skillTag}>Artificial Intelligence</span>
                    <span className={styles.skillTag}>Machine Learning</span>
                    <span className={styles.skillTag}>Git / GitHub</span>
                  </div>
                </div>
                
                <div className={styles.skillCategory}>
                  <h4 className={styles.skillTitle}>Leadership & Soft Skills</h4>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Community Management</span>
                    <span className={styles.skillTag}>Leadership</span>
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
              <h2 className={styles.sectionTitle}>Certifications</h2>
            </div>
            
            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <h3 className={styles.expRole}>5-Day AI Agents: Intensive Vibe Coding Course</h3>
                <p className={styles.expCompany}>Google</p>
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
