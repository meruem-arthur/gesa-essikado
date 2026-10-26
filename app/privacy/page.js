import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Privacy Policy — GESA',
  description: 'How the GESA website and the GESA UMaT app handle your information.',
}

// The address shown on this page. Change it here if the contact person changes.
const CONTACT_EMAIL = 'petersafoarthur7@gmail.com'

function H2({ children }) {
  return <h2 className="font-head font-bold text-xl text-ink mt-12 mb-3">{children}</h2>
}
function P({ children }) {
  return <p className="text-muted leading-relaxed mb-4">{children}</p>
}
function UL({ children }) {
  return <ul className="list-disc pl-5 space-y-2 text-muted leading-relaxed mb-4">{children}</ul>
}
function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-goldLight hover:text-gold underline underline-offset-4">
      {CONTACT_EMAIL}
    </a>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How the GESA website and the GESA UMaT app handle your information. Last updated 26 October 2026."
      />

      <section className="section pt-16">
        <div className="container-gesa max-w-3xl">
          <div className="card-gesa p-6 md:p-7">
            <p className="font-head font-bold text-ink mb-3">The short version</p>
            <UL>
              <li>You don’t need an account for the app or the website, and we never ask for your name, email address or phone number.</li>
              <li>We don’t use advertising, analytics or tracking tools, and we don’t sell any data.</li>
              <li>The app doesn’t access your location, contacts, camera, microphone, photos or files.</li>
              <li>The few things we do store are listed below, with how to ask us to delete them.</li>
            </UL>
          </div>

          <H2>1. Who we are</H2>
          <P>
            This policy covers the GESA UMaT app and this website. Both are run by the Geomatic Engineering
            Students’ Association (“GESA”, “we”, “us”) at the University of Mines and Technology (UMaT),
            Essikado Campus, Tarkwa, Ghana. Contact us at <Mail />.
          </P>

          <H2>2. The app: what we collect</H2>
          <UL>
            <li>
              <strong className="text-ink">Notification token.</strong> A random code that identifies your phone to the push
              notification service, saved with the time. It is not linked to your name. We only collect it if you
              allow notifications, and we use it to send you GESA notifications such as exam reminders and announcements.
            </li>
            <li>
              <strong className="text-ink">Forum posts, replies and likes.</strong> The title, text and tag you write, and the
              time. Posts are anonymous, with no name or account attached, and everything you post is visible to all app users.
            </li>
            <li>
              <strong className="text-ink">Reports.</strong> The message you send, or the forum post or reply you flag. No name,
              email or device information is attached. Only GESA administrators can read reports, and we use them to fix
              problems and moderate the forum.
            </li>
            <li>
              <strong className="text-ink">Data kept on your phone.</strong> Saved copies of app content for offline use, study
              materials you download, forum posts you hide, and your light or dark theme choice. This stays on your
              phone and is not sent to us.
            </li>
          </UL>
          <P>
            Please don’t put personal details, such as your phone number, index number or anyone else’s private
            information, in forum posts, because everyone can see them.
          </P>

          <H2>3. The website: what we collect</H2>
          <P>
            The website doesn’t have accounts, forms or comment boxes, so it doesn’t collect anything you type. It
            shows content we manage in our database, and we don’t use advertising or analytics cookies.
          </P>
          <P>
            Like any website, when your browser loads a page it connects to our hosting provider and to the services
            below, which can see technical details such as your IP address and browser type. Fonts are loaded from
            Google Fonts. We don’t use this to identify you.
          </P>

          <H2>4. How we use information</H2>
          <P>
            Only to run the app and website: to show content, send notifications you have allowed, operate the
            forum, and respond to reports. We don’t use it for advertising, profiling or marketing, and we don’t sell
            or rent it.
          </P>

          <H2>5. Who we share it with</H2>
          <UL>
            <li><strong className="text-ink">Google Firebase</strong> stores our content, forum posts, reports and notification tokens.</li>
            <li><strong className="text-ink">Expo</strong>, with Google Firebase Cloud Messaging on Android and Apple’s notification service on iPhone, delivers notifications.</li>
            <li><strong className="text-ink">Cloudinary</strong> hosts the images and files we show, such as photos and lecture materials.</li>
            <li><strong className="text-ink">Google Fonts</strong> supplies the website’s typefaces.</li>
          </UL>
          <P>
            Some content links to other websites or apps, such as WhatsApp or Google Drive. Those are run by other
            people and have their own privacy policies. We may also share information if the law requires it.
          </P>

          <H2>6. How long we keep it</H2>
          <UL>
            <li>Forum posts and replies stay until a GESA administrator deletes them.</li>
            <li>Reports are kept until an administrator resolves and deletes them.</li>
            <li>Notification tokens are kept while your installation is active. We remove tokens that stop working, for example after you uninstall the app.</li>
            <li>Data on your phone stays until you clear the app’s storage or uninstall it.</li>
          </UL>

          <H2>7. Your choices and rights</H2>
          <UL>
            <li><strong className="text-ink">Notifications:</strong> you can turn them off at any time in your phone’s settings.</li>
            <li><strong className="text-ink">Forum content:</strong> you can hide any post or reply on your own phone, and flag content you think breaks the rules.</li>
            <li>
              <strong className="text-ink">Deletion and questions:</strong> email <Mail /> to ask what we hold or to have something
              removed. Because posts are anonymous we can’t tell which ones are yours, so tell us which post you mean and we will delete it.
            </li>
            <li><strong className="text-ink">Everything on your phone:</strong> uninstalling the app removes it.</li>
          </UL>
          <P>
            We handle personal data in line with Ghana’s Data Protection Act, 2012 (Act 843). You also have the right
            to complain to Ghana’s Data Protection Commission.
          </P>

          <H2>8. Security</H2>
          <P>
            Data is sent over encrypted connections, and only authorised GESA administrators can manage content, read
            reports and see notification tokens. No system is perfectly secure. If a data breach affects you, we will
            tell you as the law requires.
          </P>

          <H2>9. Children</H2>
          <P>
            The app and website are made for university students. They are not directed at children under 13, and we
            don’t knowingly collect information from them.
          </P>

          <H2>10. Changes to this policy</H2>
          <P>
            If we change this policy, we will update the date at the top of this page. If a change is significant, we
            will also tell you in the app.
          </P>
        </div>
      </section>
    </>
  )
}
