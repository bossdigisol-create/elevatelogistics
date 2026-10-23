# Connecting the Elevate Logistics contact form to the Microsoft 365 email

This explains how the website's contact form sends and receives email through
Stephanie's Microsoft 365 mailbox **without anyone sharing her login password**.

- **What visitors see on the website:** `info@elevatelogisticsolutions.com`
- **Where every inquiry is delivered:** `stephanie@elevatelogisticsolutions.com`
- **How it's secured:** a Microsoft "app registration" that is allowed to do
  one thing only — send mail — and can be switched off at any time. It does
  **not** expose the mailbox password and does **not** give access to read the
  inbox.

There are two parts:

- **Part A — for Stephanie (the business owner).** Done once inside Microsoft.
  This is the guide you forward to her.
- **Part B — for the developer.** The values you then paste into Vercel.

---

## Part A — Guide for Stephanie (≈ 7 minutes, done once)

> You will do this inside the Microsoft admin website. You need to be signed in
> with the Microsoft 365 account that owns the business (the "admin" account).
> You will **never type your password into the website** — you'll only create a
> special, limited key and send three codes to your web developer.

> **Before you start, open a blank Notes / Notepad window.** During the next
> steps three values will appear on screen. You'll paste each one into your
> notes the moment it appears, with its label, then send all three to your
> developer at the end. Here's the collection sheet — keep it handy:
>
> ```
> Value 1 — Directory (tenant) ID : ____________________________
> Value 2 — Application (client) ID: ____________________________
> Value 3 — Client secret Value    : ____________________________
> ```
>
> Values 1 and 2 are long codes that look like
> `1a2b3c4d-5e6f-7g8h-9i0j-klmnopqrstuv` (letters/numbers with dashes).
> Value 3 is a longer mix of random letters, numbers and symbols.

### Step 1 — Create the "app registration" (the secure connector)

1. Go to **https://entra.microsoft.com** and sign in with the same admin account.
2. In the left menu, click **Identity → Applications → App registrations**.
3. Click **+ New registration** at the top.
4. **Name:** type `Elevate Website Contact Form` (any name is fine).
5. Leave **Supported account types** on the default
   ("Accounts in this organizational directory only").
6. Leave **Redirect URI** empty.
7. Click **Register**.

### Step 2 — 📋 Copy Value 1 and Value 2 (do this now)

Registering lands you on the app's **Overview** page. Near the top you'll see a
box titled **"Essentials"** with two lines:

- **Directory (tenant) ID** → click the copy icon next to it and paste it into
  your notes as **Value 1**.
- **Application (client) ID** → click the copy icon next to it and paste it into
  your notes as **Value 2**.

> Both are on this one page. If you ever need them again, they're always here on
> the Overview page — they don't expire. Now leave this page open and continue.

### Step 3 — Give it permission to send mail (only that)

1. On the left of that same app, click **API permissions**.
2. Click **+ Add a permission** → choose **Microsoft Graph**.
3. Choose **Application permissions** (not "Delegated").
4. In the search box type `Mail.Send`, tick **Mail.Send**, then click
   **Add permissions**.
5. Back on the API permissions list, click the button
   **Grant admin consent for \<your company\>** and confirm **Yes**.
   - The Mail.Send row should now show a green check that says "Granted".

### Step 4 — Create the secret key, then 📋 Copy Value 3 (immediately)

1. On the left, click **Certificates & secrets**.
2. Under the **Client secrets** tab, click **+ New client secret**.
3. **Description:** `Elevate website`. **Expires:** choose **24 months**.
4. Click **Add**.
5. A new row appears. It has two columns — **Value** and **Secret ID**. You
   want the **Value** column (the longer code on the left).
6. Click the copy icon under **Value** and paste it into your notes as
   **Value 3**.

> ⚠️ **Do this before clicking anywhere else or leaving the page.** The secret
> **Value** is shown only once. If you navigate away it is hidden forever and
> you'd have to delete this secret and make a new one (repeat Step 4). The
> "Secret ID" is *not* what we need — ignore it.

### Step 5 — Send the three values to your developer

Your notes should now look like this (real values, not blanks):

```
Value 1 — Directory (tenant) ID : 1a2b3c4d-5e6f-7g8h-9i0j-klmnopqrstuv
Value 2 — Application (client) ID: 9z8y7x6w-5v4u-3t2s-1r0q-ponmlkjihgfe
Value 3 — Client secret Value    : Ab3~qW9.kL2_mN8xZ...
```

Send all three to your developer (email or message is fine), and confirm:

- The sending mailbox is **stephanie@elevatelogisticsolutions.com**
- The **info@** alias is already set up ✅

**You're done.** You never shared your password, and you can revoke this at any
time by deleting the app registration or the secret.

#### Which value goes where (for your developer's reference)

| In your notes | Developer pastes it into Vercel as |
|---|---|
| Value 1 — Directory (tenant) ID | `MS_TENANT_ID` |
| Value 2 — Application (client) ID | `MS_CLIENT_ID` |
| Value 3 — Client secret Value | `MS_CLIENT_SECRET` |

> **Reminder for later:** the secret you chose expires in 24 months. Shortly
> before then, repeat Step 4 (create a fresh secret) and send the new Value to
> your developer so the contact form keeps working.

---

## Part B — Developer: set these in Vercel

In the Vercel project → **Settings → Environment Variables**, add the following
for the **Production** (and Preview) environments, then **redeploy**.

| Variable | Value |
|---|---|
| `MS_TENANT_ID` | Directory (tenant) ID from Stephanie |
| `MS_CLIENT_ID` | Application (client) ID from Stephanie |
| `MS_CLIENT_SECRET` | Client secret **Value** from Stephanie |
| `MAIL_SENDER_UPN` | `stephanie@elevatelogisticsolutions.com` |
| `MAIL_TO` | `stephanie@elevatelogisticsolutions.com` |
| `MAIL_FROM` | `info@elevatelogisticsolutions.com` |

Notes:

- `MAIL_SENDER_UPN` is the real licensed mailbox Graph authenticates against.
- `MAIL_FROM` is the address recipients see. It only works because `info@` was
  added as an alias of that mailbox (Part A, Step 1). If the alias isn't set,
  leave `MAIL_FROM` blank and mail will send from `stephanie@` instead.
- `MAIL_TO` is where inquiries are delivered. Because `info@` is an alias of the
  same inbox, you can set this to either address.
- Once these are present, the app automatically uses Microsoft Graph. The old
  SMTP variables (`SMTP_USER` / `SMTP_PASS`) are ignored and can be removed.

### How delivery works

- **Visitor submits the form** → an inquiry email is sent **to**
  `stephanie@` (shown as from `info@`), with **Reply-To** set to the visitor,
  so Stephanie can reply straight from her inbox.
- **The visitor** also receives a branded "thank you" confirmation from `info@`.

### Quick test after deploying

1. Submit the live contact form with your own email in the "Email" field.
2. Confirm the inquiry lands in Stephanie's inbox and the confirmation lands in
   yours.
3. If nothing arrives, check **Vercel → Deployment → Functions logs** for a line
   starting with `Contact form:` — it will name the exact Graph error.

### Fallback (only if the client can't do the Azure steps)

The code still supports SMTP. If Microsoft 365 SMTP AUTH is enabled on the
mailbox and an **app password** is generated, you can instead set
`SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, `SMTP_USER=stephanie@...`,
`SMTP_PASS=<app password>` and leave the `MS_*` variables unset. The Graph method
above is preferred — it's more secure and keeps working as Microsoft retires
basic authentication.
