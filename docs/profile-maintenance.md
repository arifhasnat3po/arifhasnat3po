# Keeping this profile current

The profile is a README, an animated SVG cover, local SVG charts, and small Node scripts. No npm dependencies or personal access tokens are required in GitHub Actions.

- Edit project descriptions and the lab drawers directly in `README.md`.
- Keep the `PROFILE-SNAPSHOT` start/end comments. The updater replaces only the content between those comments; the rest of the README stays intact.
- Run `node scripts/update-profile.mjs` to refresh the public stats, language shares, and monthly commit chart. API errors or incomplete search results fail the refresh before writing files. Local unauthenticated runs are paced for GitHub's search limit; an existing `GITHUB_TOKEN` environment variable can also be used.
- Run `node scripts/build-workbench.mjs` after editing the custom workbench artwork. The static variant is used for reduced-motion preferences.
- Run `node scripts/build-cover.mjs` after editing the coding-orbit cover. It creates animated and static SVG variants; the README respects reduced-motion preferences.
- Run `node --test scripts/*.test.mjs` and `node scripts/check-profile.mjs` before publishing.

GitHub Actions validates pushes and pull requests. On `main`, a weekly schedule or the **Run workflow** button refreshes the dashboard with the repository's built-in `GITHUB_TOKEN`. It commits only the README and six generated chart SVGs, only when they change. The token is not saved in files and does not need access to private repositories.

Repository and star counts come from original public repositories. Forks and private repositories are excluded. The language chart sums [GitHub's language byte counts](https://docs.github.com/en/rest/repos/repos#list-repository-languages) across those repositories; the six largest languages are shown individually and the rest are grouped as Other. It describes checked-in code, not skill level, code authorship, or time spent. The separate primary-language count counts each repository's main language.

Public pull requests and issues count all authored items, whether open or closed. Monthly commits use `author:arifhasnat3po is:public committer-date:FROM..TO`. [GitHub commit search indexes default branches](https://docs.github.com/en/search-github/searching-on-github/searching-commits); it is different from the profile's contribution calendar. The chart spans 12 calendar months including the current partial month. The updater rejects incomplete search results rather than showing partial totals.

The recent-project list excludes this profile, the snake automation, and archived repositories. The PixelPair release comes from its public releases endpoint. Snapshot dates use Asia/Dhaka; commit windows and repository push dates use UTC. Charts include accessible descriptions and a text-table equivalent in the README.

The cover is a script-free SVG illustration: a waving robot astronaut, a floating laptop, orbiting planets, and moving packets. Its source is `scripts/build-cover.mjs`. The earlier illustrated cover remains available as `assets/profile-cover.png`. The existing badges, icons, and contribution snake retain their original URLs. All new graphics live in this repository.
