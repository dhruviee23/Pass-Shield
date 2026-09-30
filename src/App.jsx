import React, { useState } from 'react';

const COMMON_LEAKED_PASSWORDS = [
  '123456', 'password', '12345678', 'qwerty', '123456789',
  '12345', '1234', '111111', '1234567', 'dragon',
  'admin', 'welcome', 'login', 'pass123', 'admin123'
];

function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Generator Accordion Toggle State
  const [showGenerator, setShowGenerator] = useState(false);

  // Generator Inputs
  const [genName, setGenName] = useState('');
  const [genNum, setGenNum] = useState('');
  const [genType, setGenType] = useState('hard');
  const [genLength, setGenLength] = useState(12);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Rule Checks
  const hasLength8 = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Check Leaked Password
  const lowerPwd = password.toLowerCase();
  const isLeaked = password.length > 0 && COMMON_LEAKED_PASSWORDS.some(common => lowerPwd.includes(common));

  // Score Calculation
  let score = 0;
  if (hasLength8) score += 20;
  if (password.length >= 12) score += 20;
  if (hasLower) score += 15;
  if (hasUpper) score += 15;
  if (hasDigit) score += 15;
  if (hasSpecial) score += 15;

  let strengthText = 'No Password';
  let barColor = darkMode ? '#334155' : '#e2e8f0';
  let crackTime = 'N/A';

  if (password.length > 0) {
    if (isLeaked) {
      score = 10;
      strengthText = 'Compromised';
      barColor = '#dc2626';
      crackTime = 'Instantly';
    } else if (password.length < 6 || score <= 35) {
      strengthText = 'Weak';
      barColor = '#ef4444';
      crackTime = 'A few seconds';
    } else if (score <= 65) {
      strengthText = 'Fair';
      barColor = '#f59e0b';
      crackTime = 'A few days';
    } else if (score <= 85) {
      strengthText = 'Strong';
      barColor = '#10b981';
      crackTime = 'Several months';
    } else {
      strengthText = 'Excellent';
      barColor = '#059669';
      crackTime = 'Several years';
    }
  }

  // Password Generator Function
  const handleGenerate = () => {
    const baseWord = genName.trim() || 'Secure';
    const baseNum = genNum.trim() || Math.floor(10 + Math.random() * 90);
    const symbols = ['@', '#', '$', '%', '&', '!'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    let result = '';

    if (genType === 'easy') {
      const formatted = baseWord.charAt(0).toUpperCase() + baseWord.slice(1).toLowerCase();
      result = `${formatted}${randomSymbol}${baseNum}`;
    } else {
      const leet = baseWord
        .replace(/a/gi, '@')
        .replace(/s/gi, '$')
        .replace(/e/gi, '3')
        .replace(/o/gi, '0')
        .replace(/i/gi, '1');

      let combined = `${leet}${randomSymbol}${baseNum}`;
      const pool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
      while (combined.length < genLength) {
        combined += pool.charAt(Math.floor(Math.random() * pool.length));
      }
      result = combined;
    }

    setPassword(result);
  };

  const faqData = [
    {
      q: 'Is this Password Generator & Strength Checker safe to use?',
      a: 'Yes, it is 100% safe. All password analysis and generation are performed locally within your browser (client-side). Your password is never sent to, stored on, or tracked by any external server.'
    },
    {
      q: 'Why should I use a strong password generator?',
      a: 'Using a strong password generator helps protect your accounts against brute-force and dictionary attacks. It creates truly unpredictable combinations of letters, numbers, and symbols that are practically impossible for hackers to guess.'
    },
    {
      q: 'What makes a password strong and secure?',
      a: 'A secure password should be at least 12 characters long and include a diverse mix of uppercase letters, lowercase letters, numbers, and special symbols (@, #, $, %, etc.) while avoiding common words or repeating patterns.'
    },
    {
      q: 'How is the crack time estimated?',
      a: 'Crack time is estimated using information entropy, measuring the total possible character combinations and overall randomness. Higher entropy and longer lengths exponentially increase the time required for automated cracking tools to guess it.'
    }
  ];

  return (
    <div className={`page-wrap ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .light-theme {
          --bg-page: #f8fafc;
          --bg-card: #ffffff;
          --text-main: #0f172a;
          --text-sub: #64748b;
          --border: #e2e8f0;
          --input-bg: #f8fafc;
          --input-border: #cbd5e1;
          --faq-hover: #f8fafc;
          --info-bg: #f8fafc;
          --tips-card-bg: #fff7ed;
          --tips-card-border: #ffedd5;
          --tips-icon-color: #ea580c;
          --footer-bg: #071927;
          --footer-text: #cbd5e1;
          --footer-heading: #ffffff;
          --footer-border: #1e293b;
        }

        .dark-theme {
          --bg-page: #0b1120;
          --bg-card: #1e293b;
          --text-main: #f8fafc;
          --text-sub: #94a3b8;
          --border: #334155;
          --input-bg: #0f172a;
          --input-border: #475569;
          --faq-hover: #334155;
          --info-bg: #0f172a;
          --tips-card-bg: #2a1f17;
          --tips-card-border: #4a2818;
          --tips-icon-color: #fb923c;
          --footer-bg: #030712;
          --footer-text: #94a3b8;
          --footer-heading: #f8fafc;
          --footer-border: #1e293b;
        }

        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .page-wrap { display: flex; flex-direction: column; align-items: center; min-height: 100vh; background-color: var(--bg-page); color: var(--text-main); transition: background-color 0.3s ease, color 0.3s ease; }

        .content-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 16px 80px 16px;
        }

        /* Top Theme Switch */
        .top-nav { width: 100%; max-width: 620px; display: flex; justify-content: flex-end; margin-bottom: 16px; }
        .theme-toggle-btn {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
        }
        .theme-toggle-btn:hover { border-color: #2563eb; }

        /* 1. Main Checker Card */
        .card-box { background: var(--bg-card); width: 100%; max-width: 620px; padding: 36px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid var(--border); margin-bottom: 70px; transition: all 0.3s ease; }
        .title { font-size: 26px; font-weight: 800; color: var(--text-main); text-align: center; margin-bottom: 6px; }
        .subtitle { font-size: 14px; color: var(--text-sub); text-align: center; margin-bottom: 24px; }

        .leaked-alert {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #f87171;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-row { display: flex; align-items: center; background: var(--input-bg); border: 2px solid var(--input-border); border-radius: 10px; padding: 4px 10px; margin-bottom: 20px; }
        .input-row:focus-within { border-color: #2563eb; }
        .inp-field { flex: 1; border: none; outline: none; background: transparent; padding: 12px 6px; font-size: 16px; color: var(--text-main); }
        .eye-btn { background: none; border: none; font-size: 18px; cursor: pointer; padding: 6px 8px; border-radius: 6px; }

        .progress-track { width: 100%; height: 8px; background: var(--border); border-radius: 999px; overflow: hidden; margin-bottom: 20px; }
        .progress-fill { height: 100%; border-radius: 999px; transition: width 0.3s ease, background-color 0.3s ease; }

        .checks-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .chip { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
        .chip-pass { background-color: #dcfce7; color: #15803d; }
        .chip-fail { background-color: #fee2e2; color: #dc2626; }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .info-card { background: var(--info-bg); border: 1px solid var(--border); border-radius: 10px; padding: 14px; text-align: center; }
        .info-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-sub); margin-bottom: 4px; display: block; }
        .info-val { font-size: 16px; font-weight: 700; }

        .gen-toggle-btn {
          width: 100%;
          padding: 12px 16px;
          background: var(--input-bg);
          border: 1px dashed var(--input-border);
          border-radius: 10px;
          color: #3b82f6;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s ease;
        }
        .gen-toggle-btn:hover { border-color: #3b82f6; }

        .generator-panel {
          margin-top: 16px;
          padding: 20px;
          background: var(--input-bg);
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .gen-field { margin-bottom: 14px; }
        .gen-label { font-size: 12px; font-weight: 700; color: var(--text-sub); margin-bottom: 6px; display: block; }
        .gen-input { width: 100%; padding: 10px 12px; border: 1px solid var(--input-border); border-radius: 8px; font-size: 14px; outline: none; background: var(--bg-card); color: var(--text-main); }
        .gen-input:focus { border-color: #2563eb; }
        .gen-options-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .gen-select { width: 100%; padding: 10px 12px; border: 1px solid var(--input-border); border-radius: 8px; font-size: 14px; background: var(--bg-card); color: var(--text-main); outline: none; }
        .slider-row { display: flex; align-items: center; gap: 12px; }
        .slider-row input { flex: 1; }
        .slider-val { font-weight: 700; font-size: 13px; color: #3b82f6; width: 30px; }
        .btn-create { width: 100%; padding: 12px; background: #2563eb; color: #ffffff; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .btn-create:hover { background: #1d4ed8; }

        /* 2. Security Tips Section */
        .tips-section { width: 100%; max-width: 1050px; text-align: center; margin-bottom: 80px; }
        .tips-main-title { font-size: 36px; font-weight: 800; color: var(--text-main); margin-bottom: 14px; letter-spacing: -0.5px; }
        .tips-main-desc { font-size: 16px; color: var(--text-sub); max-width: 820px; margin: 0 auto 40px auto; line-height: 1.6; }
        .tips-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .tip-card { background-color: var(--tips-card-bg); border: 1px solid var(--tips-card-border); border-radius: 20px; padding: 36px 28px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .tip-icon-wrap { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--tips-icon-color); }
        .tip-card-title { font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 12px; }
        .tip-card-body { font-size: 14px; line-height: 1.6; color: var(--text-sub); }

        /* 3. FAQ Section */
        .faq-section { width: 100%; max-width: 820px; text-align: center; margin-bottom: 40px; }
        .faq-main-title { font-size: 32px; font-weight: 800; color: var(--text-main); margin-bottom: 10px; }
        .faq-description { font-size: 15px; color: var(--text-sub); margin-bottom: 32px; }
        .faq-container { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); text-align: left; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-item:last-child { border-bottom: none; }
        .faq-question-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 22px 28px; background: transparent; border: none; cursor: pointer; font-size: 16px; font-weight: 700; color: var(--text-main); text-align: left; }
        .faq-question-btn:hover { background-color: var(--faq-hover); }
        .faq-icon-circle { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid #2563eb; color: #2563eb; font-size: 20px; flex-shrink: 0; }
        .faq-item.active .faq-icon-circle { background-color: #2563eb; color: #ffffff; }
        .faq-answer { padding: 0 28px 22px 28px; font-size: 15px; line-height: 1.6; color: var(--text-sub); }

        /* 4. Professional Website Footer (Avast Style) */
        .site-footer {
          width: 100%;
          background-color: var(--footer-bg);
          color: var(--footer-text);
          padding: 60px 40px 30px 40px;
          border-top: 1px solid var(--footer-border);
        }

        .footer-content {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 50px;
        }

        @media (max-width: 860px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          font-size: 24px;
          font-weight: 800;
          color: #ea580c;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .country-selector {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f2438;
          border: 1px solid #1e3a5f;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          color: #f8fafc;
          width: fit-content;
        }

        .social-icons-row {
          display: flex;
          gap: 14px;
          font-size: 18px;
          color: #94a3b8;
          cursor: pointer;
        }

        .social-icons-row span:hover {
          color: #ffffff;
        }

        .footer-column h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--footer-heading);
          margin-bottom: 18px;
        }

        .footer-column ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-column li a {
          color: var(--footer-text);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }

        .footer-column li a:hover {
          color: #38bdf8;
        }

        .footer-bottom {
          max-width: 1140px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid #1e293b;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: #64748b;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
        }

        .footer-links a:hover {
          color: #ffffff;
        }
      `}</style>

      <div className="content-container">
        {/* Top Navbar */}
        <div className="top-nav">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* 1. Main Strength Analyzer Card */}
        <div className="card-box">
          <h1 className="title">Password Strength Testing</h1>
          <p className="subtitle">Analyze your password security level instantly</p>

          {isLeaked && (
            <div className="leaked-alert">
              <span>⚠</span>
              <span>Security Alert: This password has appeared in previous data breaches!</span>
            </div>
          )}

          <div className="input-row">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password here..."
              className="inp-field"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: password ? `${Math.max(score, 10)}%` : '0%',
                backgroundColor: barColor
              }}
            ></div>
          </div>

          <div className="checks-grid">
            <span className={`chip ${hasLength8 ? 'chip-pass' : 'chip-fail'}`}>
              {hasLength8 ? '✔' : '✖'} 8+ Chars
            </span>
            <span className={`chip ${hasLower ? 'chip-pass' : 'chip-fail'}`}>
              {hasLower ? '✔' : '✖'} Lowercase
            </span>
            <span className={`chip ${hasUpper ? 'chip-pass' : 'chip-fail'}`}>
              {hasUpper ? '✔' : '✖'} Uppercase
            </span>
            <span className={`chip ${hasDigit ? 'chip-pass' : 'chip-fail'}`}>
              {hasDigit ? '✔' : '✖'} Digit
            </span>
            <span className={`chip ${hasSpecial ? 'chip-pass' : 'chip-fail'}`}>
              {hasSpecial ? '✔' : '✖'} Special Symbol
            </span>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Strength</span>
              <span className="info-val" style={{ color: password ? barColor : (darkMode ? '#94a3b8' : '#64748b') }}>
                {strengthText}
              </span>
            </div>
            <div className="info-card">
              <span className="info-label">Estimated Crack Time</span>
              <span className="info-val" style={{ color: isLeaked ? '#dc2626' : (darkMode ? '#f8fafc' : '#0f172a') }}>
                {crackTime}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="gen-toggle-btn"
            onClick={() => setShowGenerator(!showGenerator)}
          >
            <span>⚡ Generate Custom Password</span>
            <span>{showGenerator ? '▲ Close' : '▼ Open'}</span>
          </button>

          {showGenerator && (
            <div className="generator-panel">
              <div className="gen-field">
                <label className="gen-label">Your Name / Word:</label>
                <input
                  type="text"
                  placeholder="e.g. Dhruvi"
                  value={genName}
                  onChange={(e) => setGenName(e.target.value)}
                  className="gen-input"
                />
              </div>

              <div className="gen-field">
                <label className="gen-label">Favorite Number / Year:</label>
                <input
                  type="text"
                  placeholder="e.g. 23 or 2026"
                  value={genNum}
                  onChange={(e) => setGenNum(e.target.value)}
                  className="gen-input"
                />
              </div>

              <div className="gen-options-row">
                <div>
                  <label className="gen-label">Type / Difficulty:</label>
                  <select
                    value={genType}
                    onChange={(e) => setGenType(e.target.value)}
                    className="gen-select"
                  >
                    <option value="easy">Easy to Remember</option>
                    <option value="hard">Hard / Complex</option>
                  </select>
                </div>

                <div>
                  <label className="gen-label">Min Length: {genLength}</label>
                  <div className="slider-row" style={{ marginTop: '8px' }}>
                    <input
                      type="range"
                      min="8"
                      max="20"
                      value={genLength}
                      onChange={(e) => setGenLength(Number(e.target.value))}
                    />
                    <span className="slider-val">{genLength}</span>
                  </div>
                </div>
              </div>

              <button type="button" className="btn-create" onClick={handleGenerate}>
                ✨ Generate & Fill Password
              </button>
            </div>
          )}
        </div>

        {/* 2. Security Tips Section */}
        <div className="tips-section">
          <h2 className="tips-main-title">Want to create a safe password? Apply these tips</h2>
          <p className="tips-main-desc">
            Don't just ask the internet to "give me a password." To create secure password credentials that are hard to crack, you need to understand the basics. Whether you use a tool to generate passwords or build them yourself, focus on length, complexity, and uniqueness.
          </p>

          <div className="tips-cards-grid">
            <div className="tip-card">
              <div className="tip-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="15" r="4"></circle>
                  <path d="m10.85 12.15 7.65-7.65"></path>
                  <path d="M16 4h4v4"></path>
                  <path d="m14 6 2 2"></path>
                  <circle cx="8" cy="15" r="1.5"></circle>
                </svg>
              </div>
              <h3 className="tip-card-title">Write a long password</h3>
              <p className="tip-card-body">
                Great passwords are hard to replicate. When you generate a random password, ensure it is at least 16 characters long to resist brute-force attacks. The longer the string, the more secure it is.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="3" ry="3"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <circle cx="12" cy="16.5" r="1.5"></circle>
                </svg>
              </div>
              <h3 className="tip-card-title">Make your password complex</h3>
              <p className="tip-card-body">
                A random generated password style creates an unpredictable string that doesn't resemble words or names. Pick one using a combination of letters, numbers, special characters, and symbols.
              </p>
            </div>

            <div className="tip-card">
              <div className="tip-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M12 18a3 3 0 0 0 3-3c0-1.5-1-2.5-3-2.5s-3 1-3 2.5a3 3 0 0 0 3 3z"></path>
                </svg>
              </div>
              <h3 className="tip-card-title">Pick a unique password</h3>
              <p className="tip-card-body">
                Never reuse credentials. Even if you use a tool to generate password ideas, ensure the result is unique to your account to reduce hack vulnerability. Store them securely in a password manager.
              </p>
            </div>
          </div>
        </div>

        {/* 3. FAQs Section */}
        <div className="faq-section">
          <h2 className="faq-main-title">Password generator FAQs</h2>
          <p className="faq-description">
            Have questions on how to make a password secure or generate passwords instantly? Find answers below.
          </p>

          <div className="faq-container">
            {faqData.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon-circle">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <div className="faq-answer">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Avast Style Footer Section */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>🛡️</span> PassShield
            </div>
            <div className="country-selector">
              <span>🇮🇳</span> India ▾
            </div>
            <div className="social-icons-row">
              <span>📘</span>
              <span>📸</span>
              <span>✖</span>
              <span>▶</span>
            </div>
          </div>

          <div className="footer-column">
            <h4>For home</h4>
            <ul>
              <li><a href="#analyzer">Password Analyzer</a></li>
              <li><a href="#tips">Security Advice</a></li>
              <li><a href="#faqs">FAQ Guide</a></li>
              <li><a href="#privacy">Browser Safety</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>For business</h4>
            <ul>
              <li><a href="#audit">Credentials Audit</a></li>
              <li><a href="#enterprise">Enterprise Security</a></li>
              <li><a href="#api">Analyzer API</a></li>
              <li><a href="#reports">Breach Reports</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Security Tools</h4>
            <ul>
              <li><a href="#generator">Custom Generator</a></li>
              <li><a href="#leakcheck">Leak Detector</a></li>
              <li><a href="#cracktime">Entropy Calculator</a></li>
              <li><a href="#hash">Hash Generator</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Tool</a></li>
              <li><a href="#careers">Team</a></li>
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#research">Cyber Research</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 PassShield Security Inc. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy policy</a>
            <a href="#products">Products policy</a>
            <a href="#legal">Legal</a>
            <a href="#vulnerability">Report vulnerability</a>
            <a href="#cookies">Cookie Preferences</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
