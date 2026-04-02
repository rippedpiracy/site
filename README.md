<img width="178" height="136" alt="rippedtransparentproper" src="https://github.com/user-attachments/assets/7dc5baf4-222b-4b75-8469-20680a15bdfa" />

# ripped.guide

[![Discord](https://img.shields.io/discord/702220357834244248?color=748bd9&labelColor=000000&label=&logo=discord&style=for-the-badge)](https://discord.ripped.guide "Discord")

[**ripped.guide**](https://ripped.guide) is the official web-based replacement for the #trusted-sites channel of the [Discord Server](https://discord.ripped.guide). 

This repository contains the application source code. The content and guides are stored on the [docs](https://github.com/rippedpiracy/docs) repository.

## Overview

The website has been re-built, years after the original, using a modern stack designed for performance and maintainability:

- **Framework**: A customized implementation of the [discord-userdoccers](https://github.com/discord-userdoccers/discord-userdoccers) framework.
- **Runtime**: [React](https://react.dev) and [Vite](https://vitejs.dev).
- **Style**: [Tailwind CSS](https://tailwindcss.com).
- **Text Rendering**: [MDX](https://mdxjs.com) for component-based documentation, improved from the original site's Markdown.
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com).

It has been engineered to best resemble Discord's UI, to ensure a fluid browsing experience between the Discord Server and the website and avoid whiplash from flashy UIs.

## Contribution Guidelines

We maintain a strict separation between technical features and documentation content. The website source code is in this repository, while the content is in the [docs](https://github.com/rippedpiracy/docs) repository.

### Documentation and Content
To propose new resources, correct existing information, or submit guides, please open an issue or pull request in the [docs](https://github.com/rippedpiracy/docs) repository.

**Submission Criteria:**
- Resources must be verified as trusted and safe.
- Hosting of illegal content (e.g., data breaches, malware) is strictly prohibited.
- Submissions must link to a landing page or library; direct download links are not permitted.
- All resources must be accessible via the clearnet.
- Do not submit a resource you have created yourself, **unless it is FOSS and there are no financial interests.**

### Application Infrastructure
To contribute to the UI, fix codebase issues, or implement new components, please submit a Pull Request to this repository.

## Development Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rippedpiracy/site.git
    cd site
    ```
2.  **Install dependencies and build**:
    ```bash
    pnpm install
    pnpm build
    ```
    *Note: On the initial build, the development server will automatically initialize the `pages/` directory by cloning the latest commit of the [docs](https://github.com/rippedpiracy/docs) repository.*
3.  **Run the development server**:
    ```bash
    pnpm run dev
    ```

## Credits

This project was built upon the [discord-userdoccers](https://github.com/discord-userdoccers) framework and is maintained by the Ripped Staff Team. We wholeheartedly thank the maintainers for allowing us to use it.
