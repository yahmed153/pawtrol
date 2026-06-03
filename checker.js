let BLOCK_SET;

export async function loadData() {
  try {
    const r = await fetch(chrome.runtime.getURL("data/hosts"));
    const text = await r.text();
    BLOCK_SET = new Set(
      text
        .split("\n")
        .map((s) => s.toLowerCase().trim())
        .filter(Boolean),
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function extractHostname(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

export async function checkUrl(url) {
  const hostname = extractHostname(url);

  if (BLOCK_SET.has(hostname)) {
    return { safe: false, reason: "blocklist", hostname };
  } else {
    return { safe: true, reason: "allowlist", hostname };
  }
}
