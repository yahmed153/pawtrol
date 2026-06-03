const params = new URLSearchParams(window.location.search);
const targetUrl = params.get("url");
const host = params.get("host") || "";

document.getElementById("host").textContent = host;

document.getElementById("btn-back").addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  } else {
    window.close();
  }
});

document.getElementById("btn-proceed").addEventListener("click", () => {
  if (targetUrl) {
    window.location.href = targetUrl.includes("?")
        ? `${targetUrl}&proceed=1`
        : `${targetUrl}?proceed=1`;
  }
});
