import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiPhone, FiInstagram, FiLinkedin, FiTwitter,
  FiArrowRight, FiMenu, FiX, FiExternalLink, FiStar,
  FiTrendingUp, FiUsers, FiBarChart2, FiAward, FiTarget, FiHeart
} from 'react-icons/fi';
import heroImg from './assets/hero.jpeg';
import aboutImg from './assets/about.png';
import workImg from './assets/work.png';
import logoImg from './assets/logo.png';
import './App.css';

// ─── Utility hook ────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, inView, delay };
}

// ─── Navigation ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Services', 'Portfolio', 'Contact'];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="nav-logo" onClick={() => scrollTo('hero')}>
          <img src={logoImg} alt="Kancharana Jyothsna" className="nav-logo-img" />
        </div>

        <ul className="nav-links">
          {links.map((link, i) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <button className="nav-link" onClick={() => scrollTo(link.toLowerCase())}>
                {link}
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="mailto:saradhakancharana@gmail.com"
          className="nav-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Hire Me
        </motion.a>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                className="mobile-link"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i }}
                onClick={() => scrollTo(link.toLowerCase())}
              >
                {link}
              </motion.button>
            ))}
            <a href="mailto:saradhakancharana@gmail.com" className="mobile-cta">
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="hero">
      <motion.div className="hero-bg-wrap" style={{ y }}>
        <img src={heroImg} alt="Kancharana Jyothsna" className="hero-bg-img" />
        <div className="hero-overlay" />
      </motion.div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.span
          className="hero-label"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.6em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Creative Presentation
        </motion.span>

        <div className="hero-title-wrap">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            PORTFOLIO
          </motion.h1>
        </div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div>
            <p className="hero-name">Kancharana Jyothsna</p>
            <p className="hero-role">Influencer Marketing Manager</p>
          </div>
          <div className="hero-tagline-wrap">
            <p className="hero-tagline">
              Crafting stories that <em>connect brands</em><br />with the right voices.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.button
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact Me <FiArrowRight className="btn-icon" />
          </motion.button>
          <motion.button
            className="btn-outline"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View Work
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="hero-scroll-hint">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="scroll-dot"
        />
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: '30+', label: 'Brands Collaborated' },
    { value: '100+', label: 'Campaigns Managed' },
    { value: '1M+', label: 'Reach Generated' },
    { value: '2 Yrs', label: 'Industry Experience' },
  ];

  const { ref, inView } = useFadeIn();

  return (
    <motion.section
      ref={ref}
      className="stats-bar"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 + 0.2 }}
        >
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}

// ─── About Section ────────────────────────────────────────────────
function About() {
  const { ref, inView } = useFadeIn();

  return (
    <section id="about" className="about">
      <div className="section-container" ref={ref}>
        <motion.div
          className="about-image-col"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="about-img-frame">
            <img src={aboutImg} alt="Jyothsna" className="about-img" />
            <div className="about-img-overlay" />
            <div className="about-img-border" />
            <div className="about-badge">
              <FiStar className="badge-icon" />
              <span>2+ Years</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about-text-col"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Where Strategy<br />Meets <em>Influence</em>
          </h2>
          <div className="about-divider" />
          <p className="about-text">
            I'm <strong>Kancharana Jyothsna</strong>, an Influencer Marketing Manager passionate about
            building authentic connections between brands and content creators. With years of hands-on
            experience, I specialize in crafting data-driven influencer campaigns that resonate,
            engage, and convert.
          </p>
          <p className="about-text">
            From identifying the perfect creator match to measuring ROI, I manage the entire
            campaign lifecycle — bringing creativity and analytical rigor to every partnership.
            My approach blends storytelling, audience insights, and brand values into campaigns
            that leave a lasting impression.
          </p>
          <div className="about-skills">
            {['Campaign Strategy', 'Creator Relations', 'Analytics & ROI', 'Brand Storytelling'].map((skill) => (
              <span key={skill} className="skill-chip">{skill}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────
function Services() {
  const { ref, inView } = useFadeIn();

  const services = [
    {
      icon: <FiTarget size={28} />,
      title: 'Campaign Strategy',
      desc: 'End-to-end influencer campaign planning aligned with your brand goals, budget, and target audience for maximum impact.',
    },
    {
      icon: <FiUsers size={28} />,
      title: 'Creator Sourcing',
      desc: 'Identifying and vetting the perfect influencers — micro to mega — whose audience authentically aligns with your brand.',
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: 'Brand Collaborations',
      desc: 'Negotiating and managing long-term brand partnerships that drive sustained awareness and community growth.',
    },
    {
      icon: <FiBarChart2 size={28} />,
      title: 'Analytics & Reporting',
      desc: 'Deep-dive campaign performance tracking with actionable insights, engagement metrics, and transparent ROI reports.',
    },
    {
      icon: <FiHeart size={28} />,
      title: 'Content Direction',
      desc: 'Guiding creators to produce authentic, on-brand content that resonates with their audience and meets your KPIs.',
    },
    {
      icon: <FiAward size={28} />,
      title: 'Influencer Events',
      desc: 'Organizing immersive brand experiences, product launches, and influencer gifting programs that create organic buzz.',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="section-container column" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">What I Do</span>
          <h2 className="section-title centered">
            Services & <em>Expertise</em>
          </h2>
          <p className="section-subtitle">
            Comprehensive influencer marketing solutions tailored to elevate your brand's digital presence.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────
function Portfolio() {
  const { ref, inView } = useFadeIn();

 const campaigns = [
  { 
    category: 'Film Industry', 
    title: 'Movie Brats Collaboration', 
    result: 'Worked on film-related campaigns', 
    color: '#c9a96e' 
  },
  { 
    category: 'Media Company', 
    title: 'Eco Craft Media Pvt Limited', 
    result: 'Handled digital & influencer campaigns', 
    color: '#c9a96e'
  },
  { 
    category: 'Influencer Marketing', 
    title: 'Celebrity & Serial Actor Collaborations', 
    result: 'Partnered with actors & influencers', 
    color: '#c9a96e' 
  }
];

  return (
    <section id="portfolio" className="portfolio">
      <div className="section-container column" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">My Work</span>
          <h2 className="section-title centered">
            Featured <em>Campaigns</em>
          </h2>
        </motion.div>

        <div className="portfolio-layout">
          {/* Feature image */}
          <motion.div
            className="portfolio-feature"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <img src={workImg} alt="Campaign Work" className="portfolio-img" />
            <div className="portfolio-img-overlay">
              <div className="portfolio-img-content">
                <span className="portfolio-tag">Hyderabad</span>
                <h3 className="portfolio-img-title">EchoCraft Media</h3>
                <div className="portfolio-result">
                  <FiTrendingUp size={14} />
                  <span>500+ Organic Impressions</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Campaign cards */}
          <div className="portfolio-cards">
            {campaigns.map((c, i) => (
              <motion.div
                key={c.title}
                className="campaign-card"
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
              >
                <div className="campaign-info">
                  <span className="campaign-category">{c.category}</span>
                  <div className="campaign-title-row">
                    <div className="campaign-color-dot" style={{ background: c.color }} />
                    <h4 className="campaign-title">{c.title}</h4>
                  </div>
                  <div className="campaign-result" style={{ color: c.color }}>
                    {c.result}
                  </div>
                </div>
                <FiExternalLink className="campaign-arrow" size={14} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────
function Contact() {
  const { ref, inView } = useFadeIn();

  const socials = [
    { icon: <FiInstagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/official_jyothsna?igsh=OGJycmY2bndxemNx' },
    { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: '#' },
    { icon: <FiTwitter size={20} />, label: 'Twitter', href: '#' },
  ];

  return (
    <section id="contact" className="contact">
      <div className="section-container column" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title centered">
            Let's Build Something <em>Together</em>
          </h2>
          <p className="section-subtitle">
            Ready to elevate your brand with authentic influencer marketing?<br />
            Let's start a conversation.
          </p>
        </motion.div>

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="contact-glow" />

          <div className="contact-info-grid">
            <motion.a
              href="mailto:saradhakancharana@gmail.com"
              className="contact-item"
              whileHover={{ y: -4 }}
            >
              <div className="contact-icon">
                <FiMail size={22} />
              </div>
              <div>
                <span className="contact-item-label">Email</span>
                <span className="contact-item-value">saradhakancharana@gmail.com</span>
              </div>
            </motion.a>

            <motion.a
              href="tel:+919749720516"
              className="contact-item"
              whileHover={{ y: -4 }}
            >
              <div className="contact-icon">
                <FiPhone size={22} />
              </div>
              <div>
                <span className="contact-item-label">Phone</span>
                <span className="contact-item-value">+91 97497 20516</span>
              </div>
            </motion.a>
          </div>

          <div className="contact-divider" />

          <div className="contact-socials">
            <p className="contact-social-label">Connect on Social</p>
            <div className="social-icons">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  className="social-icon"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <motion.a
            href="mailto:saradhakancharana@gmail.com"
            className="contact-cta"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Me a Message <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-name">Kancharana Jyothsna</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} · Influencer Marketing Manager · All rights reserved<br />
          @Designed by <a href="https://www.instagram.com/s_a_i_k_a_m_a_l?igsh=amUyZzdpaXQ3NXEz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Sai Kamal</a>
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = logoImg;
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
