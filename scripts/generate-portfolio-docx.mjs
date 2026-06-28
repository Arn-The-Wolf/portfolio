import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  ImageRun,
  LevelFormat,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  convertInchesToTwip,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COLORS = {
  header: "2C3E50",
  sidebar: "E8ECF0",
  body: "333333",
  muted: "666666",
  white: "FFFFFF",
  rule: "B0B8C0",
};

const FONT = "Calibri";
const BULLET_REF = "portfolio-bullets";

const SITE = {
  name: "RUYANGE Arnold",
  nameUpper: "RUYANGE ARNOLD",
  title: "Full-Stack Developer",
  titleUpper: "FULL-STACK DEVELOPER",
  email: "ruyangearnold@gmail.com",
  github: "https://github.com/Arn-The-Wolf",
  website: "https://arnold-rho.vercel.app",
  phonePlaceholder: "[Your phone]",
  locationPlaceholder: "[Your city, country]",
};

const AI_ML_SKILLS = ["TensorFlow", "CNN", "Machine Learning", "Python", "Data Preprocessing"];
const MOBILE_SKILLS = ["React Native", "Expo", "Cross-platform UI", "Mobile APIs"];

const PORTFOLIO_PROJECT = {
  title: "ARNOLD.DEV Portfolio",
  subtitle: "Personal Developer Portfolio",
  problem:
    "Needed a professional online presence to showcase projects, skills, and case studies with fast performance and a distinctive modern UX.",
  built:
    "Full-stack portfolio with Next.js 14, TypeScript, Tailwind CSS, Three.js visuals, JSON-backed CMS APIs, and Vercel deployment.",
  outcome:
    "Live portfolio at arnold-rho.vercel.app with project showcase, skills arsenal, blog, case studies, and contact flow.",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Three.js", "Vercel"],
  github: "https://github.com/Arn-The-Wolf",
  results: ["Live production site", "CMS-driven content", "Performance-optimized UX"],
  challenges: ["3D hero performance", "Content management", "Responsive design"],
};

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function resolvePhotoBuffer() {
  const candidates = [
    path.join(ROOT, "Professional.png"),
    path.join(ROOT, "public", "images", "profile.png"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate);
    }
  }

  throw new Error(
    "No profile photo found. Add Professional.png at the repo root or public/images/profile.png.",
  );
}

function getYearsExperience() {
  return Math.max(1, new Date().getFullYear() - 2023);
}

function noBorders() {
  return {
    top: { style: BorderStyle.NONE, size: 0, color: "auto" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
    left: { style: BorderStyle.NONE, size: 0, color: "auto" },
    right: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
  };
}

function text(content, options = {}) {
  return new TextRun({
    text: content,
    font: FONT,
    size: options.size ?? 20,
    color: options.color ?? COLORS.body,
    bold: options.bold ?? false,
    italics: options.italics ?? false,
  });
}

function sectionTitle(title) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [text(title.toUpperCase(), { bold: true, size: 22, color: COLORS.body })],
    border: {
      bottom: { color: COLORS.rule, space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
  });
}

function bodyParagraph(content, options = {}) {
  return new Paragraph({
    spacing: { after: options.after ?? 120 },
    children: [text(content, options)],
  });
}

function bulletItem(content) {
  return new Paragraph({
    numbering: { reference: BULLET_REF, level: 0 },
    spacing: { after: 60 },
    children: [text(content, { size: 19 })],
  });
}

function hyperlinkParagraph(label, url) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new ExternalHyperlink({
        link: url,
        children: [text(label, { size: 19, color: "0563C1" })],
      }),
    ],
  });
}

function pageBreakParagraph() {
  return new Paragraph({ children: [new PageBreak()] });
}

function categoryBanner(title) {
  return new Paragraph({
    shading: { fill: COLORS.header, type: ShadingType.CLEAR },
    spacing: { before: 0, after: 200 },
    indent: { left: convertInchesToTwip(0.15), right: convertInchesToTwip(0.15) },
    children: [text(title.toUpperCase(), { bold: true, size: 28, color: COLORS.white })],
  });
}

function skillSubsection(label, items) {
  return [
    new Paragraph({
      spacing: { before: 100, after: 40 },
      children: [text(label, { bold: true, size: 19, color: COLORS.body })],
    }),
    ...items.map((item) => bulletItem(item)),
  ];
}

function experienceBlock(entry) {
  return [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: convertInchesToTwip(4.2) }],
      spacing: { before: 140, after: 40 },
      children: [
        text(entry.company, { bold: true, size: 21 }),
        text(`\t${entry.period}`, { size: 19, color: COLORS.muted }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [text(entry.role, { italics: true, size: 20 })],
    }),
    bodyParagraph(entry.description, { size: 19, after: 80 }),
    ...entry.technologies.map((tech) => bulletItem(tech)),
  ];
}

function findCaseStudy(project, cases) {
  const key = project.title.toLowerCase();
  return cases.find((c) => c.title.toLowerCase().includes(key.split(" ")[0]));
}

function projectBlock(project, caseStudy) {
  const blocks = [
    new Paragraph({
      spacing: { before: 180, after: 40 },
      children: [
        text(project.title, { bold: true, size: 26, color: COLORS.header }),
        text(project.subtitle ? ` — ${project.subtitle}` : "", { size: 20, color: COLORS.muted }),
      ],
    }),
    bodyParagraph(`Problem: ${project.problem}`, { size: 19 }),
    bodyParagraph(`Built: ${project.built}`, { size: 19 }),
    bodyParagraph(`Outcome: ${project.outcome}`, { size: 19 }),
    new Paragraph({
      spacing: { after: 80 },
      children: [text(`Tech: ${project.technologies.join(", ")}`, { bold: true, size: 19 })],
    }),
    hyperlinkParagraph(`GitHub: ${project.github}`, project.github),
  ];

  if (project.results?.length) {
    blocks.push(
      new Paragraph({
        spacing: { before: 60, after: 40 },
        children: [text("Key results", { bold: true, size: 19 })],
      }),
      ...project.results.map((item) => bulletItem(item)),
    );
  }

  if (project.challenges?.length) {
    blocks.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [text("Challenges solved", { bold: true, size: 19 })],
      }),
      ...project.challenges.map((item) => bulletItem(item)),
    );
  }

  if (caseStudy?.results?.length) {
    blocks.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [text("Impact metrics", { bold: true, size: 19 })],
      }),
      ...caseStudy.results.map((metric) =>
        bulletItem(`${metric.metric}: ${metric.before} → ${metric.after} (${metric.improvement})`),
      ),
    );
  }

  return blocks;
}

function buildSidebarContent({ skills, history, photoBuffer }) {
  const skillNames = (category) => (skills[category] ?? []).map((s) => s.name);

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 160 },
      children: [
        new ImageRun({
          type: "png",
          data: photoBuffer,
          transformation: { width: 110, height: 110 },
        }),
      ],
    }),
    sectionTitle("Contact"),
    bodyParagraph(SITE.phonePlaceholder, { size: 19 }),
    hyperlinkParagraph(SITE.email, `mailto:${SITE.email}`),
    bodyParagraph(SITE.locationPlaceholder, { size: 19 }),
    hyperlinkParagraph(SITE.website.replace("https://", ""), SITE.website),
    hyperlinkParagraph("GitHub", SITE.github),
    sectionTitle("Skills"),
    ...skillSubsection("Frontend", skillNames("frontend")),
    ...skillSubsection("Backend", skillNames("backend")),
    ...skillSubsection("Mobile", MOBILE_SKILLS),
    ...skillSubsection("AI / ML", AI_ML_SKILLS),
    ...skillSubsection("DevOps", skillNames("devops")),
    ...skillSubsection("Security", skillNames("security")),
    sectionTitle("Languages"),
    bulletItem("English (Fluent)"),
    bulletItem("[Add language]"),
    sectionTitle("Certifications"),
    ...history.certifications.flatMap((cert) => [
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [text(cert.name, { bold: true, size: 19 })],
      }),
      bodyParagraph(`${cert.issuer} · ${cert.year}`, { size: 18, color: COLORS.muted, after: 80 }),
    ]),
  ];
}

function buildMainResumeContent({ history, yearsExp }) {
  const profile = [
    `Full-stack developer with ${yearsExp}+ years of hands-on experience building Java, Python, AI/ML, and web applications. I design and ship end-to-end systems — from desktop GUIs and REST APIs to CNN models and IoT pipelines.`,
    `Portfolio of RUYANGE Arnold — focused on practical software engineering through open-source work on GitHub, project-based learning, and production-ready user experiences.`,
  ];

  return [
    new Paragraph({
      shading: { fill: COLORS.header, type: ShadingType.CLEAR },
      spacing: { before: 0, after: 200 },
      indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
      children: [text(SITE.nameUpper, { bold: true, size: 34, color: COLORS.white })],
    }),
    new Paragraph({
      shading: { fill: COLORS.header, type: ShadingType.CLEAR },
      spacing: { after: 240 },
      indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
      children: [text(SITE.titleUpper, { size: 22, color: COLORS.white })],
    }),
    sectionTitle("Profile"),
    ...profile.map((paragraph) => bodyParagraph(paragraph, { size: 19 })),
    sectionTitle("Work Experience"),
    ...history.experience.flatMap((entry) => experienceBlock(entry)),
    sectionTitle("Education"),
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: convertInchesToTwip(4.2) }],
      spacing: { before: 140, after: 40 },
      children: [
        text("Computer Science", { bold: true, size: 21 }),
        text("\t2023 - Present", { size: 19, color: COLORS.muted }),
      ],
    }),
    bodyParagraph("University / Self-Directed Learning · Remote", { size: 19, italics: true }),
    bodyParagraph(
      "Studying computer science fundamentals while building personal projects in Java, Python, AI/ML, and web development. Focus on practical software engineering through open-source work.",
      { size: 19 },
    ),
  ];
}

function buildResumePage({ skills, history, photoBuffer, yearsExp }) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { fill: COLORS.sidebar, type: ShadingType.CLEAR },
            borders: noBorders(),
            margins: {
              top: convertInchesToTwip(0.08),
              bottom: convertInchesToTwip(0.08),
              left: convertInchesToTwip(0.12),
              right: convertInchesToTwip(0.1),
            },
            children: buildSidebarContent({ skills, history, photoBuffer }),
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            borders: noBorders(),
            margins: {
              top: convertInchesToTwip(0.08),
              bottom: convertInchesToTwip(0.08),
              left: convertInchesToTwip(0.15),
              right: convertInchesToTwip(0.12),
            },
            children: buildMainResumeContent({ history, yearsExp }),
          }),
        ],
      }),
    ],
  });
}

function sortByPriority(projects) {
  return [...projects].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

function buildProjectPages(projects, cases) {
  const fullstack = sortByPriority(projects.filter((p) => p.category === "fullstack"));
  fullstack.push(PORTFOLIO_PROJECT);

  const backend = sortByPriority(projects.filter((p) => p.category === "backend"));
  const ai = sortByPriority(projects.filter((p) => p.category === "ai"));
  const devops = sortByPriority(projects.filter((p) => p.category === "devops"));

  const pages = [];

  pages.push(
    pageBreakParagraph(),
    categoryBanner("Featured Projects"),
    bodyParagraph(
      "Selected work across full-stack, backend, AI/ML, DevOps, and mobile-focused development. Each project includes the problem, implementation, outcome, and repository link.",
      { size: 19 },
    ),
  );

  pages.push(pageBreakParagraph(), categoryBanner("Fullstack Projects"));
  for (const project of fullstack) {
    pages.push(...projectBlock(project, findCaseStudy(project, cases)));
  }

  pages.push(pageBreakParagraph(), categoryBanner("Backend Projects"));
  for (const project of backend) {
    pages.push(...projectBlock(project, findCaseStudy(project, cases)));
  }

  pages.push(pageBreakParagraph(), categoryBanner("AI / ML Projects"));
  for (const project of ai) {
    pages.push(...projectBlock(project, findCaseStudy(project, cases)));
  }

  pages.push(pageBreakParagraph(), categoryBanner("DevOps Projects"));
  for (const project of devops) {
    pages.push(...projectBlock(project, findCaseStudy(project, cases)));
  }

  pages.push(
    pageBreakParagraph(),
    categoryBanner("Mobile — Skills & Focus"),
    bodyParagraph(
      "Mobile development is an active focus area. Current stack centers on React Native and Expo for cross-platform apps, with API-first backends from my full-stack work.",
      { size: 19 },
    ),
    ...skillSubsection("Technologies", MOBILE_SKILLS),
    bodyParagraph(
      "No dedicated mobile app repositories in the portfolio yet — upcoming work will extend existing backends (Flask, Node.js) with React Native clients.",
      { size: 19, color: COLORS.muted },
    ),
  );

  return pages;
}

async function main() {
  const skills = readJson("data/skills.json");
  const history = readJson("data/history.json");
  const projects = readJson("data/projects.json");
  const cases = readJson("data/cases.json");
  const photoBuffer = resolvePhotoBuffer();
  const yearsExp = getYearsExperience();

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: BULLET_REF,
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u2022",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.12) },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
              bottom: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          buildResumePage({ skills, history, photoBuffer, yearsExp }),
          ...buildProjectPages(projects, cases),
        ],
      },
    ],
  });

  const outputDir = path.join(ROOT, "public");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "RUYANGE-Arnold-Portfolio.docx");
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);

  console.log(`Portfolio DOCX generated: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
