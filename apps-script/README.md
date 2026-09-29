# Photobooth receiver — setup

The Explorer Station photobooth sends its four-frame strip here, and this
script emails it to you with the image attached.

It runs on your own Google account. Free, no third-party service, no paid
tier. (EmailJS and Formspree both put file attachments behind paid plans,
which is why this route exists.)

## Four steps

1. **Create the script.** Go to <https://script.google.com> → **New project**.
   Delete the placeholder `myFunction`, paste in everything from
   `photobooth.gs`, and give the project a name.

2. **Authorise it.** Run `doGet` once from the editor toolbar. Google will
   warn that the script is unverified — that is expected for your own script.
   Choose **Advanced → Go to (project name)** and allow it. This is what
   grants permission to send mail as you.

3. **Deploy it.** **Deploy → New deployment → Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**

   "Anyone" is required — visitors are not signed in to Google. Copy the web
   app URL it gives you; it looks like
   `https://script.google.com/macros/s/AKfyc.../exec`.

4. **Paste the URL into the site.** Put it in
   `site/src/lib/photobooth.ts` as `PHOTOBOOTH_ENDPOINT`, then commit and
   push. The deploy workflow does the rest.

To check it worked, open the URL in a browser — it should reply
`photobooth receiver is running`.

## Things worth knowing

- **The URL is public.** It ships in the site's JavaScript bundle, so anyone
  who views source can find it and POST to it. The script caps payloads at
  5 MB and stops after 40 emails a day for that reason. If it is ever abused,
  **Deploy → Manage deployments → Archive** kills the URL instantly and the
  booth falls back to the mail-client handoff on its own.
- **Quota.** Consumer Gmail allows 100 recipients a day. The 40/day cap keeps
  the booth well inside it.
- **Changing the script later.** Edits do not go live until you deploy again:
  **Deploy → Manage deployments → edit → New version**.
- **Nothing is stored.** The strip is emailed and discarded; the script keeps
  only a per-day counter.

## If it fails

The booth shows "That didn't go through" and the visitor can still save the
strip and email it. Common causes:

- Deployed with **Who has access: Only myself** — visitors get a sign-in page
  instead of the script.
- Step 2 skipped, so the script was never authorised to send mail.
- Script edited but not redeployed as a new version.
