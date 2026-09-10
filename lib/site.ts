// Central content + config for the Elevate Logistic Solutions site.

export const site = {
  name: "Elevate Logistic Solutions",
  shortName: "ELS",
  url: "https://elevatelogisticsolutions.com",
  email: "info@elevatelogisticsolutions.com",
  officeCity: "Rochester, New York",
  officeCityShort: "Rochester, NY",
  region: "NY",
  copyright: "© 2025 Elevate Logistic Solutions",

  // Self-hosted brand assets (see /public/media). Faster + independent of the WP CDN.
  logo: "/media/logo.svg",
  logoWhite: "/media/logo-white.svg",
  iconOutline: "/media/elevate-icon-outline.png",
  parallaxImage: "/media/home-parallax.jpg",
  contactBg: "/media/contact-bg.jpg",
  ogImage: "/media/home-parallax.jpg",

  // Hero background video still streamed from the origin CDN (large .mov asset).
  heroVideo:
    "https://elevatelogisticsolutions.com/wp-content/uploads/2025/04/businesswoman-presenting-new-startup-project-for-p-2024-05-06-18-00-37-utc.mov",

  tagline: "Elevating Workforce Strategy.",
  taglineSub:
    "Supporting workforce operations through innovation, transparency & precision.",

  // Global on-page SEO keyword set (healthcare workforce MSP / staffing).
  keywords: [
    "healthcare workforce solutions",
    "healthcare staffing agency",
    "managed service provider healthcare",
    "vendor neutral MSP",
    "per diem staffing",
    "travel nurse staffing",
    "healthcare workforce management",
    "credentialing and compliance",
    "healthcare workforce consulting",
    "nurse staffing solutions",
    "workforce optimization healthcare",
    "clinician-led staffing",
    "crisis response staffing",
    "temp-to-hire healthcare staffing",
    "healthcare workforce analytics",
    "healthcare staffing Rochester NY",
  ],
};

export const nav = [
  { label: "Our Services", href: "/our-services" },
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const differentiators = [
  {
    title: "Clinical + Operational Insight",
    body: "We’ve lived in your world—from patient care to the C-suite.",
  },
  {
    title: "Concierge-Level Service",
    body: "Hands-on support, 24/7 responsiveness, and a true partner relationship.",
  },
  {
    title: "End-to-End Workforce Support",
    body: "From recruiting and credentialing to compliance, onboarding, and performance optimization.",
  },
  {
    title: "Data Analytics",
    body: "We look at your workforce data from a different lens—revealing opportunities, identifying trends & developing strategies that fit your organizational structure.",
  },
  {
    title: "Vendor-Neutral Approach",
    body: "Equal opportunity environment.",
  },
  {
    title: "Scalable Across All Settings",
    body: "From academic medical centers and rural hospitals to multi-site health systems and specialty clinics.",
  },
];

export const homeServices = [
  {
    title: "Workforce Placement Solutions",
    body: "We offer flexible workforce placement solutions designed to quickly fill gaps or build long-term strength—available across clinical, allied health, and non-clinical functions including nurses, physicians, schedulers, and healthcare operations staff. Whether you're covering a shift tomorrow or planning your future workforce model, we provide the talent and structure to help you stay ahead.",
    cta: "Our Workplace Solutions",
  },
  {
    title: "Workforce Management & Optimization",
    body: "We help you manage and continuously improve your workforce operations—blending strategy, automation, and on-the-ground support to create systems that scale. Together, these solutions enable your team to operate more efficiently, meet compliance standards, and make informed workforce decisions in real-time.",
    cta: "See How We Optimize",
  },
  {
    title: "Healthcare Consulting Services",
    body: "When your goals require broader transformation, we offer strategic workforce consulting to help realign systems, reduce waste, and unlock organizational value. From technology decisions and staffing models to vendor strategy and operational restructuring, our services are built around your goals and environment, not a cookie-cutter playbook—ensuring you get the right plan and the right people to execute it.",
    cta: "Learn About Our Services",
  },
];

export const stats = [
  {
    value: 30,
    suffix: "%",
    title: "Improved Operational Efficiency",
    body: "By harnessing real-time workforce data and predictive modeling, our clients have seen operational efficiency improve by 30% across key departments.",
  },
  {
    value: 70,
    suffix: "%",
    title: "Reduction in Time Spent Managing",
    body: "By centralizing staffing operations and compliance workflows, our clients have reported a 50% to 70% reduction in time spent by HR and clinical leaders on workforce administration.",
  },
  {
    value: 60,
    suffix: "+",
    title: "Combined Years of Experience",
    body: "With 60+ years of combined executive experience, our team brings clinical, operational, and data-driven expertise to solve healthcare workforce challenges—strategically, efficiently, and compassionately.",
  },
];

export const idealWorkforceBullets = [
  "Nationwide coverage with deep local knowledge",
  "Personalized support and 24/7 responsiveness",
  "Clinical, operational, and data-driven insight behind every decision",
  "Transparent, vendor-neutral guidance every step of the way",
];

export const testimonials = [
  {
    quote:
      "What sets ELS apart is how well they understand the full picture—not just staffing, but compliance, performance, and long-term workforce strategy. They’ve helped us reduce agency dependency, lower costs, and improve stability across our locations.",
    name: "Community Medical Center",
    role: "CHRO, Multi-Site Ambulatory Group",
  },
  {
    quote:
      "We’ve worked with multiple staffing partners over the years, but none have delivered the speed and professionalism of Elevate. When we had an urgent coverage need during a system outage, they had credentialed staff onsite in under 48 hours—without cutting corners.",
    name: "Regional Hospital",
    role: "VP of Clinical Operations, Regional Medical Center",
  },
];

// ---- About page ----------------------------------------------------
export const whyChooseUs = [
  {
    title: "Concierge-Level Service",
    body: "A personalized, high-touch approach tailored to each unique healthcare setting and their needs.",
  },
  {
    title: "Industry Expertise",
    body: "A leadership team with decades of hands-on healthcare experience.",
  },
  {
    title: "Comprehensive Workforce Management",
    body: "From recruitment to compliance tracking, we handle it all.",
  },
  {
    title: "Proven Results",
    body: "Success stories from hospitals nationwide.",
  },
  {
    title: "Cost Efficiency & Transparency",
    body: "Clear pricing and measurable workforce improvements.",
  },
];

export const careEnvironments = [
  "Hospitals and Health Systems",
  "Surgical and Ambulatory Centers",
  "Behavioral and Mental Health Providers",
  "Nursing Homes and Long-Term Care",
  "Rehab Facilities and Outpatient Clinics",
  "Home Health and Hospice Providers",
  "Community-Based and Nonprofit Clinics",
];

// ---- Services page -------------------------------------------------
export const serviceGroups = [
  {
    group: "Comprehensive Workforce Placement Services",
    intro:
      "We provide flexible placement models to meet your immediate needs and support long-term stability. Our nationwide network of professionals spans clinical, allied health, and non-clinical roles—including nursing, therapy, administrative, and support services.",
    items: [
      {
        title: "Per Diem Staffing",
        body: "For last-minute shift coverage, seasonal fluctuations, or flexible scheduling needs, our per diem workforce ensures you never miss a beat.",
        points: [
          "Available 24/7 to fill urgent roles",
          "Fully credentialed professionals ready to deploy",
          "Scales up or down based on census, acuity, and coverage gaps",
          "Supports clinical continuity and minimizes burnout",
        ],
      },
      {
        title: "Travel Staffing",
        body: "Tap into a nationwide talent pool to meet licensed labor needs in any region or state.",
        points: [
          "Registered nurses, specialty providers, allied health, and behavioral health professionals",
          "Fully credentialed, mobile, and ready to support short-term or long-term assignments",
          "ELS handles logistics, licensing, and compliance across state lines",
        ],
      },
      {
        title: "Temp-to-Hire & Direct Placement",
        body: "Whether you're seeking long-term staff or evaluating fit before making a hire, we handle recruitment and vetting with precision.",
        points: [
          "Access to pre-screened professionals across every role and care setting",
          "Seamless transitions into permanent positions",
          "Reduces cost of bad hires and improves retention",
          "Ensures cultural and clinical alignment",
        ],
      },
      {
        title: "Crisis & Rapid Response Staffing",
        body: "When demand spikes or emergencies arise, we’re built to respond.",
        points: [
          "Rapid deployment within 24–48 hours",
          "Surge staffing for outbreaks, transitions, or facility launches",
          "Emergency credentialing coordination and onboarding support",
          "Maintains service quality during critical periods",
        ],
      },
    ],
  },
  {
    group: "Workforce Management Solutions",
    intro:
      "Staffing is just the start. We offer full-service support to help you manage your workforce more strategically and sustainably.",
    items: [
      {
        title: "Credentialing & Compliance Oversight",
        body: "Our compliance framework ensures every worker placed through ELS meets state, federal, and facility-specific standards.",
        points: [
          "License and certification tracking",
          "Background checks, vaccination records, onboarding documentation",
          "Real-time monitoring of credential expirations",
          "Audit-ready documentation",
        ],
      },
      {
        title: "Retention & Performance Tracking",
        body: "Quality assurance doesn’t end at placement. We continuously monitor performance and satisfaction to protect your investment.",
        points: [
          "Regular check-ins and pulse surveys with placed talent",
          "Feedback loops with managers and facility leads",
          "Data-driven reporting to flag attrition risks or underperformance",
        ],
      },
      {
        title: "Onboarding & Orientation Support",
        body: "We design onboarding processes that reduce lag time and increase retention.",
        points: [
          "Customized orientation packets and workflows",
          "First-day coordination and point-of-contact alignment",
          "Staff integration support for clinical leaders and HR teams",
        ],
      },
      {
        title: "Workforce Optimization & Planning",
        body: "We bring operational insight to help improve your cost structure, coverage efficiency, and long-term workforce health.",
        points: [
          "Coverage modeling and scheduling efficiency audits",
          "Role redesign and right-sizing consultation",
          "Strategic use of temp, perm, float, and per diem workers",
          "Collaboration with stakeholders matters to us",
        ],
      },
    ],
  },
  {
    group: "Healthcare Workforce Consulting",
    intro:
      "Need a high-level partner to rethink your entire workforce strategy? We offer fractional consulting services through ELS and its extended network of advisors.",
    items: [
      {
        title: "Workforce Strategy & Forecasting",
        body: "We help you plan for growth, scale, and resilience—using data and trends to guide smarter workforce decisions.",
        points: [
          "Multi-year workforce modeling",
          "Scenario planning (volume changes, service line expansion, attrition risk)",
          "Demand-based staffing models",
        ],
      },
      {
        title: "Cost Containment & Workflow Redesign",
        body: "Reduce over-reliance on reactive staffing, overtime, and third-party agency spend.",
        points: [
          "Workforce cost audits and benchmarks",
          "Operational redesign for leaner workforce structures",
          "System recommendations for better scheduling, tracking, and forecasting",
        ],
      },
      {
        title: "Succession Planning & Leadership Pipeline Development",
        body: "Ensure your most critical roles are never left uncovered.",
        points: [
          "Identification of leadership risk areas",
          "Internal development tracks",
          "External candidate sourcing in parallel",
        ],
      },
      {
        title: "Vendor & Technology Advisory",
        body: "As a vendor-neutral MSP, we offer unbiased recommendations to help you assess, consolidate, or restructure your staffing technology stack.",
        points: [
          "ATS, credentialing, scheduling, and agency management systems",
          "Interoperability evaluations and integration roadmaps",
          "Change management and rollout support",
        ],
      },
    ],
  },
];

// Workforce Data & Analytics (services page feature section)
export const analytics = {
  intro:
    "We view workforce challenges through a different lens—one powered by data and backed by operational intelligence.",
  body: "While many providers focus on filling roles, we focus on how your workforce functions holistically. Our analytics services are built to help you reduce costs, uncover opportunities, and proactively manage workforce health.",
  deliverables: [
    {
      title: "Real-Time Reporting",
      body: "Actionable dashboards and scorecards tied to turnover, credentialing, fill rates, and performance.",
    },
    {
      title: "Utilization Analysis",
      body: "Understand over/understaffing by shift, unit, or location.",
    },
    {
      title: "Predictive Analytics",
      body: "Forecast staffing needs, attrition risks, and credential expirations before they happen.",
    },
    {
      title: "Cost Trend Tracking",
      body: "Visualize agency spend, overtime, and wage benchmarks to guide smarter planning.",
    },
    {
      title: "Workforce Mix Modeling",
      body: "Analyze the impact of adjusting full-time, part-time, float, and PRN ratios.",
    },
  ],
};

// ---- FAQ -----------------------------------------------------------
export const faqs = [
  {
    q: "How quickly can you fill a workforce request?",
    a: "Elevate Logistic Solutions provides rapid-response staffing and can often fill urgent positions within 24-48 hours, depending on availability.",
  },
  {
    q: "What types of healthcare professionals do you staff?",
    a: "Elevate Logistic Solutions places registered nurses, allied health professionals, physicians, administrative support, and other specialized healthcare workers.",
  },
  {
    q: "How do I get started with ELS for workforce solutions?",
    a: "Fill out the contact form or email us directly at info@elevatelogisticsolutions.com",
  },
  {
    q: "What makes your company different from other healthcare staffing providers?",
    a: "Elevate Logistic Solutions is clinician-run, meaning we have firsthand experience in healthcare and understand the needs of both healthcare professionals and organizations. We’re agile, data-driven, and dedicated to transparent communication, which allows us to provide tailored workforce solutions that help you meet your specific goals.",
  },
  {
    q: "How does Elevate Logistic Solutions ensure we get the right staffing solutions?",
    a: "Elevate Logistic Solutions leverages over 60 years of combined experience in executive leadership, acute care, research, data science, and more. Our data-driven approach allows us to make informed decisions that align with your organization's needs and ensure you’re getting the best talent. We listen closely to your goals and work alongside you to achieve them.",
  },
  {
    q: "What types of healthcare organizations do you work with?",
    a: "Elevate Logistic Solutions works with a wide range of healthcare organizations, from hospitals and health systems to clinics and long-term care facilities. Our flexible, agile approach allows us to adapt to the unique needs of any healthcare provider.",
  },
  {
    q: "How do you ensure transparency in the Elevate Logistic Solutions processes?",
    a: "Elevate Logistic Solutions believes in clear and open communication at every stage of the staffing process. From the initial consultation to ongoing performance evaluations, we work closely with you to keep you informed and ensure the solutions we provide align with your goals and expectations.",
  },
  {
    q: "How does Elevate Logistic Solutions ensure staff quality and reliability?",
    a: "Elevate Logistic Solutions uses a comprehensive screening process, including clinical assessments, background checks, and in-depth interviews, to ensure that every staff member we place is highly qualified and capable of meeting your standards. Our clinicians understand what it takes to provide top-tier care and are committed to delivering excellence.",
  },
  {
    q: "Why should we choose Elevate Logistic Solutions for contingent staffing?",
    a: "Elevate Logistic Solutions is the best in the business because we are clinician-run, data-driven, and passionate about helping healthcare organizations succeed. We take the time to understand your unique needs, collaborate closely with your team, and provide workforce solutions that truly make a difference in patient care and organizational efficiency.",
  },
];
