---
name: update-drone-path-whats-new
description: Refresh the release highlights in the Drone Path landing page hero when asked to update What's new or propose features for it.
---

# Update the landing page release highlights

1. Read the five most recent versioned release entries in the [Drone Path changelog](https://github.com/MrManny/drone-path/blob/main/CHANGELOG.md). Use the product changelog rather than this website's package version. A patch release counts toward the five even if it has no feature worth highlighting.
2. Suggest three substantial user-facing features or cohesive feature groups. Lead with the biggest feature from the latest release that introduces a substantial feature. Favor changes that enable a new workflow or noticeably improve an existing one. Mention the version that introduced each feature. If the user wants to pick, present a shortlist and a recommended lead, then use their selections when they reply.
3. Edit the hero section identified by `whats-new-heading` in `app/page.tsx`. Give the lead a title, version, and short description. Give each supporting feature a title, version, and one sentence. Describe what users can do in your own words and verify each claim against the changelog.
4. Preserve the layout in `app/page.module.css`. On wide screens, the lead sits on the left and the two supporting features stack on the right. On narrow screens, all three stack with the lead first. Preserve the borderless treatment and keep versions near their feature titles.
5. Run `npm run lint` and `npm run typecheck`. Start the local preview with `npm run dev` and check the landing page at wide and narrow widths. Share the local URL when the user asks to preview before a PR. Open a PR only when requested.
