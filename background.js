import { checkUrl, loadData } from "./checker.js";

const WARNING_PAGE = chrome.runtime.getURL("warning.html");

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameType !== "outermost_frame") return;
  if (details.url === WARNING_PAGE) return;
  if (
    details.url.startsWith("chrome://") ||
    details.url.startsWith("chrome-extension://")
  )
    return;
  const isPaused = await chrome.storage.local.get("paused");
  if (isPaused.paused) return;

  await loadData();
  const result = await checkUrl(details.url);

  if (!result.safe) {
    const redirectUrl = `${WARNING_PAGE}?url=${encodeURIComponent(details.url)}&host=${encodeURIComponent(result.hostname)}`;
    chrome.tabs.update(details.tabId, { url: redirectUrl });
  }
});
