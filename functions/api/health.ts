export const onRequestGet: PagesFunction = async () =>
  new Response(
    JSON.stringify({ status: 'ok', service: 'biselia-pages-functions', timestamp: new Date().toISOString() }),
    { headers: { 'Content-Type': 'application/json' } },
  );
