import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'email',
    link: 'anshvarshney1502@gmail.com',
    href: 'mailto:anshvarshney1502@gmail.com',
  },
  {
    social: 'github',
    link: 'anshvarshney1502',
    href: 'https://github.com/anshvarshney1502',
  },
  {
    social: 'linkedin',
    link: 'anshvarshneyy',
    href: 'https://www.linkedin.com/in/anshvarshneyy/',
  },
  {
    social: 'instagram',
    link: '_anshhit_',
    href: 'https://www.instagram.com/_anshhit_/',
  },
  {
    social: 'location',
    link: 'Aligarh, Uttar Pradesh, India',
    href: 'https://maps.google.com/?q=Aligarh,Uttar+Pradesh,India',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
