// The handbook: how Harry builds, ships and runs his projects, for every project.
// Built with Starlight. Where it's published comes from the
// build's environment, never from here: DOCS_SITE_URL is the site's origin and DOCS_BASE the path it's
// served under (`/` unless set).
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: process.env.DOCS_SITE_URL || 'http://localhost:4321',
  base: process.env.DOCS_BASE || '/',
  integrations: [
    // Draws ```mermaid blocks as diagrams in the browser. It must come before Starlight.
    mermaid({ autoTheme: true }),
    starlight({
      title: 'Handbook',
      description: 'How Harry builds, ships and runs his projects.',
      // llms.txt, llms-full.txt and llms-small.txt, so an agent can load the whole process in one fetch.
      plugins: [starlightLlmsTxt()],
      social: [{ icon: 'github', label: 'Source', href: 'https://github.com/harry-burton-dev/handbook' }],
      editLink: { baseUrl: 'https://github.com/harry-burton-dev/handbook/edit/main/' },
      lastUpdated: true,
      // Diátaxis: one section per kind of page (Explanation explains the split). Decisions aren't here:
      // they're working agreements (WA records) in Drive's Ways of working, and pages link to them.
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'start-here' } }] },
        { label: 'How-to', items: [{ autogenerate: { directory: 'how-to' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Explanation', items: [{ autogenerate: { directory: 'explanation' } }] },
      ],
    }),
  ],
});
