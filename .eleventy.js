import { EleventyI18nPlugin as i18n } from '@11ty/eleventy'
import highlight from '@11ty/eleventy-plugin-syntaxhighlight'

import toc from 'eleventy-plugin-toc'
import mermaid from '@kevingimbel/eleventy-plugin-mermaid'

import mdi from 'markdown-it'
import { light as emoji } from 'markdown-it-emoji'
import sub from 'markdown-it-sup'
import sup from 'markdown-it-sub'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import math from 'markdown-it-mathjax3'
import callout from 'markdown-it-obsidian-callouts'
import anchor from 'markdown-it-anchor'
import slugify from 'slugify'

export default async function (eleventyConfig) {
    eleventyConfig.addPlugin(i18n, {
        defaultLanguage: 'uk',
    })
    eleventyConfig.addPlugin(highlight)

    eleventyConfig.addPlugin(toc)

    eleventyConfig.addPlugin(mermaid, {
        mermaid_config: {
            theme: 'dark',
            // themeVariables: { fontFamily: '' }, // TODO: add main font
        },
    })

    const mdiOptions = {
        html: true,
        linkify: true,
        typographer: true,
        highlight: true,
    }

    const mdiAnchorOpts = {
        permalink: anchor.permalink.headerLink({
            class: 'anchor-link',
        }),
        level: [1, 2, 3, 4],
        slugify: (s) => slugify(s, { locale: 'uk', lower: true }),
    }

    const md = mdi(mdiOptions)
        .use(emoji)
        .use(sub)
        .use(sup)
        .use(ins)
        .use(mark)
        .use(footnote)
        .use(deflist)
        .use(abbr)
        .use(math)
        .use(callout)
        .use(anchor, mdiAnchorOpts)

    eleventyConfig.setLibrary('md', md)

    return {
        dir: {
            input: 'src',
            output: 'dist',
            markdownTemplateEngine: 'njk',
            htmlTemplateEngine: 'njk',
        },
    }
}
