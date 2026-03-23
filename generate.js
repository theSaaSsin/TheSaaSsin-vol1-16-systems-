#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function getPuppeteer() {
  try {
    return await import("puppeteer");
  } catch {
    console.log("📦 Installing Puppeteer...");
    execSync("npm install puppeteer", { stdio: "inherit" });
    return await import("puppeteer");
  }
}

const VOLUMES = [
  ["NOTION OPERATING SYSTEM","Turn scattered work into a system that runs itself."],
  ["SAAS FUNNEL ARCHITECT","Build funnels that convert traffic into revenue."],
  ["AI WORKFLOW AUTOMATIONS","Replace repetitive work with scalable AI systems."],
  ["B2B LEAD ENGINE","Generate consistent, high-quality leads."],
  ["PRODUCTIZED SERVICE SYSTEMS","Turn services into scalable revenue machines."],
  ["SAAS CONTENT FACTORY","Produce high-authority content on demand."],
  ["CUSTOMER SUCCESS OS","Systemize onboarding, retention, and expansion."],
  ["FOUNDER PRODUCTIVITY PROTOCOLS","Eliminate noise and execute at peak efficiency."],
  ["SALES PLAYBOOK GENERATOR","Close deals with repeatable systems."],
  ["SAAS BRAND IDENTITY SYSTEM","Build a premium brand across every touchpoint."],
  ["AI-ENHANCED MARKET RESEARCH","Extract insights faster than competitors."],
  ["LAUNCH & GTM ENGINE","Execute launches that convert."],
  ["PRICING & PACKAGING LAB","Increase revenue with optimized pricing."],
  ["SAAS OPS & INFRASTRUCTURE","Build systems that scale your company."],
  ["VIRAL SOCIAL FRAMEWORKS","Create high-reach content consistently."],
  ["FOUNDER LEVERAGE SYSTEMS","Remove yourself and scale effortlessly."]
];

function buildHTML(title, sub) {
  return `
  <html>
  <head>
    <style>
      body {
        margin:0;
        width:1600px;
        height:900px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:Arial;
        background: radial-gradient(circle at top, #2b0000, #000);
        color:white;
      }
      .wrap {
        text-align:center;
        max-width:1100px;
      }
      .brand {
        font-size:120px;
        font-weight:900;
      }
      .brand span {
        color:#ff2d2d;
      }
      .title {
        font-size:64px;
        font-weight:800;
        margin-top:40px;
      }
      .sub {
        font-size:28px;
        color:#ff2d2d;
        margin-top:20px;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="brand">The<span>SaaS</span>sin</div>
      <div class="title">${title}</div>
      <div class="sub">${sub}</div>
    </div>
  </body>
  </html>
  `;
}

async function main() {
  const puppeteer = await getPuppeteer();
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const outDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  for (let i = 0; i < VOLUMES.length; i++) {
    const [title, sub] = VOLUMES[i];

    await page.setViewport({ width: 1600, height: 900 });
    await page.setContent(buildHTML(title, sub));

    const file = path.join(outDir, `vol_${String(i+1).padStart(2,"0")}.png`);

    await page.screenshot({ path: file });
    console.log("✅", file);
  }

  await browser.close();
  console.log("🎉 DONE — check /output folder");
}

main();
