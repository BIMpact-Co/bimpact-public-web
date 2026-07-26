export default function AppShellPage() {
  return (
    <article className="card markdown">
      <h1>SaaS Shell Placeholder</h1>
      <p>
        This route is the future authenticated product shell. Keep auth and
        tenant logic here (or at app.bimpact.io), not in marketing pages.
      </p>
      <h2>Planned boundaries</h2>
      <ul>
        <li>www.bimpact.io: public marketing site (no login required)</li>
        <li>app.bimpact.io: authenticated product area</li>
        <li>Role model: owner, analyst, client-viewer</li>
      </ul>
    </article>
  );
}
