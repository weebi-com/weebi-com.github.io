/**
 * IP-based pricing geolocation
 * Adapts Premium license and SYSCOHADA report prices based on user's location
 */

// Premium — base 14 € / 19 000 FCFA per license
const PREMIUM_CURRENCY_MAP = {
  'SN': { value: '19 000', symbol: 'FCFA' },
  'CI': { value: '19 000', symbol: 'FCFA' },
  'ML': { value: '19 000', symbol: 'FCFA' },
  'BF': { value: '19 000', symbol: 'FCFA' },
  'NE': { value: '19 000', symbol: 'FCFA' },
  'TG': { value: '19 000', symbol: 'FCFA' },
  'BJ': { value: '19 000', symbol: 'FCFA' },
  'GW': { value: '19 000', symbol: 'FCFA' },
  'CM': { value: '19 000', symbol: 'FCFA' },
  'GA': { value: '19 000', symbol: 'FCFA' },
  'CG': { value: '19 000', symbol: 'FCFA' },
  'TD': { value: '19 000', symbol: 'FCFA' },
  'CF': { value: '19 000', symbol: 'FCFA' },
  'GQ': { value: '19 000', symbol: 'FCFA' },
  'GN': { value: '270 000', symbol: 'FG' },
  'CD': { value: '65 000', symbol: 'FC' },
  'FR': { value: '14', symbol: '€' },
  'BE': { value: '14', symbol: '€' },
  'DE': { value: '14', symbol: '€' },
  'ES': { value: '14', symbol: '€' },
  'IT': { value: '14', symbol: '€' },
  'NL': { value: '14', symbol: '€' },
  'PT': { value: '14', symbol: '€' },
  'AT': { value: '14', symbol: '€' },
  'GR': { value: '14', symbol: '€' },
  'IE': { value: '14', symbol: '€' },
  'FI': { value: '14', symbol: '€' },
  'LU': { value: '14', symbol: '€' },
  'US': { value: '15', symbol: '$' },
  'CA': { value: '15', symbol: '$' },
  'MX': { value: '15', symbol: '$' },
  'GB': { value: '12', symbol: '£' },
  'JP': { value: '2 200', symbol: '¥' },
  'IN': { value: '1 250', symbol: '₹' },
  'CN': { value: '100', symbol: '¥' },
  'KR': { value: '20 000', symbol: '₩' },
  'SG': { value: '20', symbol: 'S$' },
  'MY': { value: '70', symbol: 'RM' },
  'TH': { value: '550', symbol: '฿' },
  'ID': { value: '240 000', symbol: 'Rp' },
  'PH': { value: '850', symbol: '₱' },
  'VN': { value: '375 000', symbol: '₫' },
  'BD': { value: '1 650', symbol: '৳' },
  'PK': { value: '4 200', symbol: '₨' },
};

// SYSCOHADA report — base ~3 € / 1 900 FCFA per report
const SYSCOHADA_CURRENCY_MAP = {
  'SN': { value: '1 900', symbol: 'FCFA' },
  'CI': { value: '1 900', symbol: 'FCFA' },
  'ML': { value: '1 900', symbol: 'FCFA' },
  'BF': { value: '1 900', symbol: 'FCFA' },
  'NE': { value: '1 900', symbol: 'FCFA' },
  'TG': { value: '1 900', symbol: 'FCFA' },
  'BJ': { value: '1 900', symbol: 'FCFA' },
  'GW': { value: '1 900', symbol: 'FCFA' },
  'CM': { value: '1 900', symbol: 'FCFA' },
  'GA': { value: '1 900', symbol: 'FCFA' },
  'CG': { value: '1 900', symbol: 'FCFA' },
  'TD': { value: '1 900', symbol: 'FCFA' },
  'CF': { value: '1 900', symbol: 'FCFA' },
  'GQ': { value: '1 900', symbol: 'FCFA' },
  'GN': { value: '27 000', symbol: 'FG' },
  'CD': { value: '6 500', symbol: 'FC' },
  'FR': { value: '2.90', symbol: '€' },
  'BE': { value: '2.90', symbol: '€' },
  'DE': { value: '2.90', symbol: '€' },
  'ES': { value: '2.90', symbol: '€' },
  'IT': { value: '2.90', symbol: '€' },
  'NL': { value: '2.90', symbol: '€' },
  'PT': { value: '2.90', symbol: '€' },
  'AT': { value: '2.90', symbol: '€' },
  'GR': { value: '2.90', symbol: '€' },
  'IE': { value: '2.90', symbol: '€' },
  'FI': { value: '2.90', symbol: '€' },
  'LU': { value: '2.90', symbol: '€' },
  'US': { value: '2.90', symbol: '$' },
  'CA': { value: '2.90', symbol: '$' },
  'MX': { value: '2.90', symbol: '$' },
  'GB': { value: '2.50', symbol: '£' },
};

const UNAVAILABLE_COUNTRIES = {
  'KE': 'Kenya',
  'MZ': 'Mozambique',
};

async function getUserLocation() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Geolocation API error');
    }

    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.warn('Could not determine user location:', error);
    }
    return null;
  }
}

function getUnavailableText(priceElement) {
  return priceElement.getAttribute('data-unavailable') || 'Not available';
}

function getUnavailableReason(priceElement) {
  return (
    priceElement.getAttribute('data-unavailable-reason') ||
    'Software licenses are classified as taxable services in your country. We are working to make this plan available.'
  );
}

function showUnavailable(priceElement) {
  const priceCell = priceElement.closest('td');
  if (!priceCell) return;

  priceCell.innerHTML = `
    <div class="pricing-unavailable-wrapper">
      <div class="pricing-unavailable-text fw-bold">${getUnavailableText(priceElement)}</div>
      <div class="pricing-unavailable-reason small mt-2">${getUnavailableReason(priceElement)}</div>
    </div>
  `;
  priceCell.classList.add('pricing-unavailable-cell');
}

function updatePriceElement(priceElement, countryCode, currencyMap, { markUnavailable = true } = {}) {
  if (!priceElement) return;

  if (markUnavailable && countryCode && UNAVAILABLE_COUNTRIES[countryCode]) {
    showUnavailable(priceElement);
    return;
  }

  const defaultValue = priceElement.getAttribute('data-default-value') || '';
  const defaultCurrency = priceElement.getAttribute('data-default-currency') || '';
  const paymentTerms = priceElement.getAttribute('data-payment-terms') || '';

  const currencyInfo =
    countryCode && currencyMap[countryCode]
      ? currencyMap[countryCode]
      : { value: defaultValue, symbol: defaultCurrency };

  const valueSpan = priceElement.querySelector('.price-value');
  const currencySpan = priceElement.querySelector('.price-currency');
  const paymentTermsSpan =
    priceElement.querySelector('.price-payment-terms') ||
    priceElement.querySelector('.pricing-addon-terms');

  if (valueSpan) {
    valueSpan.textContent = currencyInfo.value;
  }
  if (currencySpan) {
    currencySpan.textContent = ' ' + currencyInfo.symbol;
  }
  if (paymentTermsSpan && paymentTerms) {
    paymentTermsSpan.textContent = paymentTerms;
  }
}

function updatePricing(countryCode) {
  updatePriceElement(
    document.getElementById('pricing-premium-price'),
    countryCode,
    PREMIUM_CURRENCY_MAP
  );
  updatePriceElement(
    document.getElementById('pricing-syscohada-price'),
    countryCode,
    SYSCOHADA_CURRENCY_MAP,
    { markUnavailable: false }
  );
}

async function initPricingGeo() {
  if (
    !document.getElementById('pricing-premium-price') &&
    !document.getElementById('pricing-syscohada-price')
  ) {
    return;
  }

  try {
    const countryCode = await getUserLocation();
    if (countryCode) {
      updatePricing(countryCode);
    }
  } catch (error) {
    console.warn('Pricing geolocation failed:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingGeo);
} else {
  initPricingGeo();
}
