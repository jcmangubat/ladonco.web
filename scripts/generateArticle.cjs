// This script generates an article based on a topic from a predefined list.
//
// run first
// --> npm install dotenv
// --> npm install node-fetch@2

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// Parse optional date parameter
const args = process.argv.slice(2);
let targetDate = null;

args.forEach((arg) => {
  if (arg.startsWith("d=")) {
    const value = arg.split("=")[1];
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parsed = new Date(value);
      if (isNaN(parsed.getTime())) {
        console.error(
          "❌ Invalid date. Please use a real date in YYYY-MM-DD format."
        );
        process.exit(1);
      }
      targetDate = parsed;
    } else {
      console.error("❌ Invalid date format. Use YYYY-MM-DD.");
      process.exit(1);
    }
  }
});

if (!targetDate) {
  targetDate = new Date();
}

function safeReadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(
      `❌ Failed to read or parse JSON at ${filePath}:`,
      err.message
    );
    process.exit(1);
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function validateEnv(keys) {
  keys.forEach((key) => {
    if (!process.env[key]) {
      console.error(`❌ Missing environment variable: ${key}`);
      process.exit(1);
    }
  });
}

function ensureUniqueSlug(baseSlug, catalog) {
  let slug = baseSlug;
  let counter = 2;
  while (catalog.some((entry) => entry.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

function getCatalogPath() {
  return path.join(__dirname, "../src/contents/blogs-catalog.json");
}

function extractJson(raw) {
  // find first { or [
  const startCurly = raw.indexOf("{");
  const startBracket = raw.indexOf("[");
  const start =
    startCurly >= 0 && (startBracket < 0 || startCurly < startBracket)
      ? startCurly
      : startBracket;

  // find last } or ]
  const endCurly = raw.lastIndexOf("}");
  const endBracket = raw.lastIndexOf("]");
  const end =
    endBracket >= 0 && (endCurly < 0 || endBracket > endCurly)
      ? endBracket + 1
      : endCurly + 1;

  if (start < 0 || end < 0) {
    throw new Error("No JSON object or array found in raw response");
  }
  return raw.slice(start, end);
}

async function getNextId() {
  const catalog = safeReadJSON(getCatalogPath());
  return catalog.length ? catalog[catalog.length - 1].id + 1 : 1;
}

async function appendToCatalog(newEntry) {
  const catalogPath = getCatalogPath();
  const catalog = safeReadJSON(catalogPath);

  newEntry.id = catalog.length ? catalog[catalog.length - 1].id + 1 : 1;
  catalog.push(newEntry);

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), "utf8");
}

async function generateMetadata(articleText, selectedTopic) {
  const _targetDate = targetDate.toISOString().split("T")[0];

  const metadataPrompt = `
  Return only valid JSON. Use double quotes around all keys and string values. Do not include any commentary or markdown delimiters.
Given this article:

[${articleText}]

Fill in the following JSON object with emotionally resonant and SEO-friendly values. Keep the tone professional and culturally attuned to Filipino audiences but in English.

{
  id: [next available number],
  title: [short, clear, emotionally resonant title],
  topic: "${selectedTopic}",
  date: "${_targetDate}",
  category: [suggested category],
  image: "NONE",
  excerpt: [1–2 sentence summary],
  readTime: [estimated read time like "3 min read"],
  author: "LadonCo",
  tags: [4–6 relevant keywords]
}
`;

  try {
    // Fetch metadata from the AI service
    console.log("🔍 Fetching metadata...");
    const url = `https://text.pollinations.ai/${encodeURIComponent(
      metadataPrompt
    )}`;
    //console.log(`🔗 Fetching from: ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch metadata: ${res.status} ${res.statusText}`
      );
    }
    console.log("📥 Metadata fetched successfully.");
    const raw = await res.text();

    if (!res.ok)
      throw new Error(
        `Failed to fetch metadata: ${res.status} ${res.statusText}`
      );
    if (!raw || raw.trim() === "")
      throw new Error("Metadata response is empty.");
    if (!raw.startsWith("{") || !raw.endsWith("}"))
      throw new Error("Metadata response is not valid JSON.");
    if (raw.length < 50)
      throw new Error("Metadata response too short or empty.");

    // Parse the JSON response
    console.log("📄 Parsing metadata...");

    const jsonStr = extractJson(raw);
    const parsed = JSON.parse(jsonStr);

    parsed.slug = slugify(parsed.title);
    parsed.excerpt = parsed.excerpt || "No summary available.";
    parsed.readTime = parsed.readTime || "3 min read";
    parsed.category = parsed.category || "General";
    parsed.image = parsed.image || "NONE";
    parsed.date = _targetDate;
    parsed.topic = selectedTopic;
    parsed.author = "LadonCo";
    parsed.tags = parsed.tags || [];

    if (!Array.isArray(parsed.tags) || parsed.tags.length === 0) {
      parsed.tags = ["LadonCo", "AI", "Technology", "Innovation"]; // Default tags
    } else {
      parsed.tags = parsed.tags.slice(0, 6); // Limit to 6 tags if more than 6
    }

    // Generate file name
    const titleSlug = slugify(
      parsed.title.split(/\s+/).slice(0, 6).join(" ")
    ).slice(0, 40);
    const topicSlug = slugify(selectedTopic);
    parsed.fileName = `${_targetDate}-${topicSlug}-${titleSlug}.md`;

    parsed.id = await getNextId();

    const catalog = safeReadJSON(getCatalogPath());
    parsed.slug = ensureUniqueSlug(slugify(parsed.title), catalog);

    console.log("✅ Metadata generated and appended.");
    console.log("📄 Metadata preview:", JSON.stringify(parsed, null, 2));

    return parsed;
  } catch (err) {
    console.error("❌ Failed to fetch or parse metadata:", err.message);
    return null;
  }
}

async function generateImage(metadata) {
  // Generate image prompt
  const imagePromptTemplate =
    process.env.VITE_IMAGE_AIPROMPT_TEMPLATE ||
    "A high-quality, professional photograph that captures the essence of the topic: {excerpt}.";

  const imagePrompt = imagePromptTemplate
    .replace("{title}", metadata.title)
    .replace("{excerpt}", metadata.excerpt);

  console.log(`🖼️ Generating image with prompt: ${imagePrompt}`);

  const pubPostImgDir = path.join(__dirname, "../public/contents/posts/images");
  if (!fs.existsSync(pubPostImgDir)) {
    fs.mkdirSync(pubPostImgDir, { recursive: true });
  }

  const imageFileName = `${metadata.slug}.png`;
  const imageFilePath = path.join(pubPostImgDir, imageFileName);
  metadata.image = `/contents/posts/images/${imageFileName}`;

  // Build Pollinations API URL
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    imagePrompt
  )}?width=1024&height=512&seed=40&nologo=true`;

  // Fetch and save image
  try {
    const response = await fetch(pollinationsUrl);

    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(imageFilePath, Buffer.from(buffer));

    console.log(`✅ Image saved: ${imageFilePath}`);
  } catch (err) {
    console.error("❌ Error generating image:", err);
  }

  // Store prompt for reference
  //parsedMeta.imagePrompt = imagePrompt;
  //console.log(`🖼️ Image prompt set in metadata.`);
}

async function run() {
  validateEnv([
    "VITE_ARTICLE_AIPROMPT_TEMPLATE",
    "VITE_ARTICLE_PROVIDER",
    "VITE_IMAGE_AIPROMPT_TEMPLATE",
  ]);

  const {
    VITE_ARTICLE_AIPROMPT_TEMPLATE: promptTemplate,
    VITE_ARTICLE_PROVIDER: provider,
  } = process.env;

  const topicsPath = path.join(__dirname, "../config/article-topics.json");
  const topicsData = safeReadJSON(topicsPath);

  const currentMonth = targetDate.toLocaleString("en-US", { month: "long" });
  const monthTopics = topicsData["monthly-topics"][currentMonth] || [];

  if (monthTopics.length === 0) {
    console.error(`❌ No topics found for ${currentMonth}.`);
    process.exit(1);
  }

  const postsDir = path.join(__dirname, "../src/contents");
  const existingFiles = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];

  const shuffledTopics = [...monthTopics].sort(() => 0.5 - Math.random());
  const selectedTopic = shuffledTopics.find(
    (topic) => !existingFiles.some((f) => f.includes(`-${slugify(topic)}-`))
  );

  if (!selectedTopic) {
    console.error("⚠️ All topics for this month already used.");
    process.exit(1);
  }

  // Construct the final prompt
  // Example: "produce md discussing The Future of AI in Everyday Life. <template>"
  //const finalPrompt = `produce md discussing ${selectedTopic}. ${promptTemplate}`;
  const finalPrompt = selectedTopic;
  const url = `${provider}${encodeURIComponent(finalPrompt)}`;

  console.log(`📡 Generating article for topic: ${selectedTopic}`);
  console.log(`📝 Using prompt: ${finalPrompt}`);
  console.log(`🔗 Fetching from: ${url}`);

  try {
    const res = await fetch(url);
    const articleText = await res.text();

    if (!articleText || articleText.length < 100) {
      throw new Error("Invalid or empty article generated.");
    }

    console.log(`✅ Article generated (${articleText.length} characters).`);
    console.log(`📄 Preview: ${articleText.slice(0, 100)}...`);

    console.log("📊 Generating metadata...");
    const parsedMeta = await generateMetadata(articleText, selectedTopic);

    if (!parsedMeta) {
      console.error("❌ Failed to generate metadata.");
      process.exit(1);
    } else {
      console.log("✅ Metadata generated successfully.");
      console.log("📄 Metadata preview:", parsedMeta);

      console.log(`📄 Preview: ${articleText.slice(0, 100)}...`);
    }

    // Generate image
    console.log("🖼️ Generating image...");
    await generateImage(parsedMeta);

    // Append to catalog
    console.log("📚 Appending to catalog...");
    await appendToCatalog(parsedMeta);

    // Save the article markdown file
    const pubPostsDir = path.join(__dirname, "../public/contents/posts");
    const pubPostMDFilePath = path.join(pubPostsDir, parsedMeta.fileName);
    console.log(`📂 Saving as: ${pubPostMDFilePath}`);
    if (!fs.existsSync(pubPostsDir))
      fs.mkdirSync(pubPostsDir, { recursive: true });

    const publicCatalogPath = path.join(
      __dirname,
      "../public/contents/blogs-catalog.json"
    );

    const frontmatter = `---
title: "${parsedMeta.title}"
date: "${parsedMeta.date}"
author: "${parsedMeta.author}"
category: "${parsedMeta.category}"
tags: ${JSON.stringify(parsedMeta.tags)}
excerpt: "${parsedMeta.excerpt}"
slug: "${parsedMeta.slug}"
---\n\n`;

    fs.writeFileSync(pubPostMDFilePath, frontmatter + articleText, "utf8");

    console.log(`✅ Saved: ${path.relative(process.cwd(), pubPostMDFilePath)}`);

    // Sync updated catalog to public folder
    if (!fs.existsSync(path.dirname(publicCatalogPath))) {
      fs.mkdirSync(path.dirname(publicCatalogPath), { recursive: true });
    }

    console.log("🔄 Syncing catalog to public folder...");
    fs.copyFileSync(getCatalogPath(), publicCatalogPath);
    console.log(
      "🔄 Success! Synced catalog to public folder for frontend access."
    );

    console.log(
      `🎉 Article generation complete! Check the posts directory for the new article.`
    );
  } catch (err) {
    console.error("❌ Failed to generate article:", err.message);
    process.exit(1);
  }
}

run();

/*
  Run Options:
  
  first: CD F:\.AppCura\LADONCO\PROJECTS\LADONCO.WEB

  1. Single run for specific date:
     node scripts/generateArticle.cjs d=2024-12-30

  
  2. Loop for all Mondays from Jan 6, 2025 to last Monday of the year:
  
  # 1. Define the first Monday of 2025
  $start = [datetime]'2025-01-06'
  
  # 2. Figure out this week's Monday
  $today            = Get-Date
  $daysToLastMonday = ([int]$today.DayOfWeek + 6) % 7
  $lastMonday       = $today.AddDays(-$daysToLastMonday).Date
  
  # 3. Loop from Jan 6 until that Monday, invoking your script and delaying 5 sec each
  for ($current = $start; $current -le $lastMonday; $current = $current.AddDays(7)) {
      $dateStr = $current.ToString('yyyy-MM-dd')
      Write-Host "→ Generating article for $dateStr"
      node scripts/generateArticle.cjs d=$dateStr
      Start-Sleep -Seconds 5
  }

*/
