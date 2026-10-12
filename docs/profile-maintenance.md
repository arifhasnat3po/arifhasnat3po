# Keeping this profile current

The profile is a README, four local SVGs, and small Node scripts. No npm dependencies or personal access tokens are required.

- Edit project descriptions and the lab drawers directly in `README.md`.
- Keep the `PROFILE-SNAPSHOT` start/end comments. The updater replaces only the content between those comments; the rest of the README stays intact.
- Run `node scripts/update-profile.mjs` to refresh the public repository summary and light/dark SVG cards. A GitHub API error fails the refresh instead of publishing empty statistics.
- Run `node scripts/build-workbench.mjs` after editing the custom workbench artwork. The static variant is used for reduced-motion preferences.
- Run `node --test scripts/profile-data.test.mjs` and `node scripts/check-profile.mjs` before publishing.

GitHub Actions validates pushes and pull requests. On `main`, a weekly schedule or the **Run workflow** button refreshes the snapshot with the repository's built-in `GITHUB_TOKEN`. It commits only the README and the two generated snapshot SVGs, only when they change. The token is not saved in files and does not need access to private repositories.

The counts come from original public repositories. Forks and private repositories are excluded. Primary-language counts describe the repositories, not skill levels. The recent-project list excludes this profile, the snake automation, and archived repositories. The PixelPair release comes from its public releases endpoint. Snapshot dates use Asia/Dhaka; repository push dates are labeled UTC.

The existing banner, badges, icons, and contribution snake retain their original URLs. The new artwork is stored here so it does not depend on a third-party profile-card service.
