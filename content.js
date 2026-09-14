/* =========================================================================
   content.js — ALL site content lives here. Edit this file, nothing else.
   =========================================================================

   TOPICS are the connective tissue of the site. Each topic gets a
   highlighted phrase in the bio; hovering it connects it to every news
   item, publication, and project tagged with that topic id.
   ========================================================================= */

const CONTENT = {

  // ----- Identity -----
  name: "Razvan Mihai Popescu",
  kicker: "AI × Software Engineering",
  role: "PhD Researcher in AI for Software Engineering",
  affiliation: " AISE Lab · Delft University of Technology, The Netherlands",
  photo: "assets/photo.jpg",   // TODO: save your portrait as assets/photo.jpg

  /* Bio: plain text with [[topic-id|display text]] markers.
     Each marker becomes an interactive token. */
  bio: [
    `My most recent work follows [[agents|coding agents]] into the wild, studying
     how they shape real projects over time through code-quality
     signals, and how developers review, trust, and collaborate with them.`,

    `The models we build are only as good as our ability to measure what matters,
     so a large part of my work is [[evaluation|evaluation]]: reviewing how LLMs
     are currently assessed on code, building datasets free of training-data
     contamination, and designing agent evaluations that reflect how developers
     <span style="hyphens:none;-webkit-hyphens:none">actually</span> work.`,

    `Both threads trace back to where I actually started. My first line of work
     was on [[interpretability|how these models represent code]] internally,
     which grew out of my BSc thesis on [[completion|code completion]] into
     discovering attention patterns at scale. The [[data|data these models
     learn from]] followed close behind: an investigation into license
     infringements in public training sets, which led to The Heap, a
     contamination-free multilingual corpus.`,
  ],

  /* Abstract (Design 3 / manuscript only). Plain text — kept separate from
     the bio above so it can read differently from the Introduction. */
  abstract:
    "I am a PhD researcher in the AISE Lab at TU Delft, a year and a half into the work, " +
    "exploring the intersection of Large Language Models and Software Engineering. Much of it " +
    "comes down to a deceptively hard question: <em>how reliably can we evaluate these models " +
    "on coding tasks?</em> This paper surveys the author’s publications, artifacts, and recent " +
    "activity, along with education and academic programs, teaching, student supervision, experience, and service, and closes " +
    "on a lighter note, with the countries visited and a few other interests. " +
    "Related work is cited throughout. Results are promising but, as always, more research is needed.",

  // Topic ids used above must exist here.
  topics: {
    agents:          { label: "Coding agents" },
    evaluation:      { label: "Evaluation & benchmarks" },
    interpretability:{ label: "Model interpretability" },
    data:            { label: "Code data & licensing" },
    completion:      { label: "Code completion" },
  },

  // Extra keywords appended to the topic-derived keyword line (casing preserved).
  extraKeywords: ["software engineering", "AI4SE", "LLM4Code"],

  scholarLinks: [
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=NOQ6ZAkAAAAJ&hl=ro" },
    { label: "ORCID",          url: "https://orcid.org/0009-0003-6251-770X" },
    { label: "LinkedIn",       url: "https://www.linkedin.com/in/razvan-mihai-popescu-b71104211/" },
    { label: "GitHub",         url: "https://github.com/Razvain" },
    { label: "CV",             url: "assets/cv.pdf" },
    { label: "Email",          url: "mailto:r.m.popescu@tudelft.nl" },
  ],

  // ----- News (most recent first) -----
  news: [
    { date: "Apr 2027", topics: [],
      html: `Co-chairing the second edition of <em>The Poisoned Chalice</em>, a Membership Inference Attack competition, co-located with <em>ICSE ’27</em>, Dublin, Ireland.`,
      links: ["https://poisoned-chalice.org/"] },
    { date: "Jul 2026", topics: ["agents", "evaluation"],
      html: `Presented my doctoral research plan on developer-aligned agent evaluation at the <em>FSE ’26 Doctoral Symposium</em>, Montreal, Canada.`,
      links: ["https://conf.researchr.org/details/fse-2026/fse-2026-doctoral-symposium/15/Reliable-and-Developer-Aligned-Evaluation-of-Agents-for-Software-Engineering"] },
    { date: "Jun 2026", topics: [],
      html: `Attended the Machine Learning Summer School at Columbia University and Bloomberg, New York, USA.`,
      links: ["https://www.bloomberg.com/company/stories/training-the-next-generation-of-ai-ml-researchers-bloomberg-columbia-machine-learning-summer-school-nyc/", "https://www.engineering.columbia.edu/about/news/insights-machine-learning-summer-school", "https://cfe.columbia.edu/content/mlss2"] },
    { date: "May 2026", topics: ["evaluation"],
      html: `Attended the <em>Dagstuhl Seminar</em> on Evaluation of AI Models in Software Engineering.`,
      links: ["https://www.dagstuhl.de/en/seminars/seminar-calendar/seminar-details/26192"] },
    { date: "Apr 2026", topics: ["agents"],
      html: `Presented our study of autonomous-agent contributions in the wild at <em>MSR ’26</em> and also attended <em>ICSE ’26</em>, Rio de Janeiro, Brazil.`,
      links: ["https://2026.msrconf.org/details/msr-2026-technical-papers/21/Investigating-Autonomous-Agent-Contributions-in-the-Wild-Activity-Patterns-and-Code-"] },
    { date: "Mar 2026", topics: ["interpretability"],
      html: `Extended version of <em>Automated Attention Pattern Discovery at Scale</em> accepted to <em>TMLR</em>.`,
      links: ["https://openreview.net/forum?id=KpsUN0HAx7"] },
    { date: "Feb 2026", topics: [],
      html: `Attended the Machine Learning Summer School at Maincode, Melbourne, Australia.`,
      links: ["https://awesome-mlss.com/summerschool/mlssmelbourne26.html"] },
    { date: "Sep 2025", topics: ["interpretability"],
      html: `<em>Automated Attention Pattern Discovery at Scale</em> accepted at <em>NeurIPS ’25</em>.`,
      links: ["https://openreview.net/forum?id=foz36TBALK"] },
    { date: "Apr–May 2025", topics: ["data", "evaluation"],
      html: `Presented <em>The Heap</em> at <em>FORGE</em> and also attended <em>ICSE ’25</em>, Ottawa, Canada.`,
      links: ["https://conf.researchr.org/details/forge-2025/forge-2025-benchmarking/2/The-Heap-A-Contamination-Free-Multilingual-Code-Dataset-for-Evaluating-Large-Languag"] },
  ],

  /* ----- Publications (most recent first) -----
     `topics` connects each paper to the bio phrases.
     TODO: add real pdf/doi/code links as they come online. */
  publications: [
    {
      title: "Characterizing Human-Agent Dynamics in Agent-authored Pull Requests",
      authors: "Ziyou Li, Razvan Mihai Popescu, Maliheh Izadi",
      venue: "Under review", year: 2026, type: "journal",
      topics: ["agents"],
      links: {},
      tldr: "Abstract coming soon.",
      bibtex: `@article{li2026characterizing,
  title  = {Characterizing Human-Agent Dynamics in Agent-authored Pull Requests},
  author = {Li, Ziyou and Popescu, Razvan Mihai and Izadi, Maliheh},
  note   = {Under review},
  year   = {2026}
}`,
    },
    {
      title: "Beyond Merging: Refactoring and Code Quality Signals in Agent-Authored Pull Requests",
      authors: "Inaesh Joshi, Razvan Mihai Popescu, Maliheh Izadi",
      venue: "Under review", year: 2026, type: "journal",
      topics: ["agents"],
      links: {},
      tldr: "Abstract coming soon.",
      bibtex: `@article{joshi2026beyond,
  title  = {Beyond Merging: Refactoring and Code Quality Signals in Agent-Authored Pull Requests},
  author = {Joshi, Inaesh and Popescu, Razvan Mihai and Izadi, Maliheh},
  note   = {Under review},
  year   = {2026}
}`,
    },
    {
      title: "When the Docstring Lies, LLM Judges Blame the Code",
      authors: "Razvan Mihai Popescu, Maliheh Izadi",
      venue: "Under review", year: 2026, type: "journal",
      topics: ["evaluation"],
      links: {},
      tldr: "Abstract coming soon.",
      bibtex: `@article{popescu2026docstring,
  title  = {When the Docstring Lies, LLM Judges Blame the Code},
  author = {Popescu, Razvan Mihai and Izadi, Maliheh},
  note   = {Under review},
  year   = {2026}
}`,
    },
    {
      title: "Evaluating Large Language Models in Code-Related Tasks: A Systematic Literature Review",
      authors: "Razvan Mihai Popescu, Maliheh Izadi",
      venue: "Under review", year: 2026, type: "journal",
      topics: ["evaluation"],
      links: {},
      tldr: "Abstract coming soon.",
      bibtex: `@article{popescu2026evaluating,
  title  = {Evaluating Large Language Models in Code-Related Tasks: A Systematic Literature Review},
  author = {Popescu, Razvan Mihai and Izadi, Maliheh},
  note   = {Under review},
  year   = {2026}
}`,
    },
    {
      title: "Reliable and Developer-Aligned Evaluation of Agents for Software Engineering",
      authors: "Razvan Mihai Popescu",
      venue: "FSE Doctoral Symposium", year: 2026, type: "conference",
      topics: ["agents", "evaluation"],
      links: {},
      page: "https://dl.acm.org/doi/10.1145/3803437.3804877",
      tldr: `Large language models are rapidly moving towards closing the development cycle, transitioning from simple assistive companions to autonomous contributors deeply embedded into collaborative development environments. Despite their accelerated adoption, existing evaluation techniques are limited due to their fragmented nature and distorted projection of true model capabilities, often obtained from hypothetical syntactic scenarios. This research aims to bridge this gap by providing a comprehensive evaluation methodology for LLM-powered agents that is grounded in real-world software development practice. Our evaluation approach focuses on contamination-awareness, in-the-wild agentic behavior assessment, and trajectory-aware benchmarks and metrics capturing realistic coding contexts, human-aligned behavior, and model failure modes.`,
      bibtex: `@inproceedings{popescu2026reliable,
  title     = {Reliable and Developer-Aligned Evaluation of Agents for Software Engineering},
  author    = {Popescu, Razvan Mihai},
  booktitle = {Proc. of the ACM Int'l Conf. on the Foundations of Software Engineering (FSE), Doctoral Symposium},
  year      = {2026}
}`,
    },
    {
      title: "The Poisoned Chalice of LLM Evaluation Report",
      authors: "Jonathan Katzy, Ali Al-Kaswan, Razvan Mihai Popescu, Zhou Yang",
      venue: "FSE", year: 2026, type: "conference",
      topics: ["data", "evaluation"],
      links: {},
      page: "https://dl.acm.org/doi/10.1145/3803437.3807733",
      tldr: `Large language models are increasingly used to evaluate and support software engineering tasks, yet the validity of these evaluations is often undermined by uncertainty about whether benchmark instances were seen during pretraining. This can lead to data contamination, which may inflate performance and result in misleading conclusions about model capability. Despite this, the training corpora of many modern models are only partially disclosed, making direct decontamination infeasible. This creates a need for practical methods that can detect a large language model's prior exposure to training data without access to the full training corpus. To address this challenge, we organize the first Poisoned Chalice of LLM Evaluation Competition, co-located with the FSE-AIWare 2026 Competition Track. The competition frames contamination detection as a white-box membership inference task on source code and provides participants with curated datasets, target models, baseline attacks, and a final evaluation on a held-out model and dataset. This design encourages methods that generalize beyond superficial dataset artifacts and beyond a single training setting. This paper reports the setup and results of the competition. More broadly, the competition aims to catalyze the community around trustworthy LLM evaluation for software engineering.`,
      bibtex: `@inproceedings{katzy2026poisoned,
  title     = {The Poisoned Chalice of LLM Evaluation Report},
  author    = {Katzy, Jonathan and Al-Kaswan, Ali and Popescu, Razvan Mihai and Yang, Zhou},
  booktitle = {Proc. of the 34th ACM Int'l Conf. on the Foundations of Software Engineering (FSE)},
  year      = {2026}
}`,
    },
    {
      title: "Investigating Autonomous Agent Contributions in the Wild: Activity Patterns and Code Change over Time",
      authors: "Razvan Mihai Popescu, David Gros, Andrei Botocan, Rahul Pandita, Prem Devanbu, Maliheh Izadi",
      venue: "MSR", year: 2026, type: "conference",
      topics: ["agents"],
      links: {},
      page: "https://dl.acm.org/doi/10.1145/3793302.3793354",
      tldr: `The rise of large language models for code has reshaped software development. Autonomous coding agents, able to create branches, open pull requests, and perform code reviews, now actively contribute to real-world projects. Their growing role offers a unique and timely opportunity to investigate AI-driven contributions and their effects on code quality, team dynamics, and software maintainability. In this work, we construct a novel dataset of approximately 110,000 open-source pull requests, including associated commits, comments, reviews, issues, and file changes, collectively representing millions of lines of source code. We compare five popular coding agents, including OpenAI Codex, Claude Code, GitHub Copilot, Google Jules, and Devin, examining how their usage differs in various development aspects such as merge frequency, edited file types, and developer interaction signals, including comments and reviews. Furthermore, we emphasize that code authoring and review are only a small part of the larger software engineering process, as the resulting code must also be maintained and updated over time. Hence, we offer several longitudinal estimates of survival and churn rates for agent-generated versus human-authored code. Ultimately, our findings indicate an increasing agent activity in open-source projects, although their contributions are associated with more churn over time compared to human-authored code.`,
      bibtex: `@inproceedings{popescu2026investigating,
  title     = {Investigating Autonomous Agent Contributions in the Wild: Activity Patterns and Code Change over Time},
  author    = {Popescu, Razvan Mihai and Gros, David and Botocan, Andrei and Pandita, Rahul and Devanbu, Prem and Izadi, Maliheh},
  booktitle = {Proc. of the 23rd Int'l Conf. on Mining Software Repositories (MSR)},
  year      = {2026}
}`,
    },
    {
      title: "Silent Reliance or Diligent Review? Human-Agent Engagement and Interaction Patterns in GitHub",
      authors: "Ziyou Li, Razvan Mihai Popescu, Maliheh Izadi",
      venue: "ICSE JAW", year: 2026, type: "conference",
      topics: ["agents"],
      links: {},
      page: "https://conf.researchr.org/details/icse-2026/jaws-2026-papers/17/Silent-Reliance-or-Diligent-Review-Human-Agent-Engagement-and-Interaction-Patterns-i",
      tldr: `The software engineering landscape is undergoing a fundamental shift as AI coding agents transition from passive assistants to active contributors. While agents now autonomously initiate thousands of pull requests, the sociotechnical dynamics of how humans verify, trust, and integrate agentic contributions remain a "black box". This paper presents the first large-scale empirical investigation into the human-agent collaborative efforts. By mining a dataset of 212,297 PRs authored by 12 distinct AI agents on GitHub, we characterize the emerging interactions around AI-generated code. We analyze 30,729 longitudinal interaction timelines to map how developers, stratified by seniority, engage with "AI-first" codebases. Our findings reveal a landscape of rapid but passive integration: while human triage is often near-instantaneous (median 0.2 hours), a striking 73.9% of agent PRs are merged without modification, suggesting a high degree of "silent reliance". Beyond metrics, we explore the sentiment in human-agent discourse, uncovering how developer experience shapes the rigor of AI oversight. By summarizing comment sentiment across developer seniority strata, we find that "expert" developers have a more neutral sentiment towards agent PRs, while others have a more positive take. Lastly, we conclude by outlining future research directions for how to build on this work.`,
      bibtex: `@inproceedings{li2026silent,
  title     = {Silent Reliance or Diligent Review? Human-Agent Engagement and Interaction Patterns in GitHub},
  author    = {Li, Ziyou and Popescu, Razvan Mihai and Izadi, Maliheh},
  booktitle = {Proc. of the IEEE/ACM Int'l Conf. on Software Engineering Workshops (ICSE JAW)},
  year      = {2026}
}`,
    },
    {
      title: "Automated Attention Pattern Discovery at Scale in Large Language Models (Extended)",
      authors: "Jonathan Katzy, Razvan Mihai Popescu, Erik Mekkes, Arie van Deursen, Maliheh Izadi",
      venue: "TMLR", year: 2026, type: "journal",
      topics: ["interpretability"],
      links: {},
      page: "https://openreview.net/forum?id=KpsUN0HAx7",
      tldr: `Large language models have found success by scaling up capabilities to work in general settings. The same can unfortunately not be said for interpretability methods. The current trend in mechanistic interpretability is to provide precise explanations of specific behaviors in controlled settings. These often do not generalize, or are too resource intensive for larger studies. In this work we propose to study repeated behaviors in large language models by mining completion scenarios in Java code datasets, through exploiting the structured nature of code. We collect the attention patterns generated in the attention heads to demonstrate that they are scalable signals for global interpretability of model components. We show that vision models offer a promising direction for analyzing attention patterns at scale. To demonstrate this, we introduce the Attention Pattern - Masked Autoencoder (AP-MAE), a vision transformer-based model that efficiently reconstructs masked attention patterns. Experiments on StarCoder2 show that AP-MAE (i) reconstructs masked attention patterns with high accuracy, (ii) generalizes across unseen models with minimal degradation, (iii) reveals recurring patterns across inferences, (iv) predicts whether a generation will be correct without access to ground truth, with accuracies ranging from 55% to 70% depending on the task, and (v) enables targeted interventions that increase accuracy by 13.6% when applied selectively, but cause collapse when applied excessively. These results establish attention patterns as a scalable signal for interpretability and demonstrate that AP-MAE provides a transferable foundation for both analysis and intervention in large language models. Beyond its standalone value, AP-MAE also serves as a selection procedure to guide fine-grained mechanistic approaches. We release code and models to support future work in large-scale interpretability.`,
      bibtex: `@article{katzy2026automated,
  title   = {Automated Attention Pattern Discovery at Scale in Large Language Models},
  author  = {Katzy, Jonathan and Popescu, Razvan Mihai and Mekkes, Erik and van Deursen, Arie and Izadi, Maliheh},
  journal = {Transactions on Machine Learning Research (TMLR)},
  year    = {2026}
}`,
    },
    {
      title: "Automated Attention Pattern Discovery at Scale",
      authors: "Jonathan Katzy, Razvan Mihai Popescu, Erik Mekkes, Arie van Deursen, Maliheh Izadi",
      venue: "NeurIPS", year: 2025, type: "conference",
      topics: ["interpretability"],
      links: {},
      page: "https://openreview.net/forum?id=foz36TBALK",
      tldr: `Language models have scaled rapidly, yet methods for explaining their outputs are lagging behind. Most modern methods focus on a fine-grained explanation of individual components of language models. This is resource-intensive and does not scale well to describe the behavior of language models as a whole. To enable high-level explanations of model behavior, in this study, we analyze and track attention patterns across multiple predictions. We introduce Attention Pattern Masked AutoEncoder (AP-MAE), a vision-transformer–based approach that encodes and reconstructs large language model attention patterns at scale. By treating attention patterns as images, AP-MAE enables efficient mining of consistent structures across a large number of predictions. Our experiments on StarCoder2 models (3B–15B) show that AP-MAE (i) reconstructs masked attention with high fidelity, (ii) generalizes across unseen model sizes with minimal degradation, and (iii) predicts whether a token will be correct, without access to ground truth, with up to 70% accuracy. We further discover recurring attention patterns demonstrating that attention patterns are structured rather than random noise. These results suggest that attention maps can serve as a scalable signal for interpretability, and that AP-MAE provides a transferable foundation for analyzing diverse large language models. We release code and models to support future work in large-scale interpretability.`,
      bibtex: `@inproceedings{katzy2025automated,
  title     = {Automated Attention Pattern Discovery at Scale},
  author    = {Katzy, Jonathan and Popescu, Razvan Mihai and Mekkes, Erik and van Deursen, Arie and Izadi, Maliheh},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  year      = {2025}
}`,
    },
    {
      title: "The Heap: A Contamination-Free Multilingual Code Dataset for Evaluating Large Language Models",
      authors: "Jonathan Katzy, Razvan Mihai Popescu, Arie van Deursen, Maliheh Izadi",
      venue: "FORGE", year: 2025, type: "conference",
      topics: ["data", "evaluation"],
      links: {},
      page: "https://dl.acm.org/doi/abs/10.1109/Forge66646.2025.00025",
      tldr: `The recent rise in the popularity of large language models has spurred the development of extensive code datasets needed to train them. This has left limited code available for collection and use in the downstream investigation of specific behaviors, or evaluation of large language models without suffering from data contamination. To address this problem, we release The Heap, a large multilingual dataset covering 57 programming languages that has been deduplicated with respect to other open datasets of code, enabling researchers to conduct fair evaluations of large language models without significant data cleaning overhead.`,
      bibtex: `@inproceedings{katzy2025heap,
  title     = {The Heap: A Contamination-Free Multilingual Code Dataset for Evaluating Large Language Models},
  author    = {Katzy, Jonathan and Popescu, Razvan Mihai and van Deursen, Arie and Izadi, Maliheh},
  booktitle = {Proc. of the 2nd ACM Int'l Conf. on AI Foundation Models and Software Engineering (FORGE)},
  year      = {2025}
}`,
    },
    {
      title: "An Exploratory Investigation into Code License Infringements in LLM Training Datasets",
      authors: "Jonathan Katzy, Razvan Mihai Popescu, Arie van Deursen, Maliheh Izadi",
      venue: "FORGE", year: 2024, type: "conference",
      topics: ["data"],
      links: {},
      page: "https://dl.acm.org/doi/10.1145/3650105.3652298",
      tldr: `Does the training of large language models potentially infringe upon code licenses? Furthermore, are there any datasets available that can be safely used for training these models without violating such licenses? In our study, we assess the current trends in the field and the importance of incorporating code into the training of large language models. Additionally, we examine publicly available datasets to see whether these models can be trained on them without the risk of legal issues in the future. To accomplish this, we compiled a list of 53 large language models trained on file-level code. We then extracted their datasets and analyzed how much they overlap with a dataset we created, consisting exclusively of strong copyleft code. Our analysis revealed that every dataset we examined contained license inconsistencies, despite being selected based on their associated repository licenses. We analyzed a total of 514 million code files, discovering 38 million exact duplicates present in our strong copyleft dataset. Additionally, we examined 171 million file-leading comments, identifying 16 million with strong copyleft licenses and another 11 million comments that discouraged copying without explicitly mentioning a license. Based on the findings of our study, which highlights the pervasive issue of license inconsistencies in large language models trained on code, our recommendation for both researchers and the community is to prioritize the development and adoption of best practices for dataset creation and management.`,
      bibtex: `@inproceedings{katzy2024exploratory,
  title     = {An Exploratory Investigation into Code License Infringements in LLM Training Datasets},
  author    = {Katzy, Jonathan and Popescu, Razvan Mihai and van Deursen, Arie and Izadi, Maliheh},
  booktitle = {Proc. of the 1st ACM Int'l Conf. on AI Foundation Models and Software Engineering (FORGE)},
  year      = {2024}
}`,
    },
    {
      title: "Language Models for Code Completion: A Practical Evaluation",
      authors: "Maliheh Izadi, Jonathan Katzy, Tim van Dam, Marc Otten, Razvan Mihai Popescu, Arie van Deursen",
      venue: "ICSE", year: 2024, type: "conference",
      topics: ["completion", "evaluation"],
      links: {},
      page: "https://dl.acm.org/doi/10.1145/3597503.3639138",
      tldr: `Transformer-based language models for automatic code completion have shown great promise so far, yet the evaluation of these models rarely uses real data. This study provides both quantitative and qualitative assessments of three public code language models when completing real-world code. We first developed an open-source IDE extension, Code4Me, for the online evaluation of the models. We collected real auto-completion usage data for over a year from more than 1200 users, resulting in over 600K valid completions. These models were then evaluated using six standard metrics across twelve programming languages. Next, we conducted a qualitative study of 1690 real-world completion requests to identify the reasons behind the poor model performance. A comparative analysis of the models' performance in online and offline settings was also performed, using benchmark synthetic datasets and two masking strategies. Our findings suggest that while developers utilize code completion across various languages, the best results are achieved for mainstream languages such as Python and Java. InCoder outperformed the other models across all programming languages, highlighting the significance of training data and objectives. Our study also revealed that offline evaluations do not accurately reflect real-world scenarios. Upon qualitative analysis of the model's predictions, we found that 66.3% of failures were due to the models' limitations, 24.4% occurred due to inappropriate model usage in a development context, and 9.3% were valid requests that developers overwrote. Given these findings, we propose several strategies to overcome the current limitations. These include refining training objectives, improving resilience to typographical errors, adopting hybrid approaches, and enhancing implementations and usability.`,
      bibtex: `@inproceedings{izadi2024language,
  title     = {Language Models for Code Completion: A Practical Evaluation},
  author    = {Izadi, Maliheh and Katzy, Jonathan and van Dam, Tim and Otten, Marc and Popescu, Razvan Mihai and van Deursen, Arie},
  booktitle = {Proc. of the 46th IEEE/ACM Int'l Conf. on Software Engineering (ICSE)},
  year      = {2024}
}`,
    },
    {
      title: "A Study on the Impact of Common Code Structures on CodeParrot’s Autocompletion Performance",
      authors: "Razvan Mihai Popescu",
      venue: "BSc thesis, TU Delft", year: 2023, type: "journal",
      topics: ["completion", "interpretability"],
      links: {},
      page: "https://repository.tudelft.nl/record/uuid:7373bcbe-1722-4bf2-a4b3-3c8bfbf3065c",
      tldr: `In recent years, deep learning techniques, particularly transformer models, have demonstrated remarkable advancements in the accuracy and efficiency of language models. These models provide the foundation for many natural language processing tasks, including code completion. The effectiveness of code completion models has been the subject of a variety of empirical studies. However, none of the existing literature has explicitly investigated the potential impact of common code structures on the performance of large language models during code completion. This paper evaluates the influence of common code structures on the code completion performance of CodeParrot, a state-of-the-art natural language processing model. Using the tuned lens method, we show that typical code structures lead to a higher completion accuracy compared to uncommon code structures, due to their frequent occurrence, consistent syntax, clear semantics, and contextual clues. Finally, we perform an attention investigation to assess the significance of the common code structures and reveal potential data patterns across low- and high-resource languages.`,
      bibtex: `@thesis{popescu2023study,
  title  = {A Study on the Impact of Common Code Structures on CodeParrot's Autocompletion Performance},
  author = {Popescu, Razvan Mihai},
  school = {Delft University of Technology},
  year   = {2023}
}`,
    },
  ],

  // ----- Projects / artifacts -----
  projects: [
    {
      name: "MOSAIC-3M",
      topics: ["agents", "data"],
      description: "The large-scale dataset of agent-authored pull requests behind the in-the-wild study, collecting the commits, reviews, issues, and file changes of five coding agents mined from open source.",
      url: "https://huggingface.co/datasets/AISE-TUDelft/MOSAIC-agentic-3m", tech: "Dataset · GitHub mining",
    },
    {
      name: "The Heap",
      topics: ["data", "evaluation"],
      description: "A contamination-free, multilingual copyleft code corpus, deduplicated against all publicly available training datasets, so language models can be evaluated on code they were not trained on.",
      url: "https://huggingface.co/datasets/AISE-TUDelft/the-heap", tech: "Dataset · Dedup pipeline",
    },
    {
      name: "Code4Me",
      topics: ["completion", "evaluation"],
      description: "Open-source IDE extension for assessing LLM code completion with real developers, in real editors, on real code.",
      url: "https://github.com/AISE-TUDelft/Code4MeEvaluation", tech: "IDE extension · LLMs",
    },
    {
      name: "AP-MAE",
      topics: ["interpretability"],
      description: "A vision-transformer masked auto-encoder that identifies and reconstructs attention patterns in large language models at scale.",
      url: "https://github.com/AISE-TUDelft/AP-MAE", tech: "PyTorch · ViT",
    },
  ],

  /* ----- Page 2 appendices (from the CV) ----- */
  education: [
    { label: "Degrees", items: [
      { period: "2025–", degree: "PhD in AI for Software Engineering", institution: "Delft University of Technology", location: "Delft, The Netherlands" },
      { period: "2023–2024", degree: "MSc in Computer Science, Artificial Intelligence", institution: "Delft University of Technology", location: "Delft, The Netherlands" },
      { period: "2020–2023", degree: "BSc in Computer Science and Engineering", institution: "Delft University of Technology", location: "Delft, The Netherlands" },
    ] },
    { label: "Selected Programs", items: [
      { period: "2026", degree: "Dagstuhl Seminar on Evaluation of AI Models in Software Engineering", institution: "Schloss Dagstuhl", location: "Wadern, Germany",
        links: ["https://www.dagstuhl.de/en/seminars/seminar-calendar/seminar-details/26192"] },
      { period: "2026", degree: "Machine Learning Summer School (MLSS)", institution: "Columbia University & Bloomberg", location: "New York, USA",
        links: ["https://www.bloomberg.com/company/stories/training-the-next-generation-of-ai-ml-researchers-bloomberg-columbia-machine-learning-summer-school-nyc/", "https://www.engineering.columbia.edu/about/news/insights-machine-learning-summer-school", "https://cfe.columbia.edu/content/mlss2"] },
      { period: "2026", degree: "Machine Learning Summer School (MLSS)", institution: "Maincode", location: "Melbourne, Australia",
        links: ["https://awesome-mlss.com/summerschool/mlssmelbourne26.html"] },
    ] },
  ],

  teaching: [
    { period: "2025", position: "Teaching Assistant", course: "Responsible Data Science & AI Engineering",
      what: "Guided in-class discussions on the ethical and social side of responsible AI for a 400-student course, and graded reports, final projects, and project presentations." },
    { period: "2024 & 2025", position: "Teaching Assistant", course: "AI-enabled Software Engineering",
      what: "Defined research proposals on LLM-driven software engineering, mentored 4 student teams through implementation and academic writing, and graded their submissions and final presentations." },
    { period: "2024–2025", position: "Teaching Assistant", course: "Probabilistic Models and Inference",
      what: "Responsible for grading the exams." },
    { period: "2024–2025", position: "Master Mentor", course: "Computer Science",
      what: "Guided 15 first-year MSc students through the Master Your Start event, covering theme selection, study planning, research groups, and course setup, and organised social events to build community." },
    { period: "2023 & 2024", position: "Head Teaching Assistant", course: "Software Architecture",
      what: "Led the TA team for a 260-student course, mentored 10 teams weekly on building architectures for socially relevant systems, graded essays and proofs of concept, and managed software logistics for all 65 teams." },
  ],

  supervision: [
    { label: "2 × MSc Thesis", items: [
      { period: "2025–", who: "Nawmi Nujhat",
        topic: "Agentic issue resolution within dynamic software environments." },
      { period: "2025–2026", who: "Inaesh Joshi",
        topic: `Refactoring and maintainability impact of coding agents on open-source repositories, with Meta. This work culminated in a paper&nbsp;<sup class="cite-group">[<a class="cite" href="index.html#ref-1">2</a>]</sup>.` },
    ] },
    { label: "4 × BSc Thesis", items: [
      { period: "2025", who: "",
        topic: "The impact of data smells on LLM code generation: boilerplate code, non-English code, self-admitted technical debt, and the educational value of code." },
    ] },
  ],

  experience: [
    { period: "2023–2025", position: "Research Assistant", place: "AISE Lab, TU Delft", location: "Delft, The Netherlands",
      what: "Created The Heap and worked on Code4Me and AP-MAE, digging into how these models pay attention to code structure and how much of their training data sits under restrictive licenses." },
    { period: "2021–2023", position: "Full-Stack Developer", place: "Lunar Zebro", location: "Delft, The Netherlands",
      what: "Built the ground-segment apps the team used to drive its lunar and terrestrial rovers, with live data and video streaming and a message broker coordinating four rovers at once, in collaboration with the University of Edinburgh." },
    { period: "2022", position: "Software Engineer", place: "Feedback-Analytics", location: "The Hague, The Netherlands",
      what: "Put together a form-logic word processor that sped up report writing, connected it to the company's survey platform, and added an automated PDF generator for delivery." },
  ],

  misc: [
    { date: "2026 & 2027", html: `Co-chair, <em>The Poisoned Chalice</em>, a Membership Inference Attack competition — 1st edition co-located with <em>FSE ’26</em>, Montreal, Canada, and 2nd edition with <em>ICSE ’27</em>, Dublin, Ireland.`,
      links: ["https://poisoned-chalice.org/"] },
    { date: "2025", html: `Web chair, <em>AgenticSE Workshop</em>, co-located with <em>ASE ’25</em>, Seoul, South Korea.`,
      links: ["https://agenticse.github.io/"] },
    { date: "2025", html: `<em>SEN Symposium</em> and <em>AIWare BootCamp</em>, Amsterdam, The Netherlands.`,
      links: ["https://www.sen-symposium.nl/", "https://www.aiwarebootcamp.io/aiware-bootcamp-europe-2025"] },
    { date: "2024–", html: `Reviewer for <em>ICSE</em>, <em>FSE</em>, <em>ASE</em>, <em>ISSTA</em>, and <em>TOSEM</em>.` },
    { date: "2022", html: `Represented Lunar Zebro and TU Delft at the <em>International Astronautical Congress (IAC ’22)</em>, Paris, France — the only student rover team at the congress.`,
      links: ["https://www.tudelft.nl/en/stories/articles/lunar-zebro-students-take-aim-at-the-moon"] },
  ],

  /* ----- Page 3: travels (interactive map) -----
     `id` = ISO 3166-1 alpha-2 country code, lowercase.
     `photos` = image paths (put files in assets/ and list them here). */
  travels: [
    { id: "ro", when: "origin",
      note: "Where the story starts. A pink evening sky over the old town.",
      photos: ["assets/romania/romania2.jpeg", "assets/romania/romania1.jpeg"] },
    { id: "nl", when: "2020–",
      note: "Home base: Delft, through BSc, MSc, and now the PhD at TU Delft. In Amsterdam, the SEN Symposium ’25 and a Meta office visit for the TU Delft–Meta collaboration, plus nights out there and in Rotterdam.",
      photos: ["assets/netherlands/nl-sen.jpg", "assets/netherlands/nl-meta.webp", "assets/netherlands/delft3.jpeg", "assets/netherlands/delft5.jpeg", "assets/netherlands/delft6.jpeg", "assets/netherlands/delft4.jpeg", "assets/netherlands/delft.jpeg", "assets/netherlands/delft1.jpeg", "assets/netherlands/delft2.jpeg", "assets/netherlands/netherlands1.jpeg", "assets/netherlands/ams.jpeg", "assets/netherlands/rotterdam.jpeg"] },
    { id: "br", when: "2026",
      note: "MSR ’26 and ICSE ’26 in Rio de Janeiro, presenting agent activity in the wild, plus an Amazon getaway.",
      photos: ["assets/brazil/brazil1.jpeg", "assets/brazil/brazil11.jpeg", "assets/brazil/brazil6.jpeg", "assets/brazil/brazil3.jpeg", "assets/brazil/brazil5.jpeg", "assets/brazil/brazil7.jpeg", "assets/brazil/brazil9.jpeg", "assets/brazil/brazil10.jpeg"] },
    { id: "ca", when: "2025 & 2026",
      note: "The FSE ’26 Doctoral Symposium in Montreal and FORGE at ICSE ’25 in Ottawa, with Toronto and Niagara Falls in between.",
      photos: ["assets/canada/canada1.jpeg", "assets/canada/canada7.jpeg", "assets/canada/canada8.jpeg", "assets/canada/canada5.jpeg", "assets/canada/canada4.jpeg", "assets/canada/canada6.jpeg", "assets/canada/canada2.jpeg", "assets/canada/canada12.jpeg", "assets/canada/canada11.jpeg", "assets/canada/canada9.jpeg", "assets/canada/canada10.jpeg"] },
    { id: "de", when: "2026",
      note: "Dagstuhl Seminar on evaluating AI models for software engineering, Cologne Cathedral, and a few days in Berlin.",
      photos: ["assets/germany/dagsthul.jpg", "assets/germany/germany1.jpeg", "assets/germany/berlin1.jpeg", "assets/germany/berlin2.jpeg", "assets/germany/berlin3.jpeg", "assets/germany/berlin4.jpg", "assets/germany/berlin6.jpg"] },
    { id: "us", when: "2026",
      note: "Machine Learning Summer School at Columbia University, New York.",
      photos: ["assets/us/us8.jpeg", "assets/us/us15.jpeg", "assets/us/us23.jpeg", "assets/us/us6.jpeg", "assets/us/us9.jpeg", "assets/us/us1.jpeg", "assets/us/us2.jpeg", "assets/us/us3.jpeg", "assets/us/us4.jpeg", "assets/us/us11.jpeg", "assets/us/us12.jpeg", "assets/us/us13.jpeg", "assets/us/us14.jpeg", "assets/us/us18.jpeg", "assets/us/us20.jpeg", "assets/us/us21.jpeg", "assets/us/us22.jpeg"] },
    { id: "au", when: "2026",
      note: "Machine Learning Summer School in Melbourne, then the Great Ocean Road, the Australian Open Women’s Final, Sydney, Brisbane, the Gold Coast, and Tasmania.",
      photos: ["assets/australia_tasmania/australia_tasmania40.jpeg", "assets/australia_tasmania/australia_tasmania35.jpeg", "assets/australia_tasmania/australia_tasmania34.jpeg", "assets/australia_tasmania/australia_tasmania43.jpeg", "assets/australia_tasmania/australia_tasmania39.jpeg", "assets/australia_tasmania/australia_tasmania38.jpeg", "assets/australia_tasmania/australia_tasmania9.jpeg", "assets/australia_tasmania/australia_tasmania8.jpeg", "assets/australia_tasmania/australia_tasmania4.jpeg", "assets/australia_tasmania/australia_tasmania3.jpeg", "assets/australia_tasmania/australia_tasmania2.jpeg", "assets/australia_tasmania/australia_tasmania1.jpeg", "assets/australia_tasmania/australia_tasmania10.jpeg", "assets/australia_tasmania/australia_tasmania7.jpeg", "assets/australia_tasmania/aus55.jpeg", "assets/australia_tasmania/aus59.jpeg", "assets/australia_tasmania/aus58.jpeg", "assets/australia_tasmania/aus60.jpeg", "assets/australia_tasmania/australia_tasmania19.jpeg", "assets/australia_tasmania/australia_tasmania18.jpeg", "assets/australia_tasmania/australia_tasmania27.jpeg", "assets/australia_tasmania/australia_tasmania24.jpeg", "assets/australia_tasmania/australia_tasmania13.jpeg"] },
    { id: "fr", when: "2022",
      note: "The International Astronautical Congress with Lunar Zebro, and later Paris itself: the Eiffel Tower, Versailles, and Montmartre.",
      photos: ["assets/france/lunarz.jpg", "assets/france/france7.jpg", "assets/france/france1.jpeg", "assets/france/france5.jpeg", "assets/france/france2.jpeg", "assets/france/france3.jpeg", "assets/france/france4.jpeg", "assets/france/france6.jpeg"] },

    /* More visited countries. TODO: add a `when` and `note` (and photos)
       to any of these when you want them to tell a story on hover/click.
       Note: Scotland has no separate map entity — it is part of the
       United Kingdom (gb) below. */
    { id: "ge", when: "",
      note: "Tbilisi from above: the old town, the winding river, and the hills beyond.",
      photos: ["assets/georgia/georgia12.jpeg", "assets/georgia/georgia15.jpeg", "assets/georgia/georgia19.jpeg", "assets/georgia/georgia28.jpeg", "assets/georgia/georgia31.jpeg", "assets/georgia/georgia34.jpeg", "assets/georgia/georgia38.jpeg"] },   // Georgia
    { id: "qa", when: "",
      note: "Doha: the National Museum, the Museum of Islamic Art, and Katara.",
      photos: ["assets/qatar/qatar2.jpeg", "assets/qatar/qatar3.jpeg", "assets/qatar/qatar1.jpeg", "assets/qatar/qatar4.jpeg"] },   // Qatar
    { id: "sg", when: "",
      note: "Marina Bay: the Supertrees at Gardens by the Bay, the skyline, and Marina Bay Sands.",
      photos: ["assets/singapore/singapore1.jpeg", "assets/singapore/singapore3.jpeg", "assets/singapore/singapore2.jpeg", "assets/singapore/singapore4.jpeg", "assets/singapore/singapore5.jpeg"] },   // Singapore
    { id: "tr", when: "",
      note: "Istanbul on the Bosphorus, waterside mosques and old wooden houses at golden hour.",
      photos: ["assets/turkey/turkey8.jpeg", "assets/turkey/turkey1.jpeg", "assets/turkey/turkey2.jpeg", "assets/turkey/turkey3.jpeg", "assets/turkey/turkey4.jpeg", "assets/turkey/turkey6.jpeg", "assets/turkey/turkey7.jpeg", "assets/turkey/turkey11.jpeg", "assets/turkey/turkey13.jpeg", "assets/turkey/turkey14.jpeg"] },   // Turkey
    { id: "al", when: "",
      note: "Gjirokastër's stone old town and castle, and the Ionian coast near Saranda.",
      photos: ["assets/albania/albania1.jpeg", "assets/albania/albania4.jpeg", "assets/albania/albania2.jpeg", "assets/albania/albania3.jpeg", "assets/albania/albania5.jpeg", "assets/albania/albania6.jpeg"] },   // Albania
    { id: "at", when: "",
      note: "Hallstatt on its lake, Salzburg's old town, Zell am See, and the Grossglockner High Alpine Road.",
      photos: ["assets/austria/austria6.jpeg", "assets/austria/austria9.jpg", "assets/austria/austria1.jpeg", "assets/austria/austria4.jpeg", "assets/austria/austria10.jpeg", "assets/austria/austria8.jpeg", "assets/austria/austria5.jpeg", "assets/austria/austria2.jpeg", "assets/austria/austria3.jpeg"] },   // Austria
    { id: "be", when: "",
      note: "Dinant, on the Meuse, below its cliffside citadel.",
      photos: ["assets/belgium/belgium1.jpeg", "assets/belgium/belgium2.jpeg"] },   // Belgium
    { id: "ba", when: "",
      note: "Mostar and its Old Bridge over the Neretva.",
      photos: ["assets/bosnia/bosnia2.jpeg", "assets/bosnia/bosnia1.jpeg", "assets/bosnia/bosnia3.jpeg"] },   // Bosnia and Herzegovina
    { id: "bg", when: "visited",
      note: "Visited, though from before the camera roll; no photographs survived.",
      photos: [] },   // Bulgaria
    { id: "hr", when: "",
      note: "The Adriatic coast off Dalmatia, and the waterfalls and turquoise lakes of Plitvice.",
      photos: ["assets/croatia/croatia55.jpeg", "assets/croatia/croatia59.jpeg", "assets/croatia/croatia61.jpeg", "assets/croatia/croatia62.jpeg", "assets/croatia/croatia70.jpeg", "assets/croatia/croatia73.jpeg", "assets/croatia/croatia75.jpeg", "assets/croatia/croatia76.jpeg", "assets/croatia/croatia78.jpeg", "assets/croatia/croatia79.jpeg", "assets/croatia/croatia80.jpeg"] },   // Croatia
    { id: "gr", when: "",
      note: "Symi's pastel harbour in the Dodecanese, and sunsets over the sea toward Mount Athos.",
      photos: ["assets/greece/greece1.jpeg", "assets/greece/greece2.jpeg", "assets/greece/greece3.jpeg"] },   // Greece
    { id: "hu", when: "",
      note: "Budapest on the Danube: the Chain Bridge at blue hour and the Parliament lit at night.",
      photos: ["assets/hungary/budapesta.png", "assets/hungary/hungary2.jpeg"] },   // Hungary
    { id: "is", when: "",
      note: "Iceland end to end: the Jökulsárlón glacier lagoon, black-sand coasts, waterfalls, and empty highland roads.",
      photos: ["assets/iceland/iceland1.jpeg", "assets/iceland/iceland2.jpeg", "assets/iceland/iceland4.jpeg", "assets/iceland/iceland6.jpeg", "assets/iceland/iceland10.jpeg", "assets/iceland/iceland11.jpeg", "assets/iceland/iceland12.jpeg", "assets/iceland/iceland13.jpeg", "assets/iceland/iceland14.jpeg", "assets/iceland/iceland15.jpeg", "assets/iceland/iceland16.jpeg", "assets/iceland/iceland17.jpeg"] },   // Iceland
    { id: "it", when: "",
      note: "The Dolomites: pale limestone walls rising straight out of the pine line.",
      photos: ["assets/italy/italy58.jpeg", "assets/italy/italy55.jpeg", "assets/italy/italy56.jpeg", "assets/italy/italy57.jpeg", "assets/italy/italy59.jpeg", "assets/italy/italy60.jpeg", "assets/italy/italy61.jpeg", "assets/italy/italy62.jpeg", "assets/italy/italy63.jpeg", "assets/italy/italy65.jpeg"] },   // Italy
    { id: "md", when: "",
      note: "Cricova's endless underground wine cellars, and a glass or two along the way.",
      photos: ["assets/moldova/moldova59.jpeg", "assets/moldova/moldova55.jpeg", "assets/moldova/moldova56.jpeg", "assets/moldova/moldova60.jpeg", "assets/moldova/moldova61.jpeg"] },   // Moldova
    { id: "pt", when: "",
      note: "Madeira: Pico do Arieiro above the clouds, the Fanal laurel forest, and the north coast; and the Algarve coast at Albufeira.",
      photos: ["assets/portugal_madeira/madeira7.jpeg", "assets/portugal_madeira/madeira6.jpeg", "assets/portugal_madeira/madeira2.jpeg", "assets/portugal_madeira/madeira1.jpeg", "assets/portugal_madeira/madeira3.jpeg", "assets/portugal_madeira/madeira4.jpeg", "assets/portugal_madeira/algarve-falesia.jpg", "assets/portugal_madeira/algarve-albufeira3.jpg"] },   // Portugal
    { id: "rs", when: "visited",
      note: "Visited; no photographs made it back.",
      photos: [] },   // Serbia
    { id: "si", when: "",
      note: "Lake Bled: the island church and its Alpine backdrop.",
      photos: ["assets/slovenia/slovenia1.jpeg"] },   // Slovenia
    { id: "es", when: "",
      note: "Madrid: sunset down the central streets, jamón hanging by the legful, and the Bernabéu.",
      photos: ["assets/spain/spain1.jpeg", "assets/spain/spain2.jpeg", "assets/spain/spain3.jpeg", "assets/spain/spain4.jpeg"] },   // Spain
    { id: "gb", when: "",
      note: "Edinburgh's castle, Old Town, and Victoria Street, and the University of Glasgow.",
      photos: ["assets/scotland/scotland1.jpeg", "assets/scotland/scotland3.jpeg", "assets/scotland/scotland5.jpeg", "assets/scotland/scotland4.jpeg", "assets/scotland/scotland2.jpeg", "assets/scotland/scotland6.jpeg"] },   // United Kingdom (incl. Scotland)
    { id: "fj", when: "",
      note: "Island-hopping across the Mamanuca and Yasawa islands.",
      photos: ["assets/fiji/fiji6.jpeg", "assets/fiji/fiji1.jpeg", "assets/fiji/fiji2.jpeg", "assets/fiji/fiji4.jpeg", "assets/fiji/fiji7.jpeg", "assets/fiji/fiji3.jpeg", "assets/fiji/fiji5.jpeg"] },   // Fiji
    { id: "pe", when: "",
      note: "A holiday across the Andes: Machu Picchu, Rainbow Mountain, the Ausangate and Salkantay treks, Cusco, and Lima.",
      photos: ["assets/peru/peru30.jpeg", "assets/peru/peru16.jpeg", "assets/peru/peru23.jpeg", "assets/peru/peru22.jpeg", "assets/peru/peru6.jpeg", "assets/peru/peru15.jpeg", "assets/peru/peru9.jpeg", "assets/peru/peru18.jpeg", "assets/peru/peru7.jpeg", "assets/peru/peru20.jpeg", "assets/peru/peru37.jpeg", "assets/peru/peru29.jpeg", "assets/peru/peru8.jpeg", "assets/peru/peru13.jpeg", "assets/peru/peru19.jpeg", "assets/peru/peru14.jpeg", "assets/peru/peru34.jpeg", "assets/peru/peru36.jpeg"] },   // Peru
  ],

  // ----- Page 3: other hobbies -----
  // TODO: add more hobbies (with a name + a one-line note each)
  hobbies: [
    { name: "Travelling",
      note: "the largest ongoing side project, logged country by country in Appendix F." },
    { name: "Sport",
      note: "Lifting, tennis, and running, in roughly that order of stubbornness." },
    { name: "Hiking",
      note: "chasing altitude on foot; the highest so far is Rainbow Mountain in Peru, at 5,036 m." },
    { name: "Plants",
      note: "Growing things on purpose; slow work, with no early stopping." },
    { name: "Reading",
      note: "Mostly philosophy and nonfiction, read slowly and out of order." },
    { name: "Photography",
      note: "The reason Appendix F comes with so many plates." },
    { name: "Flea markets",
      note: "Wandering them for old objects with a provenance the metadata forgot." },
  ],

  // ----- Footer -----
  footerLine: "Always happy to talk about agents, benchmarks, or why evaluation is harder than it looks.",
  footerLinks: [
    { label: "r.m.popescu@tudelft.nl", url: "mailto:r.m.popescu@tudelft.nl" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=NOQ6ZAkAAAAJ&hl=ro" },
    { label: "GitHub", url: "https://github.com/Razvain" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/razvan-mihai-popescu-b71104211/" },
  ],
  colophon: "Hand-built with vanilla HTML, CSS, and JS. No frameworks were harmed.",
  signoff: "If you read all the way down here, we probably have something worth talking about. The address is back in §1.",
};
