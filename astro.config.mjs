// The handbook: how Harry builds, ships and runs his projects, for every project, not only AUGUR.
// Built with Starlight, the same as AUGUR's docs site (ADR 0082). Where it's published comes from the
// build's environment, never from here: DOCS_SITE_URL is the site's origin and DOCS_BASE the path it's
// served under (`/` unless set).
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

export default defineConfig({
  site: process.env.DOCS_SITE_URL || 'http://localhost:4321',
  base: process.env.DOCS_BASE || '/',
  integrations: [
    starlight({
      title: 'Handbook',
      description: 'How Harry builds, ships and runs his projects.',
      // llms.txt, llms-full.txt and llms-small.txt, so an agent can load the whole process in one fetch.
      plugins: [starlightLlmsTxt()],
      social: [{ icon: 'github', label: 'Source', href: 'https://github.com/harry-burton-dev/handbook' }],
      editLink: { baseUrl: 'https://github.com/harry-burton-dev/handbook/edit/main/' },
      lastUpdated: true,
      // Diátaxis: one section per kind of page (Explanation explains the split).
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'start-here' } }] },
        { label: 'How-to', items: [{ autogenerate: { directory: 'how-to' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Explanation', items: [{ autogenerate: { directory: 'explanation' } }] },
        { label: 'Decisions', collapsed: true, items: [{ autogenerate: { directory: 'decisions' } }] },
      ],
    }),
  ],
});
