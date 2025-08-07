# Personal Essay Website

A minimalist, content-focused personal website built with Next.js 14, designed for publishing thoughtful essays with excellent typography and user experience. Inspired by the clean aesthetics of sites like jamesclear.com, fs.blog, and claudelog.com.

## ✨ Features

- **📝 MDX-powered essays**: Write essays in Markdown with rich formatting support
- **🎨 Beautiful design**: Dark theme with carefully chosen typography and colors
- **📱 Fully responsive**: Optimized for all device sizes
- **🚀 Performance-first**: Static generation with excellent Core Web Vitals
- **📧 Newsletter integration**: Built-in support for Mailchimp, ConvertKit, and Substack
- **🔍 SEO optimized**: Dynamic meta tags, Open Graph images, and structured data
- **🏷️ Tag filtering**: Organize and filter essays by topics
- **📊 Reading time estimation**: Automatic calculation of estimated reading time
- **🌐 Social sharing**: Share essays on Twitter, LinkedIn, and via email
- **♿ Accessible**: Built with accessibility best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone and install dependencies:**

```bash
git clone <your-repo-url>
cd personal-essay-website
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Site Configuration
SITE_URL=https://your-domain.com
SITE_NAME="Your Name Essays"
AUTHOR_NAME="Your Name"
AUTHOR_EMAIL=your.email@domain.com

# Social Links (optional)
TWITTER_URL=https://twitter.com/yourusername
LINKEDIN_URL=https://linkedin.com/in/yourprofile
GITHUB_URL=https://github.com/yourusername

# Newsletter Service (choose one)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

3. **Start the development server:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 📝 Writing Essays

### Creating a New Essay

1. Create a new `.mdx` file in the `content/essays/` directory:

```bash
content/essays/your-essay-title.mdx
```

2. Add frontmatter metadata at the top:

```mdx
---
title: 'Your Essay Title'
date: '2024-01-15'
summary: 'A brief description of your essay that appears in listings and meta tags.'
tags: ['technology', 'philosophy', 'productivity']
featured: true
published: true
author: 'Your Name'
---

Your essay content goes here...
```

### Frontmatter Fields

- **title**: The essay title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **summary**: Brief description for listings and SEO (required)
- **tags**: Array of topic tags for filtering (optional)
- **featured**: Set to `true` to feature on homepage (optional)
- **published**: Set to `false` to hide in production (optional)
- **author**: Author name, defaults to AUTHOR_NAME from config (optional)

### Supported Markdown Features

- **Headings**: Use `#`, `##`, `###` for different heading levels
- **Lists**: Both ordered (`1.`) and unordered (`-`) lists
- **Links**: Internal (`[text](/page)`) and external (`[text](https://example.com)`) links
- **Images**: `![alt text](/images/image.jpg)` (place images in `public/images/`)
- **Code**: Inline `code` and code blocks with syntax highlighting
- **Blockquotes**: Use `>` for quoted text
- **Emphasis**: _italic_ and **bold** text

### Example Essay Structure

```mdx
---
title: 'The Power of Deep Work'
date: '2024-01-15'
summary: 'Exploring how focused attention creates extraordinary results in our distracted world.'
tags: ['productivity', 'focus']
featured: true
published: true
---

# Introduction

Your opening thoughts...

## Main Section

Your detailed exploration...

### Subsection

Additional details and examples...

## Conclusion

Your closing insights...

---

_What are your thoughts on this topic? How do you create space for deep work in your routine?_
```

## 🎨 Customization

### Design System

The site uses a carefully crafted design system inspired by claudelog.com:

- **Colors**: Defined in `tailwind.config.js` with CSS custom properties
- **Typography**: System fonts with careful attention to readability
- **Layout**: Consistent spacing and responsive breakpoints

### Key Design Files

- `src/app/globals.css`: Global styles and design tokens
- `tailwind.config.js`: Tailwind configuration with custom colors
- `src/components/`: Reusable UI components

### Customizing Colors

Update the color palette in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#da7756', // Your accent color
    // ... other shades
  },
  dark: {
    bg: '#262624',     // Background color
    text: '#bfbfbc',   // Text color
    // ... other variants
  },
}
```

## 📧 Newsletter Setup

The site supports multiple newsletter services. Choose one and configure:

### Mailchimp

```bash
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

### ConvertKit

```bash
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id
```

### Substack

```bash
SUBSTACK_URL=your-substack-url
```

Newsletter signups are handled by `/api/newsletter` which tries each service in order.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy!

3. **Configure Environment Variables in Vercel:**
   - Go to your project settings
   - Add all variables from your `.env` file
   - Redeploy

### Other Platforms

The site works on any platform that supports Next.js:

- **Netlify**: Configure build command as `npm run build`
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Container-based deployment

## 📊 SEO & Analytics

### Built-in SEO Features

- **Dynamic meta tags**: Title, description, and Open Graph tags for every page
- **Structured data**: JSON-LD markup for articles
- **Sitemap generation**: Automatic sitemap.xml and robots.txt
- **Open Graph images**: Dynamic social sharing images

### Adding Analytics

Add your analytics tracking to `src/app/layout.tsx`:

```tsx
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🛠️ Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker
npm run format       # Format code with Prettier
```

### Project Structure

```
├── content/essays/           # Essay MDX files
├── public/                   # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript types
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 📚 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content**: MDX for rich markdown content
- **Typography**: @tailwindcss/typography for beautiful article formatting
- **Deployment**: Optimized for Vercel, works anywhere
- **Performance**: Static generation with ISR support

## 🤝 Contributing

This is a personal website template, but improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this as a foundation for your own essay website.

## 🙋‍♂️ Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [documentation](#quick-start)
3. Open an issue on GitHub

---

**Happy writing!** 📝✨
