> **The product has been renamed Keel. The domain is designwithkeel.com.**
> Where this brief says "Raft" or "Raft Brand Hub," read "Keel." (Raft Design
> is the company behind Keel, not the product name.) The rest of this file is
> unchanged from the original brief.

---

# Raft Brand Hub MVP

## Brief for Claude and Claude Code planning

### Why you are receiving this brief

I am Lance Shields, a product and brand design leader building the first version of this product as a solo founder. I can direct the product, experience, visual design, and brand work. I am not an experienced software engineer.

I plan to use Figma Make to develop and refine the wireframes, then use Claude to help me translate the approved experience into clear prompts for Claude Code.

Your role is to act as my technical product partner. Help me make sound architecture decisions, identify risks I may not see, and break the build into small steps that Claude Code can complete and verify. Explain consequential decisions in plain language.

Do not assume I need to hire an engineering team before testing the product. Also do not hide real technical or security risks. Tell me when a short review by an experienced engineer would be prudent.

## Product in one sentence

Raft turns a company's existing website and brand materials into a living brand guide that the company can improve with an AI assistant and share with employees, contractors, and partners.

## The customer problem

Startups and small companies often have a website, logo, presentation, and scattered brand files, but no useful source of truth. Their employees and outside partners make inconsistent decisions. Generative AI makes this worse because every tool needs reliable brand context.

Traditional brand guidelines are expensive to create, become outdated, and are usually passive documents. Raft should create the first version for the company, keep it editable, and help people apply it.

## MVP hypothesis

A founder, marketer, or designer will give Raft a company name and website URL. Raft will scan the public site and produce a credible first draft of the brand. The user will correct and improve it with an assistant, add approved assets, and publish a free public guide.

The first product test is whether users trust the draft enough to edit it, publish it, share it, and return to the assistant.

## First-release user flow

1. User lands on a simple Raft splash page.
2. User enters a company name and website URL.
3. Raft scans the website.
4. Raft shows what it found, including the logo, company description, colors, typography, and suggested brand character.
5. User confirms or corrects the findings.
6. User creates an account to save the result.
7. User enters a private brand workspace.
8. User reviews generated sections and talks to the persistent assistant.
9. User can apply an assistant suggestion to a specific brand field.
10. User uploads or confirms a primary logo.
11. User previews and publishes a free public brand guide.
12. Anyone can view the public guide without an account.
13. A public visitor can ask the read-only assistant a basic question about the brand.

## Private workspace

The private workspace should contain only these areas:

- Overview
- Brand foundation
- Visual identity
- Voice
- Assets
- Brand guide
- Persistent assistant

The overview shows completion, suggested next actions, section status, and a preview of the public guide.

Generated content should be stored as structured fields, not only as a long Markdown document. The owner can edit a field directly or ask the assistant to improve it. The assistant must show a proposed change and wait for confirmation before applying it.

## Public brand guide

The public guide is the shareable output of the product. It should feel like a polished company resource rather than an application dashboard.

It includes:

- Company overview
- Brand foundation
- Voice guidance
- Logos
- Colors
- Typography
- Approved assets
- Last updated date
- `Created with Raft` credit
- Read-only `Ask the brand` assistant

No account is required to view the public guide. Unfinished or unpublished sections must not appear.

## Account and access assumptions

For the MVP:

- A person can start a scan without an account.
- They create an account after seeing initial findings and before saving the workspace.
- Each account manages one brand.
- The owner is the only editor.
- The public guide requires no login.
- Private guides, multiple editors, team roles, and detailed permissions are out of scope.

Pricing and payment are also out of scope. We will validate the core experience before implementing subscriptions.

## Assistant behavior

There are two assistant contexts.

### Owner assistant

The owner assistant appears persistently on the right side of the private workspace. It can:

- Explain what Raft found
- Suggest improvements
- Ask for missing context
- Draft revised brand content
- Suggest the next useful task
- Reference uploaded materials
- Propose a structured change

It cannot silently modify the brand. Any change must be shown to the user with an explicit `Apply change` action.

### Public assistant

The public assistant is available from the published guide. It can:

- Answer questions using only published brand information
- Recommend the correct logo, color, or voice guidance
- Produce a small amount of on-brand text

It cannot access draft content, private source material, owner conversations, or account data. It cannot modify the brand.

Limit public usage and add basic rate protection so one public guide cannot create unlimited model expense.

## Source ingestion

The first version should accept:

- One public website URL
- Uploaded logo files
- Uploaded images
- PDFs and basic brand documents if this can be added without delaying the first test
- A pasted reference link that is stored for later use

Website scanning should collect only what is needed for the first brand draft:

- Page titles and relevant text
- Company description and positioning language
- Logo candidates
- Common colors
- Detected font information when available
- Selected imagery
- Source URLs for traceability

Avoid building a broad web crawler. Set reasonable limits on pages, file sizes, execution time, retries, and model usage.

## Structured brand record

Design a simple schema that can evolve later. The first record should support:

- Company name
- Website URL
- Short description
- Who the company serves
- What the company helps customers do
- Brand character attributes
- Voice principles
- Voice examples
- Words or patterns to avoid
- Primary and secondary colors
- Heading and body typography
- Logo assets and usage labels
- Other approved assets
- Source references
- Draft or published state for each section
- Public guide slug
- Last updated date

Store evidence or source references with generated material when practical. The product should be able to explain where an initial claim came from.

## Explicitly out of scope

Do not design or build these features in the MVP:

- Product design systems
- Design tokens or component libraries
- Code or repository analysis
- Figma, Canva, Adobe, or other third-party integrations
- Agency client management
- Multiple brands per account
- Multiple editors or complex permissions
- Approval workflows
- Enterprise administration
- Custom domains
- Payments or subscriptions
- Campaign generation
- Template editors
- Analytics dashboards
- Comments or notifications
- Full content-management-system functionality
- Native mobile applications

Do not add features simply because they are common in SaaS products.

## Technical priorities

The product should be:

- Owned in a normal GitHub repository
- Deployable without dependence on a visual app builder
- Built with common, well-supported technology
- Reasonably portable between hosting providers
- Secure enough to hold client brand assets and private drafts
- Instrumented so model usage and job failures can be understood
- Simple enough for a solo founder to maintain during beta

Prefer a small number of services. Avoid premature microservices, custom infrastructure, or a complex multi-agent system.

## Initial technical direction to evaluate

This is a starting point, not a mandate. Recommend changes if a simpler or safer choice exists.

- Next.js with TypeScript
- A straightforward component system such as Tailwind CSS and shadcn/ui
- GitHub for source control
- Vercel or a similarly simple web host
- Supabase Postgres for the database
- Supabase Auth for account creation
- Supabase Storage for uploaded files
- Row Level Security for account isolation
- A durable background-job service for scanning and generation
- Anthropic API for the owner and public assistants
- A model-provider adapter so another model can be added later
- A constrained website extraction service or crawler
- Basic error monitoring and product analytics

Clarify whether a separate background-job service is required for the first beta or whether a simpler hosted function can safely support the initial scan. Do not choose the simpler option if it is likely to time out or lose work.

## Proposed minimum data objects

- **User:** account identity
- **Brand:** company name, website, status, owner, and public slug
- **Source:** scanned website page or uploaded material
- **BrandProfile:** structured brand fields and their publication state
- **Asset:** file, type, label, source, and public/private status
- **Guide:** publication status and visible sections
- **Conversation:** owner-assistant thread
- **ProposedChange:** assistant-generated edit awaiting approval
- **Job:** website scan or generation status, errors, and usage

Recommend whether these should be separate tables or simplified for the first build.

## Security and safety requirements

Treat these as product requirements, not future cleanup:

- A user must never be able to access another company's private workspace or files.
- Public guide endpoints must return only published data.
- The public assistant must retrieve only published brand information.
- Uploaded files need file-type and size restrictions.
- Website scanning must defend against server-side request forgery and access to private network addresses.
- Scanned web content and uploaded documents must be treated as untrusted input.
- Prompt injection in a scanned page must not be able to change application instructions or expose data.
- Secrets must stay in environment variables and never enter the repository.
- Destructive assistant actions require confirmation.
- Expensive operations need rate limits and usage tracking.
- Logs must not expose passwords, tokens, or unnecessary private content.

Tell me where an experienced engineer should review the implementation before outside customers use it.

## How I want Claude to help

Start by reviewing this brief and the approved Figma wireframes. Then provide the following in plain language:

1. Any product behavior that remains technically ambiguous.
2. A recommended MVP architecture and the reason for each major choice.
3. The simplest secure database model.
4. The website-scanning and generation pipeline.
5. How the private and public assistants should retrieve context safely.
6. A milestone plan that produces usable software at the end of each stage.
7. Risks that could make the build unexpectedly expensive or unreliable.
8. The points where I should get an engineering or security review.

After we agree on the plan, generate one Claude Code prompt at a time. Do not give me a single enormous prompt for the entire application.

## Instructions for creating Claude Code prompts

Each prompt should:

- State the milestone and user-visible outcome.
- Tell Claude Code to inspect the existing repository before making changes.
- Refer to the product brief and wireframes as the source of truth.
- Define what is in scope and out of scope for that milestone.
- Name the relevant routes, components, data objects, and services.
- Include accessibility, responsive behavior, loading, empty, and error states where relevant.
- Require schema migrations and security policies to be explicit.
- Require tests for important behavior.
- Ask Claude Code to run formatting, type checks, tests, and the production build.
- Ask for a concise summary of files changed, decisions made, verification completed, and remaining risks.
- Stop for confirmation before a new service, major dependency, or irreversible migration is introduced.

Do not instruct Claude Code to rewrite unrelated files, disable tests, weaken security, or replace working architecture without explaining the need.

## Suggested build milestones

Review and adjust these before generating implementation prompts.

### Milestone 0: Repository and working agreement

- Initialize or inspect the repository.
- Add the product brief, architecture notes, and progress document.
- Establish coding conventions, environment-variable handling, and a basic test setup.
- Create a minimal deployable application shell.

### Milestone 1: Clickable application shell

- Implement the splash page, URL entry, simulated scan state, findings review, workspace shell, and public guide using seeded data.
- Match the approved Figma structure.
- Do not connect AI or a crawler yet.
- Confirm responsive behavior and accessibility.

### Milestone 2: Authentication and brand persistence

- Add account creation after the findings screen.
- Create one brand per account.
- Save and edit structured brand fields.
- Enforce account isolation.

### Milestone 3: Website scanning job

- Submit a URL safely.
- Run a constrained background job.
- Store job progress and errors.
- Extract a small set of useful website content and asset candidates.
- Show real progress and failure states.

### Milestone 4: Structured AI generation

- Convert extracted material into a validated structured brand draft.
- Store source references.
- Make generation repeatable and observable.
- Track model usage and failures.

### Milestone 5: Owner assistant and proposed changes

- Add the persistent assistant conversation.
- Ground responses in the current brand record and allowed source material.
- Let the assistant return a structured proposed change.
- Require the owner to approve before applying it.

### Milestone 6: Assets

- Upload and label a small number of approved asset types.
- Apply file-size and type limits.
- Separate public and private access.
- Display selected assets in the private workspace.

### Milestone 7: Publish and public guide

- Publish approved fields to a public slug.
- Guarantee that draft data cannot leak through the public route.
- Show logos, colors, type, voice, and downloadable public assets.
- Add last-updated information and Raft credit.

### Milestone 8: Public assistant and beta hardening

- Answer questions using published information only.
- Add rate limits and a small usage allowance.
- Add error monitoring, basic analytics, abuse controls, and operational documentation.
- Complete an outside engineering and security review before broader beta use.

## Expected working process

Maintain these documents in the repository:

- `/docs/product-brief.md`
- `/docs/architecture.md`
- `/docs/progress.md`
- `/docs/decisions/` for consequential technical decisions

At the end of each milestone:

1. Run the available automated checks.
2. Show me how to test the result manually.
3. Update the progress document.
4. List known limitations.
5. Wait for approval before beginning the next milestone.

If the wireframes conflict with security, accessibility, or technical reality, explain the conflict and recommend the smallest product change. Do not silently reinterpret the design.

## First request to Claude

Use the brief above and the attached Figma wireframes as the source of truth. Do not write implementation code yet.

Act as a technical product partner to a design-led solo founder. Review the proposed MVP and give me:

1. The product or technical decisions that still need to be made before implementation.
2. Your recommended architecture in plain language.
3. Any changes you recommend to the proposed data objects and milestones.
4. The five largest technical, security, or cost risks.
5. A complete Claude Code prompt for Milestone 0 only.

Keep the plan focused on getting a real private beta working. Avoid infrastructure or features that are not needed to test the core product.
