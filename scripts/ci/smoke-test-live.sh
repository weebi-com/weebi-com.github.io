#!/usr/bin/env bash
# Smoke-test the live custom domain after Pages deploy.
set -euo pipefail

BASE_URL="${1:-https://www.weebi.com}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-12}"
SLEEP_SECONDS="${SLEEP_SECONDS:-10}"

check_url() {
  local url="$1"
  local min_bytes="${2:-500}"
  local code size body
  body="$(mktemp)"
  code="$(curl -sS -o "${body}" -w "%{http_code}" -L --max-time 30 "${url}" || true)"
  size="$(wc -c < "${body}" | tr -d ' ')"
  if [[ "${code}" != "200" ]]; then
    echo "FAIL ${url} → HTTP ${code}"
    rm -f "${body}"
    return 1
  fi
  if [[ "${size}" -lt "${min_bytes}" ]]; then
    echo "FAIL ${url} → only ${size} bytes (min ${min_bytes})"
    rm -f "${body}"
    return 1
  fi
  # GitHub soft-404 page
  if grep -qi "Content-Security-Policy" "${body}" && grep -qi "Page not found" "${body}"; then
    echo "FAIL ${url} → GitHub soft-404 body"
    rm -f "${body}"
    return 1
  fi
  # Nested-under-/docs regression: root /fr must not be a tiny refresh stub only
  if [[ "${url}" == "${BASE_URL}/fr/" ]] || [[ "${url}" == "${BASE_URL}/fr" ]]; then
    if grep -qi "http-equiv=\"refresh\"" "${body}" && ! grep -qi "Weebi" "${body}"; then
      echo "FAIL ${url} → refresh stub instead of homepage (site probably published under /docs/)"
      rm -f "${body}"
      return 1
    fi
  fi
  echo "OK   ${url} (${code}, ${size} bytes)"
  rm -f "${body}"
  return 0
}

echo "Smoke testing ${BASE_URL} (up to ${MAX_ATTEMPTS} attempts)…"

for attempt in $(seq 1 "${MAX_ATTEMPTS}"); do
  echo "Attempt ${attempt}/${MAX_ATTEMPTS}"
  if check_url "${BASE_URL}/fr/" 5000 \
    && check_url "${BASE_URL}/en/" 1000 \
    && check_url "${BASE_URL}/css/bootstrap.min.css" 1000 \
    && check_url "${BASE_URL}/fr/changelog/" 1000 \
    && check_url "${BASE_URL}/fr/prix/" 500; then
    # Explicitly ensure the broken nesting is not the only available site
    docs_code="$(curl -sS -o /dev/null -w "%{http_code}" -L --max-time 20 "${BASE_URL}/docs/fr/" || true)"
    fr_code="$(curl -sS -o /dev/null -w "%{http_code}" -L --max-time 20 "${BASE_URL}/fr/" || true)"
    if [[ "${docs_code}" == "200" && "${fr_code}" != "200" ]]; then
      echo "::error::Site is reachable at /docs/fr/ but not /fr/ — Pages is publishing repo root instead of the Hugo artifact (or branch /docs)."
      exit 1
    fi
    echo "All smoke checks passed."
    exit 0
  fi
  if [[ "${attempt}" -lt "${MAX_ATTEMPTS}" ]]; then
    sleep "${SLEEP_SECONDS}"
  fi
done

echo "::error::Live smoke test failed for ${BASE_URL}"
echo "Likely cause: GitHub Pages source is 'Deploy from a branch' (repo root), so the real site is only under /docs/ and /fr/ 404s."
echo "Fix: Repo Settings → Pages → Source = GitHub Actions  (or Branch: main / folder: /docs)."
exit 1
