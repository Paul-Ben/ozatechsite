# Ozatech — Setup and Deployment

Everything you need to do, in order. Steps marked **you** require your accounts
or credentials and cannot be done for you.

---

## 1. Run it locally (5 minutes)

```bash
cd ~/code/ozatech/apps/web
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

If `npm install` or the dev server errors, paste the output back and I'll fix
it — I have no way to run these commands myself, so the first pass may need a
correction or two.

> **Commit the lockfile.** `npm install` creates `apps/web/package-lock.json`.
> CI runs `npm ci`, which requires it, so it must be committed — it is not in
> `.gitignore`.

Useful checks:

```bash
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint
npm run build       # production build — this is what Railway runs
```

---

## 2. Push to GitHub — **you**

### 2.1 Create the repository

Either on github.com (New repository → `ozatech`, **private**, no README), or
with the GitHub CLI if you have it installed and authenticated:

```bash
brew install gh          # if needed
gh auth login            # you authenticate — I never see the token
```

### 2.2 Push

```bash
cd ~/code/ozatech
git init
git add .
git commit -m "Initial commit: Next.js frontend from specification"
git branch -M main
git remote add origin https://github.com/<your-username>/ozatech.git
git push -u origin main
```

Or, with `gh` authenticated, replace the last three lines with:

```bash
gh repo create ozatech --private --source=. --push
```

> `.gitignore` already excludes `node_modules`, `.env*` and build output. Check
> `git status` before the first commit — nothing beginning with `.env` (other
> than `.env.example`) should be listed.

---

## 3. Set up Railway — **you**

### 3.1 Create the project

1. Sign in at <https://railway.app> (GitHub sign-in is easiest).
2. **New Project → Empty Project**, name it `ozatech`.
3. Inside it, **New → GitHub Repo → your `ozatech` repo**. Railway will ask for
   access to the repo.
4. Name the service **`web`** — the deploy workflow targets it by that exact name.

### 3.2 Configure the `web` service

In the service's **Settings**:

| Setting | Value |
|---|---|
| Root Directory | `apps/web` |
| Watch Paths | `apps/web/**` |
| Build Command | *(leave empty — `railway.json` provides it)* |
| Start Command | *(leave empty — `railway.json` provides it)* |

In **Variables**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | your Railway URL, e.g. `https://web-production-xxxx.up.railway.app` |
| `NODE_ENV` | `production` |

Then **Settings → Networking → Generate Domain** to get a public URL. Come back
and correct `NEXT_PUBLIC_SITE_URL` to match it.

At this point pushing to `main` already deploys, via Railway's own GitHub
integration. Step 4 replaces that with a CI-gated deploy.

### 3.3 Get a deploy token

**Project Settings → Tokens → Create Token**, scoped to this project. Copy it
once — it is not shown again.

---

## 4. Wire up GitHub Actions — **you**

Two workflows are already committed:

- `.github/workflows/ci.yml` — typecheck, lint and build on every PR and push.
- `.github/workflows/deploy.yml` — deploys to Railway **only after CI passes on
  `main`**.

### 4.1 Add the secret

Repo → **Settings → Secrets and variables → Actions**:

**Secrets** tab → *New repository secret*:

| Name | Value |
|---|---|
| `RAILWAY_TOKEN` | the project token from step 3.3 |

**Variables** tab → *New repository variable*:

| Name | Value |
|---|---|
| `PRODUCTION_DOMAIN` | your Railway domain, without `https://` |

### 4.2 Turn off Railway's own auto-deploy

Otherwise every push deploys twice — once from Railway's GitHub integration and
once from Actions, and the CI gate becomes meaningless.

Railway → `web` service → **Settings → Source → Disable automatic deploys**.

### 4.3 Create the `production` environment (optional but recommended)

Repo → **Settings → Environments → New environment → `production`**. Add a
required reviewer (yourself) if you want deploys to pause for approval.

### 4.4 Test it

```bash
git commit --allow-empty -m "Test deploy pipeline"
git push
```

Watch the **Actions** tab: `CI` runs, then `Deploy to Railway` runs. You can
also trigger `Deploy to Railway` manually from that tab (`Run workflow`).

---

## 5. Database and storage — all on Railway, needed for the backend (not yet)

Not required while the site is frontend-only. When the Laravel API is added,
everything stays inside the same Railway project — no second provider, no second
bill, no second dashboard.

### 5.1 PostgreSQL

In the `ozatech` project: **New → Database → Add PostgreSQL**. Railway
provisions it and exposes its connection details as project variables.

On the `api` service, add **one** variable:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_PRIVATE_URL}}` |

Type that literally, braces and all — it is a Railway *reference*, not a value
to paste. Railway resolves it at deploy time and keeps it correct if the
credentials rotate. A pasted literal silently goes stale.

**Use the `_PRIVATE_` variant.** `DATABASE_URL` (without `PRIVATE`) routes over
the public internet: slower, and billed as egress. The private one never leaves
the project.

### 5.2 Media storage — a volume, not a bucket

On the `api` service: **Settings → Volumes → Add Volume**, mount path
`/app/storage/app/public`. Set `FILESYSTEM_DISK=public`. Laravel's default
public disk then works unchanged.

> **One thing to know.** A Railway volume attaches to a single service and does
> not replicate, so `api` stays at one replica while it owns the volume. At this
> site's traffic that's irrelevant — but it's a real ceiling, and the volume is
> **not** covered by any database backup. It needs its own (§5.4).
>
> When you outgrow it — more than one `api` replica, or a few GB of imagery, or
> you want a CDN — move to Cloudflare R2. The `media` table already stores
> `disk`, `bucket` and `path`, so that's a file copy and a config change, not a
> migration.

### 5.3 Redis — skip it for now

The spec allows Redis, but `CACHE_STORE=database`, `SESSION_DRIVER=database` and
`QUEUE_CONNECTION=database` are genuinely fine at this scale. One fewer service
to run, pay for and monitor. Add **New → Database → Add Redis** when queue depth
or cache pressure actually says you need it.

### 5.4 Region and backups

- Put **every service in the same region**. Cross-region hops between app and
  database are the easiest self-inflicted latency problem, and Railway won't
  warn you.
- Railway's Postgres has no selective restore, so add a **cron service** that
  runs `pg_dump` nightly and `tar` of the volume weekly, shipping both to
  Cloudflare R2 or Backblaze B2. A backup inside the same provider as the data
  is not a backup.

Full variable list and the backup job are in `docs/09-deployment-railway.md`
§3 and §4 of the specification.

---

## 6. Custom domain — **you**, optional

1. Railway → `web` → **Settings → Networking → Custom Domain**, enter
   `ozatech.co.uk`.
2. Add the CNAME record Railway shows you at your registrar.
3. Add `www.ozatech.co.uk` too; the redirect to the apex is already in
   `next.config.ts`.
4. Update `NEXT_PUBLIC_SITE_URL` and `PRODUCTION_DOMAIN` to the real domain.

TLS is provisioned and renewed automatically.

---

## 7. Before this goes live

From `docs/09-deployment-railway.md` §7. The first three are hard gates:

- [ ] **Real contact email** replaces `info@ozatech.example` (`src/lib/site.ts`)
- [ ] **Real phone number** replaces `+0 000 000 000`
- [ ] **Consultation form tested end to end** — submit it, confirm the record and
      both emails arrive
- [ ] Real logo at `apps/web/public/logo.svg` (see `src/components/ui/Logo.tsx`)
- [ ] Open Graph image at `apps/web/public/og-default.png`, 1200×630
- [ ] Favicon set regenerated
- [ ] Placeholder portfolio items replaced or unpublished
- [ ] Leaked-brief audit passes (`docs/10-quality-and-testing.md` §5.1)
- [ ] Old GitHub Pages site redirected or taken down

---

## Summary: what only you can do

| # | Thing | Why |
|---|---|---|
| 1 | Create the GitHub repo | Needs your account |
| 2 | Create the Railway account and project | Needs your account and billing |
| 3 | Generate the Railway token and store it as a GitHub secret | It's a credential — you create and paste it, I never handle it |
| 4 | Add the Postgres plugin and volume in Railway | Needs your account |
| 5 | Run `npm install`, `git push` | I have no shell on your machine right now |
| 6 | Buy/point the domain | Needs registrar access |
| 7 | Supply real contact details | Only you know them |

Everything else — application code, configuration, workflows, migrations — is
written for you.
