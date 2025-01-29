import React, { useState } from "react";

export default function Content() {
  return (
    <div className="content-wrapper">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="section2-container">
      <h1 className="section2-heading">Contact us</h1>
      <p>bloom scroll</p>
    </div>
  );
};

const navItems = [
    { label: 'Instagram', value: '' },
    { label: 'Email', value: '' },
    { label: 'Linkedin', value: '' },
    { label: 'Twitter', value: '' },
  ];
  
  const Nav = () => {
    const [copiedText, setCopiedText] = useState('');
  
    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000); // Clear message after 2 seconds
    };
  
    return (
      <div className="nav-container">
        <div className="nav-column">
          <h3 className="nav-title">Socials</h3>
          {navItems.map((item) => (
            <div key={item.value} className="copy-container">
              <p
                onClick={() => handleCopy(item.value)}
                className="copyable"
              >
                {item.label}
              </p>
              {copiedText === item.value && (
                <span className="copied-message">Copied!</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  