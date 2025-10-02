<!-- omit in toc -->
# Contributing to First Accord

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
  - [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)


## Code of Conduct

This project and everyone participating in it is governed by the
[First Accord Code of Conduct](https://github.com/STICKnoLOGIC/First-Accord/blob//CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to <bot@STICKnoLOGIC.is-a.dev>.


## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](https://First-Accord.is-a.dev/docs).

Before you ask a question, it is best to search for existing [Issues](https://github.com/STICKnoLOGIC/First-Accord/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/STICKnoLOGIC/First-Accord/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

<!--
You might want to create a separate issue tag for questions and include it in this description. People should then tag their issues accordingly.

Depending on how large the project is, you may want to outsource the questioning, e.g. to Stack Overflow or Gitter. You may add additional contact and information possibilities:
- IRC
- Slack
- Gitter
- Stack Overflow tag
- Blog
- FAQ
- Roadmap
- E-Mail List
- Forum
-->

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project licence.

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](https://First-Accord.is-a.dev). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/STICKnoLOGIC/First-Accord/issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <bot@STICKnoLOGIC.is-a.dev>.
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/STICKnoLOGIC/First-Accord/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

<!-- You might want to create an issue template for bugs and errors that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for First Accord, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://First-Accord.is-a.dev) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/STICKnoLOGIC/First-Accord/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/STICKnoLOGIC/First-Accord/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots or screen recordings** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [LICEcap](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and the built-in [screen recorder in GNOME](https://help.gnome.org/users/gnome-help/stable/screen-shot-record.html.en) or [SimpleScreenRecorder](https://github.com/MaartenBaert/ssr) on Linux.
- **Explain why this enhancement would be useful** to most First Accord users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

<!-- You might want to create an issue template for enhancement suggestions that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Your First Code Contribution

Welcome to your first code contribution! 🎉 This section will guide you through setting up your development environment and making your first contribution to First Accord.

#### Environment Setup

**Prerequisites:**
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/downloads)
- A [GitHub account](https://github.com/join)

**Verify your installation:**
```bash
node --version
npm --version
git --version
```

#### IDE Recommendations

We recommend using one of these editors for the best development experience:

- **[Visual Studio Code](https://code.visualstudio.com/)** (Recommended)
  - Install the "Live Server" extension for local development
  - Install the "HTML CSS Support" extension
  - Install the "JavaScript (ES6) code snippets" extension

- **[WebStorm](https://www.jetbrains.com/webstorm/)** (Professional option)
- **[Sublime Text](https://www.sublimetext.com/)** (Lightweight option)

#### Getting Started Workflow

**Step 1: Fork the Repository**
1. Go to the [First-Accord repository](https://github.com/STICKnoLOGIC/First-Accord)
2. Click the "Fork" button in the top-right corner
3. This creates your own copy of the repository

**Step 2: Clone Your Fork**
```bash
git clone https://github.com/YOUR-USERNAME/First-Accord.git
cd First-Accord
```

**Step 3: Set Up Remote**
```bash
git remote add upstream https://github.com/STICKnoLOGIC/First-Accord.git
git remote -v  # Verify remotes are set correctly
```

**Step 4: Install Dependencies**
```bash
npm install
```

**Step 5: Create a New Branch**
```bash
git checkout -b your-feature-branch-name
# Example: git checkout -b fix-typo-in-readme
```

**Step 6: Make Your Changes**
- Edit the files you need to change
- Test your changes locally by opening `index.html` in your browser
- Run tests to ensure everything works: `npm test`

**Step 7: Commit Your Changes**
```bash
git add .
git commit -m "Your descriptive commit message"
```

**Step 8: Push and Create Pull Request**
```bash
git push origin your-feature-branch-name
```
Then go to your fork on GitHub and click "Compare & pull request"

#### First-Time Contributor Tips

- Start with small changes like fixing typos or updating documentation
- Read existing code to understand the project structure
- Don't hesitate to ask questions in issues or discussions
- Check out our [documentation](https://first-accord.js.org/docs) for detailed guides
- Look for issues labeled `good first issue` or `beginner-friendly`

### Improving The Documentation

Documentation is crucial for helping newcomers understand and contribute to the project. We welcome all kinds of documentation improvements!

#### Types of Documentation Contributions

**Website Documentation:**
- Main documentation site: [first-accord.js.org/docs](https://first-accord.js.org/docs)
- Source repository: [First-Accord-Docs](https://github.com/STICKnoLOGIC/First-Accord-Docs)
- Powered by [Docsify](https://docsify.js.org/)

**In-Repository Documentation:**
- README.md improvements
- Code comments and inline documentation
- This CONTRIBUTING.md file
- Issue and PR templates

#### How to Contribute to Documentation

**For Website Documentation:**
1. Visit the [First-Accord-Docs repository](https://github.com/STICKnoLOGIC/First-Accord-Docs)
2. Follow the same fork → clone → branch → edit → commit → push → PR workflow
3. Documentation files are written in Markdown (.md format)

**For In-Repository Documentation:**
1. Use the standard contribution workflow described above
2. Focus on clarity and beginner-friendliness
3. Include examples where helpful

#### Documentation Standards

**Writing Style:**
- Use clear, simple language
- Write for beginners - assume no prior knowledge
- Use active voice where possible
- Break up long paragraphs into smaller sections
- Include code examples with proper syntax highlighting

**Formatting Guidelines:**
- Use proper Markdown syntax
- Include descriptive headings (H1, H2, H3, etc.)
- Use code blocks for terminal commands: \`\`\`bash
- Use inline code for file names: \`filename.js\`
- Include screenshots for UI-related instructions

**Content Guidelines:**
- Keep information up-to-date
- Test all code examples and commands
- Include links to external resources when helpful
- Explain "why" in addition to "how"

#### Translation and Localization

We welcome documentation translations! Currently supported languages:
- English (primary)
- Open to additional languages based on community demand

**To contribute translations:**
1. Check the [First-Accord-Docs repository](https://github.com/STICKnoLOGIC/First-Accord-Docs) for existing translations
2. Create an issue proposing a new language
3. Follow the established folder structure for translations
4. Maintain consistency with the English version's structure

#### Documentation Review Process

1. All documentation changes go through the same PR review process
2. Maintainers will check for:
   - Accuracy of information
   - Clarity and readability
   - Consistency with existing style
   - Proper formatting and links

#### Quick Documentation Fixes

For small fixes like typos or broken links:
1. You can edit directly on GitHub using the web interface
2. Click the pencil icon on any file
3. Make your changes and propose them via PR
4. This is perfect for quick contributions!

## Styleguides
### Commit Messages

Good commit messages help maintainers and other contributors understand the history and evolution of the project. We follow a structured approach to commit messages.

#### Commit Message Format

We use a simplified version of [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

- **feat**: A new feature for the user
- **fix**: A bug fix for the user
- **docs**: Changes to documentation only
- **style**: Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

#### Examples of Good Commit Messages

```bash
# Adding a new feature
feat: add dark mode toggle to main navigation

# Fixing a bug
fix: resolve contributor avatar loading issue on mobile devices

# Documentation changes
docs: update README with new contribution guidelines

# Code formatting
style: fix indentation in main CSS file

# Refactoring existing code
refactor: simplify contributor validation logic

# Adding or updating tests
test: add validation tests for contributor JSON files

# Build or tooling changes
chore: update npm dependencies to latest versions
```

#### Commit Message Guidelines

**Do:**
- Use the imperative mood ("add" not "added" or "adds")
- Keep the first line under 50 characters when possible
- Capitalize the first letter of the description
- Don't end the subject line with a period
- Use the body to explain "what" and "why" vs. "how"
- Reference issues and pull requests when relevant

**Don't:**
- Use vague descriptions like "fix stuff" or "update code"
- Include multiple unrelated changes in one commit
- Use all caps or excessive punctuation

#### Examples of What NOT to Do

```bash
# Too vague
fix: bug

# Multiple unrelated changes
feat: add new feature and fix typo and update dependencies

# Wrong mood/tense
fixed: the contributor validation

# Too long subject line
feat: add a really comprehensive dark mode toggle feature that works across all pages and remembers user preference
```

#### Linking to Issues

When your commit relates to a GitHub issue, include it in the commit message:

```bash
fix: resolve mobile responsive layout issues

Closes #123
Fixes #456
Resolves #789
```

#### Breaking Changes

If your commit introduces breaking changes, include "BREAKING CHANGE:" in the footer:

```bash
feat: update contributor JSON schema

BREAKING CHANGE: contributor files now require 'description' field
```

## Join The Project Team

Interested in taking a more active role in the First Accord project? We're always looking for dedicated contributors to join our team! 🌟

#### Current Team Structure

**Project Maintainer:**
- [@STICKnoLOGIC](https://github.com/STICKnoLOGIC) - Project founder and lead maintainer

**Core Contributors:**
Active community members who regularly contribute code, review PRs, and help with project direction.

**Community Moderators:**
Help manage discussions, issues, and maintain a welcoming environment for newcomers.

#### Ways to Get More Involved

**1. Become a Regular Contributor**
- Make consistent, quality contributions over time
- Help review and test pull requests from other contributors
- Participate actively in discussions and issues
- Mentor new contributors and help them get started

**2. Specialized Roles**

**Documentation Lead:**
- Maintain and improve project documentation
- Help with translation efforts
- Ensure documentation stays current with code changes

**Community Manager:**
- Help newcomers in issues and discussions
- Moderate community interactions
- Organize community events or initiatives

**Quality Assurance:**
- Test new features and bug fixes
- Improve and maintain test coverage
- Help establish testing best practices

**Design Contributor:**
- Improve UI/UX of the project website
- Create graphics, logos, or promotional materials
- Help with accessibility improvements

#### Path to Core Team Membership

**Requirements:**
- Demonstrate consistent, high-quality contributions over 2-3 months
- Show good understanding of project goals and values
- Positive interactions with community members
- Reliability in completing commitments
- Alignment with project's beginner-friendly philosophy

**Benefits of Team Membership:**
- Direct push access to repositories (with guidelines)
- Ability to review and merge pull requests
- Input on project direction and major decisions
- Access to maintainer discussions and planning
- Recognition as a core team member

#### How to Express Interest

**Step 1: Build Your Track Record**
- Start contributing regularly to the project
- Help other contributors with their questions
- Participate in project discussions

**Step 2: Reach Out**
- Open a [discussion](https://github.com/STICKnoLOGIC/First-Accord/discussions) explaining your interest
- Mention your contributions and how you'd like to help
- Be specific about the role(s) that interest you

**Step 3: Evaluation Process**
- Current maintainers will review your contributions
- We may have a brief discussion about expectations
- Trial period with specific responsibilities
- Final decision and onboarding

#### Team Member Responsibilities

**All Team Members:**
- Maintain the welcoming, beginner-friendly atmosphere
- Follow and enforce the [Code of Conduct](/CODE_OF_CONDUCT.md)
- Participate in major project decisions
- Help onboard new contributors

**Code Review Guidelines:**
- Focus on helping contributors improve their skills
- Provide constructive, encouraging feedback
- Ensure changes align with project goals
- Test functionality when possible

**Communication:**
- Be responsive to mentions and requests
- Communicate clearly about availability
- Participate in team discussions and planning

#### Contact Information

Questions about joining the team?
- Open a [discussion](https://github.com/STICKnoLOGIC/First-Accord/discussions)
- Email: <bot@STICKnoLOGIC.is-a.dev>
- Mention current team members in relevant issues

We're excited to grow our team with passionate contributors who share our mission of making open source accessible to everyone! 🚀

<!-- omit in toc -->
## Attribution
This guide is based on the [contributing.md](https://contributing.md/generator)!
