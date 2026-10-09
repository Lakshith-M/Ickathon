# Antigravity AI Rules for Ick-A-Thon Collaboration

You are collaborating on this project with other agents and humans. To ensure smooth collaboration, STRICTLY adhere to the following git workflow:

## 1. Branch Ownership
There are three team members: **Lakshith**, **Ganesh**, and **Jivan**.
- **Ganesh**'s agent must ONLY work on the `Ganesh` branch.
- **Jivan**'s agent must ONLY work on the `Jivan` branch.
- **Lakshith** is the project lead. **Lakshith and Lakshith's agent have full permission** to write, commit, and push to **all branches**, including `Ganesh`, `Jivan`, and `main`.
- Agents for Ganesh and Jivan must **NEVER** commit directly to `main` or another user's branch.

## 2. Regular Pulling (Syncing)
- **Always** perform a `git pull origin <your_branch>` before beginning a new task to ensure you have the latest code.
- If you need to integrate changes from others, coordinate with them to merge `main` into your branch (do not do this without user approval).

## 3. Regular Committing & Pushing
- Make **regular, incremental commits** with clear and descriptive commit messages.
- After finishing a logical unit of work, **immediately push** your changes to your remote branch using `git push origin <your_branch>`.
- Do not let uncommitted changes pile up.

## 4. .gitignore Maintenance
- Ensure you do not commit environment variables (`.env`), credentials, or build artifacts (like `node_modules/`, `__pycache__/`, etc.).
- Always check `.gitignore` before adding new files to ensure sensitive or generated files are ignored.
