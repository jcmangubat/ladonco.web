// run first 
// --> npm install dotenv
// --> npm install node-fetch@2
// --> node -e "require('dotenv').config()"
// --> node -e "console.log(process.env.VITE_ARTICLE_AIPROMPT_TEMPLATE)"
// --> node -e "console.log(process.env.VITE_ARTICLE_PROVIDER)" 
// --> node scripts/generateArticle.cjs
// This script generates an article based on a topic from a predefined list.
require('dotenv').config();

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function run() {
  const promptTemplate = process.env.VITE_ARTICLE_AIPROMPT_TEMPLATE;
  const provider = process.env.VITE_ARTICLE_PROVIDER;

  if (!promptTemplate || !provider) {
    console.error("❌ Missing environment variables.");
    process.exit(1);
  }

  // Load topics
  const topicsPath = path.join(__dirname, "../config/article-topics.json");
  const topicsData = JSON.parse(fs.readFileSync(topicsPath, "utf8"));

  // Get month and topics
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const monthTopics = topicsData["monthly-topics"][currentMonth] || [];

  if (monthTopics.length === 0) {
    console.error(`❌ No topics for ${currentMonth}`);
    process.exit(1);
  }

  // Check existing posts
  const postsDir = path.join(__dirname, "../src/contents/posts");
  const existingFiles = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];

  // Pick unused topic
  let selectedTopic;
  for (let i = 0; i < monthTopics.length; i++) {
    const candidate =
      monthTopics[Math.floor(Math.random() * monthTopics.length)];
    const topicSlug = slugify(candidate);
    if (!existingFiles.some((f) => f.includes(`-${topicSlug}-`))) {
      selectedTopic = candidate;
      break;
    }
  }

  if (!selectedTopic) {
    console.error("⚠️ All topics for this month already used.");
    process.exit(1);
  }

  // Generate prompt and fetch
  const finalPrompt = `produce md about ${selectedTopic} ${promptTemplate} 400 words max.`;
  const url = `${provider}${encodeURIComponent(finalPrompt)}`;
  console.log(`📡 Generating article for topic: ${selectedTopic}`);
  console.log(`📝 Using prompt: ${finalPrompt}`);

  // Fetch article
  console.log(`🔗 Fetching from: ${url}`);

  const res = await fetch(url);
  const articleText = await res.text();
  
  if (!articleText || articleText.length < 100) {
    console.error("❌ Failed to generate a valid article.");
    process.exit(1);
  }

  console.log(`✅ Article generated for topic: ${selectedTopic}`);
  console.log(`📄 Article text length: ${articleText.length} characters`);
  console.log(`📄 Article text preview: ${articleText.slice(0, 100)}...`);

  // Build filename
  const today = new Date();
  const datePart = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const titleSlug = slugify(articleText.split(/\s+/).slice(0, 8).join(" "));
  const topicSlug = slugify(selectedTopic);
  const fileName = `${datePart}-${topicSlug}-${titleSlug}.md`;

  // Save
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
  fs.writeFileSync(path.join(postsDir, fileName), articleText);

  console.log(`✅ Saved: src/pages/posts/${fileName}`);
}

run();
