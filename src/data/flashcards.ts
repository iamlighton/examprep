import { Flashcard } from '../types';

export const EHE_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-01',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    topic: 'CIA Triad & Key Pillars',
    front: 'What are the core security principles of the CIA Triad plus Non-Repudiation?',
    back: '• Confidentiality: Prevents unauthorized disclosure.\n• Integrity: Prevents unauthorized modification or tampering.\n• Availability: Ensures timely, authorized access to resources.\n• Non-Repudiation: Proves origin of a transaction so the sender cannot deny sending it (via digital signatures/PKI).',
    keyNote: 'Crucial for Module 1 foundational exam questions.'
  },
  {
    id: 'fc-02',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    topic: 'Regulations Quick Reference',
    front: 'Match each regulation: HIPAA, PCI-DSS, GDPR, SOX, FISMA',
    back: '• HIPAA: Protected Health Information (PHI) in healthcare.\n• PCI-DSS: Credit card & cardholder data environments (CDE).\n• GDPR: EU personal data protection & 72-hour breach notice.\n• SOX: Corporate accounting transparency & financial fraud.\n• FISMA: Security standards for US federal agencies.',
    keyNote: 'Questions frequently test identifying which regulation applies to a scenario.'
  },
  {
    id: 'fc-03',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    topic: 'Cyber Kill Chain 7 Stages',
    front: 'What are the 7 stages of the Lockheed Martin Cyber Kill Chain in exact order?',
    back: '1. Reconnaissance (Information gathering)\n2. Weaponization (Coupling exploit with malware payload)\n3. Delivery (Transmission to target via email, web, USB)\n4. Exploitation (Triggering malicious code execution)\n5. Installation (Installing backdoor / RAT)\n6. Command & Control - C2 (Establishing beaconing channel)\n7. Actions on Objectives (Exfiltration, encryption, disruption)',
    keyNote: 'Memorize the exact order: Recon -> Weaponize -> Deliver -> Exploit -> Install -> C2 -> Actions.'
  },
  {
    id: 'fc-04',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    topic: 'Hacker Classes',
    front: 'Differentiate White Hat, Black Hat, Grey Hat, Suicide Hacker, and Script Kiddie.',
    back: '• White Hat: Authorized, defensive, follows laws and signed RoE.\n• Black Hat: Unauthorized, malicious intent for gain or damage.\n• Grey Hat: Unauthorized entry but non-malicious (often discloses publicly).\n• Suicide Hacker: Destroys target infrastructure without caring about detection or prison.\n• Script Kiddie: Uses pre-made tools without understanding the underlying code.',
    keyNote: 'EC-Council exams frequently test the boundaries of Grey Hat vs. White Hat.'
  },
  {
    id: 'fc-05',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    topic: 'Malware Types Comparison',
    front: 'What distinguishes a Virus, Worm, Trojan, and Rootkit?',
    back: '• Virus: Attaches to a host file/executable and requires human execution.\n• Worm: Standalone, self-replicating across networks without human action.\n• Trojan: Masquerades as legitimate software while carrying a covert payload.\n• Rootkit: Operates at kernel/OS level to conceal processes and connections.',
    keyNote: 'Worms self-replicate independently; Viruses require a host file and user action.'
  },
  {
    id: 'fc-06',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    topic: 'CVSS v3 Severity Ratings',
    front: 'What are the numerical score brackets for CVSS v3 ratings?',
    back: '• None: 0.0\n• Low: 0.1 – 3.9\n• Medium: 4.0 – 6.9\n• High: 7.0 – 8.9\n• Critical: 9.0 – 10.0',
    keyNote: 'Anything >= 9.0 is Critical severity.'
  },
  {
    id: 'fc-07',
    moduleId: 'mod-04',
    moduleTitle: 'Module 04: Password Cracking Techniques and Countermeasures',
    topic: 'Password Attacks & Salting',
    front: 'Why is Cryptographic Salting used with password hashes, and what does it defeat?',
    back: 'A Salt is a unique, cryptographically random value appended to each password before hashing.\n\nIt ensures identical passwords produce distinct hashes, which completely neutralizes Rainbow Table (pre-computed hash lookup) attacks and enforces offline cracking on a per-user basis.',
    keyNote: 'Salting defeats Rainbow Tables. Key stretching (bcrypt, Argon2, PBKDF2) slows down brute-force.'
  },
  {
    id: 'fc-08',
    moduleId: 'mod-05',
    moduleTitle: 'Module 05: Social Engineering Techniques and Countermeasures',
    topic: 'Social Engineering Techniques',
    front: 'Define: Phishing, Vishing, Smishing, Pretexting, Baiting, Quid Pro Quo.',
    back: '• Phishing: Deceptive emails to steal credentials.\n• Vishing: Voice/telephone phishing.\n• Smishing: SMS/text message phishing.\n• Pretexting: Fabricating an invented scenario or fake identity.\n• Baiting: Leaving infected USB/media in public for victims to find.\n• Quid Pro Quo: Offering a fake benefit/service (e.g. IT support) in exchange for credentials.',
    keyNote: 'Baiting uses physical items (curiosity/greed); Pretexting creates a believable identity.'
  },
  {
    id: 'fc-09',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    topic: 'Layer 2 Switch Attacks & Defenses',
    front: 'Match ARP Poisoning, MAC Flooding, and DHCP Starvation with their switch countermeasures.',
    back: '• MAC Flooding (overfills CAM table) -> Countermeasure: Port Security (limit max MAC addresses).\n• ARP Poisoning (forges IP-to-MAC mappings) -> Countermeasure: Dynamic ARP Inspection (DAI).\n• DHCP Starvation / Rogue DHCP -> Countermeasure: DHCP Snooping (designates trusted server ports).',
    keyNote: 'High-yield network defense topic: DAI requires DHCP Snooping enabled first.'
  },
  {
    id: 'fc-10',
    moduleId: 'mod-07',
    moduleTitle: 'Module 07: Web Application Attacks and Countermeasures',
    topic: 'SQLi & XSS Primary Defenses',
    front: 'What is the primary defense against SQL Injection (SQLi) and Cross-Site Scripting (XSS)?',
    back: '• SQL Injection Primary Defense: Parameterized Queries (Prepared Statements) and stored procedures with strict input types.\n• Cross-Site Scripting Primary Defense: Context-aware Output Encoding / Escaping and strict Content Security Policy (CSP).',
    keyNote: 'Prepared statements separate code from data, completely neutralizing SQLi.'
  },
  {
    id: 'fc-11',
    moduleId: 'mod-08',
    moduleTitle: 'Module 08: Wireless Attacks and Countermeasures',
    topic: 'Wireless Rogue Attacks & Bluetooth',
    front: 'What is an Evil Twin attack, and what is the difference between Bluejacking vs. Bluesnarfing?',
    back: '• Evil Twin: A rogue AP set up to mimic a legitimate network (same SSID and MAC) to trick devices into connecting.\n• Bluejacking: Sending unsolicited messages or cards over Bluetooth (harassment/spam).\n• Bluesnarfing: Unauthorized theft and exfiltration of sensitive data (contacts, SMS) over Bluetooth.',
    keyNote: 'Bluejacking = Messaging; Bluesnarfing = Data theft; Bluebugging = Remote control.'
  },
  {
    id: 'fc-12',
    moduleId: 'mod-10',
    moduleTitle: 'Module 10: IoT and OT Attacks and Countermeasures',
    topic: 'OT Protocols & Purdue Model',
    front: 'Why are legacy OT protocols (Modbus, DNP3) vulnerable, and how does the Purdue Model protect them?',
    back: 'Legacy OT protocols lack built-in authentication, encryption, or integrity checks. Commands can be spoofed in plaintext.\n\nThe Purdue Model segments ICS networks into strict functional zones (Level 0 physical sensors up to Level 4/5 corporate IT), with an Industrial DMZ (IDMZ Level 3.5) preventing direct corporate access to physical PLCs/SCADA.',
    keyNote: 'Air-gapping and strict IDMZ segmentation are standard OT architectures.'
  },
  {
    id: 'fc-13',
    moduleId: 'mod-11',
    moduleTitle: 'Module 11: Cloud Computing Threats and Countermeasures',
    topic: 'Cloud Shared Responsibility (IaaS)',
    front: 'Under IaaS, who manages the Physical Data Center, Hypervisor, OS Patches, and Customer Data?',
    back: '• Cloud Provider (CSP): Physical hardware, data center facilities, power, networking, and hypervisor.\n• Customer (Tenant): Guest Operating System patching, middleware, firewalls/security groups, applications, and data.',
    keyNote: 'In IaaS, YOU patch the OS and configure the firewall. In SaaS, the CSP does.'
  },
  {
    id: 'fc-14',
    moduleId: 'mod-12',
    moduleTitle: 'Module 12: Penetration Testing Fundamentals',
    topic: 'Pen Test Types & Rules of Engagement',
    front: 'Differentiate Black-Box, White-Box, and Grey-Box testing, and explain the role of Rules of Engagement (RoE).',
    back: '• Black-Box: Zero prior knowledge (simulates external adversary).\n• White-Box: Full knowledge (source code, architecture diagrams, configs).\n• Grey-Box: Partial knowledge (standard user account, limited topology).\n• Rules of Engagement (RoE): The formal contractual scope specifying allowed targets, forbidden actions, time windows, and escalation contacts.',
    keyNote: 'RoE protects both client and tester and establishes legal boundaries.'
  }
];
