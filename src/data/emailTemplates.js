/* ─────────────────────────────────────────────────────────
   Portfolio Explorer — Email Templates
   Use with any transactional provider (Resend, SendGrid, etc.)
   ───────────────────────────────────────────────────────── */

export const EMAIL_TEMPLATES = {
  /* 1. Pre-launch / waitlist */
  prelaunch: {
    subject: "You're on the list — Portfolio Explorer launches soon",
    preview: 'Be the first to build the portfolio that wins clients.',
    body: `
Hi {{name}},

You're officially on the Portfolio Explorer early-access list. We launch in **{{days}} days**, and you're getting in before anyone else.

Here's what's coming:

✦ **Rich case study builder** — tell the story behind the work, not just the images.
✦ **Private & gated projects** — share selectively, protect your premium work.
✦ **Client portal** — ditch the PDF. Send clients a link instead.

As an early supporter, you'll get **3 months of Pro free** when we launch.

We'll send your access link the moment the doors open.

— The Portfolio Explorer team

P.S. Know a freelancer or agency who'd love this? Forward this email. We'll extend their free trial too.
    `.trim(),
  },

  /* 2. Launch day */
  launch: {
    subject: "🚀 Portfolio Explorer is live — your early access is ready",
    preview: 'Start building the portfolio that wins clients. Today.',
    body: `
Hi {{name}},

**Today's the day.** Portfolio Explorer is live, and your early-access account is waiting.

👉 **Activate your account → {{activationUrl}}**

Your early-bird perks:
- 3 months of Pro — completely free
- Lock in 40% off for life when you upgrade
- Priority support from our team

**How to get started in 5 minutes:**
1. Activate your account (link above)
2. Add your first project
3. Publish your portfolio URL

Questions? Hit reply — we read every email.

— The Portfolio Explorer team
    `.trim(),
  },

  /* 3. Onboarding (post-signup) */
  onboarding: {
    subject: 'Welcome to Portfolio Explorer — 3 things to do first',
    preview: 'Your portfolio is waiting. Here\'s how to make it great.',
    body: `
Hi {{name}},

Welcome to Portfolio Explorer! Here are the three things that'll get your portfolio from zero to client-ready:

**1. Add your first case study**
Go to your Dashboard → Add Project. Spend 20 minutes on a strong summary, 3 metrics, and one quote from a client. That's the MVP.

**2. Customize your URL**
Your portfolio lives at **portfolioexplorer.io/{{username}}**. On the Pro plan, you can add a custom domain.

**3. Share it**
Add the link to your email signature, LinkedIn, and the top of your CV. That's where clients are already looking.

Need inspiration? Browse what other creatives have built:
→ {{exploreUrl}}

We're here if you need us,
— The Portfolio Explorer team

---
You're on the Free plan. Upgrade to Pro to unlock private projects, custom domains, and analytics.
→ Upgrade for $19/month: {{upgradeUrl}}
    `.trim(),
  },
};

/* OG Image concepts (for designers / hand-off)
─────────────────────────────────────────────────
1. HERO (1200×630)
   - Dark bg (#0a0b0e), brand purple gradient top-right
   - Large display type: "Your portfolio should win clients, not just impress them."
   - Logo bottom-left, URL bottom-right
   - Alt: "Portfolio Explorer — premium portfolio platform for creatives"

2. SOCIAL SQUARE (1080×1080)
   - White bg, centered lock-up
   - Brand mark + "Portfolio Explorer" wordmark
   - Sub: "Case studies that convert."
   - Alt: "Portfolio Explorer logo and tagline"

3. FEATURE CARD (1200×630)
   - Split layout: left = copy block, right = UI screenshot
   - Copy: "Gated projects. Private sharing. Client portal."
   - Alt: "Portfolio Explorer feature showcase — private projects and client portal"
*/
