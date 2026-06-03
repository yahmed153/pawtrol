document.addEventListener("DOMContentLoaded", async () => {
  const result = await chrome.storage.local.get(["checkedCount", "blockedCount", "paused"]);
  document.getElementById("checked").textContent = result.checkedCount || 0;
  document.getElementById("blocked").textContent = result.blockedCount || 0;
  document.getElementById("pause-toggle").checked = result.paused === true;
});

document.getElementById("pause-toggle").addEventListener("change", async (e) => {
  await chrome.storage.local.set({ paused: e.target.checked });
});
