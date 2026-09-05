#!/usr/bin/env bash
# Verify a Hugo publish directory is a complete, root-level site (not nested under docs/).
set -euo pipefail

PUBLISH_DIR="${1:-public}"

if [[ ! -d "${PUBLISH_DIR}" ]]; then
  echo "::error::Publish dir missing: ${PUBLISH_DIR}"
  exit 1
fi

echo "Publish tree (top level):"
ls -la "${PUBLISH_DIR}"

FILE_COUNT="$(find "${PUBLISH_DIR}" -type f | wc -l | tr -d ' ')"
echo "File count: ${FILE_COUNT}"

REQUIRED_PATHS=(
  "fr/index.html"
  "en/index.html"
  "fr/changelog/index.html"
  "en/changelog/index.html"
  "fr/prix/index.html"
  "css/bootstrap.min.css"
  "js/bootstrap.bundle.min.js"
  "images/Weebi_Logo_Full.png"
  "404.html"
  "CNAME"
  ".nojekyll"
)

for rel in "${REQUIRED_PATHS[@]}"; do
  if [[ ! -f "${PUBLISH_DIR}/${rel}" ]]; then
    echo "::error::Missing required publish file: ${PUBLISH_DIR}/${rel}"
    exit 1
  fi
done

# Guard: never ship a site whose homepage only lives under /docs/
if [[ -d "${PUBLISH_DIR}/docs/fr" ]] && [[ ! -f "${PUBLISH_DIR}/fr/index.html" ]]; then
  echo "::error::Site appears nested under ${PUBLISH_DIR}/docs/ — refusing to deploy (would 404 at /fr/)"
  exit 1
fi

FR_SIZE="$(wc -c < "${PUBLISH_DIR}/fr/index.html" | tr -d ' ')"
EN_SIZE="$(wc -c < "${PUBLISH_DIR}/en/index.html" | tr -d ' ')"
CSS_SIZE="$(wc -c < "${PUBLISH_DIR}/css/bootstrap.min.css" | tr -d ' ')"
echo "fr/index.html=${FR_SIZE} bytes en/index.html=${EN_SIZE} bytes bootstrap.css=${CSS_SIZE} bytes"

if [[ "${FR_SIZE}" -lt 1000 ]]; then
  echo "::error::French homepage too small (${FR_SIZE} bytes)"
  exit 1
fi
if [[ "${EN_SIZE}" -lt 1000 ]]; then
  echo "::error::English homepage too small (${EN_SIZE} bytes)"
  exit 1
fi
if [[ "${CSS_SIZE}" -lt 1000 ]]; then
  echo "::error::bootstrap.min.css too small (${CSS_SIZE} bytes)"
  exit 1
fi
if [[ "${FILE_COUNT}" -lt 100 ]]; then
  echo "::error::Publish tree too small (${FILE_COUNT} files) — incomplete build"
  exit 1
fi

# Soft-404 / redirect-only homepage detection
if grep -qi "http-equiv=\"refresh\"" "${PUBLISH_DIR}/fr/index.html"; then
  echo "::error::fr/index.html looks like a meta-refresh stub, not the real homepage"
  exit 1
fi

echo "Publish output OK."
