import { ModuleInfo } from '../types';

export const EHE_MODULES: ModuleInfo[] = [
  {
    id: 'mod-01',
    number: 1,
    title: 'Module 01: Information Security Fundamentals',
    shortTitle: 'InfoSec Fundamentals',
    subTopics: [
      'Information Security Fundamentals (CIA Triad, Non-Repudiation, Authenticity)',
      'Information Security Laws and Regulations (HIPAA, PCI-DSS, GDPR, FISMA, SOX, DMCA)',
      'Threat Vectors & Defense-in-Depth Concepts'
    ],
    description: 'Foundational pillars of cybersecurity, risk management principles, regulatory frameworks, and compliance standards.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'mod-02',
    number: 2,
    title: 'Module 02: Ethical Hacking Fundamentals',
    shortTitle: 'Ethical Hacking & Kill Chain',
    subTopics: [
      'Cyber Kill Chain Methodology (7 Steps)',
      'Hacking Concepts and Hacker Classes (White, Black, Grey, Suicide, Script Kiddies)',
      'Different Phases of Hacking Cycle (Recon, Scanning, Gaining/Maintaining Access, Clearing Tracks)',
      'Ethical Hacking Concepts, Scope, and Limitations',
      'Ethical Hacking Tools Taxonomy'
    ],
    description: 'The attacker mindset, phases of cyber attacks, Kill Chain progression, rules of engagement, and ethical boundaries.',
    iconName: 'Terminal'
  },
  {
    id: 'mod-03',
    number: 3,
    title: 'Module 03: Information Security Threats and Vulnerability Assessment',
    shortTitle: 'Threats & Vulnerability Assessment',
    subTopics: [
      'Threat and Threat Sources',
      'Malware and its Types (Viruses, Worms, Trojans, Ransomware, Rootkits, Spyware)',
      'Vulnerabilities (CVE, CWE, CVSS v3 Metrics)',
      'Vulnerability Assessment Lifecycle & Automated Scanners'
    ],
    description: 'Malware taxonomy, attack propagation techniques, vulnerability identification, scoring, and remediation lifecycles.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'mod-04',
    number: 4,
    title: 'Module 04: Password Cracking Techniques and Countermeasures',
    shortTitle: 'Password Cracking & Defense',
    subTopics: [
      'Password Cracking Techniques (Dictionary, Brute Force, Rainbow Tables, Hybrid, Rule-Based)',
      'Password Cracking Tools (John the Ripper, Hashcat, Ophcrack)',
      'Cryptographic Storage (Salting, Key Stretching, Argon2, bcrypt, PBKDF2)',
      'Password Cracking Countermeasures (MFA, Lockout, Entropy Policies)'
    ],
    description: 'Authentication security, hash reverse-engineering, offline vs. online cracking, salting mechanics, and robust defense policies.',
    iconName: 'KeyRound'
  },
  {
    id: 'mod-05',
    number: 5,
    title: 'Module 05: Social Engineering Techniques and Countermeasures',
    shortTitle: 'Social Engineering & Defenses',
    subTopics: [
      'Social Engineering Concepts and its Phases (Research, Hook, Play, Exit)',
      'Social Engineering Techniques (Phishing, Spear Phishing, Vishing, Smishing, Pretexting, Baiting, Quid Pro Quo)',
      'Physical Tactics (Shoulder Surfing, Dumpster Diving, Tailgating/Piggybacking)',
      'Insider Threats and Identity Theft',
      'Social Engineering Countermeasures & Awareness Programs'
    ],
    description: 'Human-factor psychological manipulation, deceptive communication vectors, physical security breaches, and defensive culture.',
    iconName: 'Users'
  },
  {
    id: 'mod-06',
    number: 6,
    title: 'Module 06: Network Level Attacks and Countermeasures',
    shortTitle: 'Network Attacks, Sniffing & DoS',
    subTopics: [
      'Sniffing: Packet Sniffing Concepts (Promiscuous Mode, Active vs. Passive)',
      'Sniffing Techniques (ARP Poisoning, MAC Flooding, DHCP Starvation, DNS Spoofing)',
      'Sniffing Countermeasures (Port Security, Dynamic ARP Inspection, DHCP Snooping)',
      'Denial-of-Service (DoS and DDoS Attacks, SYN Flood, Smurf, UDP Amplification)',
      'DoS/DDoS Countermeasures (Rate Limiting, Anycast, Scrubbing Centers)',
      'Session Hijacking Attacks (TCP Sequence Prediction, ACK Storms, IP Spoofing) & Defenses'
    ],
    description: 'Layer 2/3/4 packet inspection, protocol spoofing, switch cache overflow, distributed service starvation, and stateful TCP hijacking.',
    iconName: 'Network'
  },
  {
    id: 'mod-07',
    number: 7,
    title: 'Module 07: Web Application Attacks and Countermeasures',
    shortTitle: 'Web App & SQL Injection',
    subTopics: [
      'Web Server Attacks (Directory Traversal, Misconfigurations, Unpatched Services)',
      'Web Server Attack Countermeasures',
      'Web Application Architecture and Vulnerability Stack',
      'Web Application Threats & Attacks (OWASP Top 10, XSS - Stored/Reflected/DOM, CSRF, IDOR)',
      'Web Application Attack Countermeasures (WAF, Input Validation, Output Encoding)',
      'SQL Injection Attacks (In-Band UNION/Error, Blind Boolean/Time, Out-of-Band)',
      'SQL Injection Attack Countermeasures (Parameterized Queries, ORM, Least Privilege)'
    ],
    description: 'Exploitation of web architectures, client-side injection, server-side parameter manipulation, and structured database injection.',
    iconName: 'Globe'
  },
  {
    id: 'mod-08',
    number: 8,
    title: 'Module 08: Wireless Attacks and Countermeasures',
    shortTitle: 'Wireless & Bluetooth Attacks',
    subTopics: [
      'Wireless Terminology (SSID, BSSID, ESSID, Beacon Frames, Channels)',
      'Wireless Encryption Protocols (WEP RC4 Flaws, WPA/WPA2 4-Way Handshake, WPA3 SAE Dragonfly)',
      'Wireless Network-Specific Attack Techniques (Evil Twin, Rogue AP, Deauthentication Flood, KRACK)',
      'Bluetooth Attacks (Bluejacking, Bluesnarfing, Bluebugging)',
      'Wireless Attack Countermeasures (802.1X, WPA3-Enterprise, RF Shielding)'
    ],
    description: '802.11 frame manipulation, cryptographic handshake capture, rogue infrastructure impersonation, and short-range RF exploits.',
    iconName: 'Wifi'
  },
  {
    id: 'mod-09',
    number: 9,
    title: 'Module 09: Mobile Attacks and Countermeasures',
    shortTitle: 'Mobile & BYOD Security',
    subTopics: [
      'Mobile Attack Anatomy & Threat Surfaces',
      'Mobile Platform Attack Vectors (Android APK Decompilation/Sideloading, iOS Jailbreak)',
      'Mobile Device Management (MDM) Concepts & BYOD Architecture',
      'Mobile Attack Countermeasures (Containerization, Mobile App Management - MAM, Remote Wipe)'
    ],
    description: 'Smartphone operating system sandboxing, mobile application vulnerabilities, enterprise BYOD risks, and MDM policy enforcement.',
    iconName: 'Smartphone'
  },
  {
    id: 'mod-10',
    number: 10,
    title: 'Module 10: IoT and OT Attacks and Countermeasures',
    shortTitle: 'IoT & OT / Industrial SCADA',
    subTopics: [
      'IoT Concepts & Architectural Layers (Perception, Network, Application)',
      'IoT Threats and Attacks (Hardcoded Credentials, Insecure Firmware, Mirai Botnet)',
      'IoT Attack Countermeasures',
      'OT Concepts (SCADA, ICS, Programmable Logic Controllers - PLC, RTU, Sensors)',
      'OT Threats and Attacks (Insecure Industrial Protocols: Modbus, DNP3, Profibus; Stuxnet Case)',
      'OT Attack Countermeasures (Purdue Model, Air-Gapping, Strict Network Segmentation)'
    ],
    description: 'Vulnerabilities in connected hardware, smart devices, industrial control systems (ICS/SCADA), and critical infrastructure security.',
    iconName: 'Cpu'
  },
  {
    id: 'mod-11',
    number: 11,
    title: 'Module 11: Cloud Computing Threats and Countermeasures',
    shortTitle: 'Cloud Computing & Containers',
    subTopics: [
      'Cloud Computing Concepts & Service Models (IaaS, PaaS, SaaS)',
      'Shared Responsibility Model (Provider vs. Tenant Security Boundaries)',
      'Container Technology (Docker Daemon, Namespaces, cgroups, Kubernetes, Container Escape)',
      'Cloud Computing Threats (Public S3 Buckets, IAM Over-Privilege, API Keys in Code, SSRF)',
      'Cloud Attack Countermeasures (Cloud Security Posture Management - CSPM, CASB, Zero Trust)'
    ],
    description: 'Multi-tenant cloud infrastructure, container virtualization isolation, IAM privilege governance, and cloud defense architecture.',
    iconName: 'Cloud'
  },
  {
    id: 'mod-12',
    number: 12,
    title: 'Module 12: Penetration Testing Fundamentals',
    shortTitle: 'Penetration Testing Fundamentals',
    subTopics: [
      'Fundamentals of Penetration Testing and its Benefits',
      'Penetration Testing Types (Black-Box, White-Box, Grey-Box)',
      'Strategies and Phases of Penetration Testing (Pre-Attack, Attack, Post-Attack / Planning, Scanning, Exploitation, Reporting)',
      'Guidelines and Recommendations (Rules of Engagement - RoE, NDAs, Scoping, Authorization)',
      'Deliverables, Executive Summaries, and Remediation Validation'
    ],
    description: 'Methodical security assessment workflows, legal frameworks, engagement scoping, ethical reporting, and executive risk translation.',
    iconName: 'FileCheck'
  }
];
