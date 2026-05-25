/**
 * IP-based pricing geolocation
 * Adapts Entreprise and Premium license prices based on user's location
 */

// Entreprise — base ~14 € / 9 000 FCFA per license
const ENTREPRISE_CURRENCY_MAP = {
  'SN': { value: '9 000', symbol: 'FCFA' },
  'CI': { value: '9 000', symbol: 'FCFA' },
  'ML': { value: '9 000', symbol: 'FCFA' },
  'BF': { value: '9 000', symbol: 'FCFA' },
  'NE': { value: '9 000', symbol: 'FCFA' },
  'TG': { value: '9 000', symbol: 'FCFA' },
  'BJ': { value: '9 000', symbol: 'FCFA' },
  'GW': { value: '9 000', symbol: 'FCFA' },
  'CM': { value: '9 000', symbol: 'FCFA' },
  'GA': { value: '9 000', symbol: 'FCFA' },
  'CG': { value: '9 000', symbol: 'FCFA' },
  'TD': { value: '9 000', symbol: 'FCFA' },
  'CF': { value: '9 000', symbol: 'FCFA' },
  'GQ': { value: '9 000', symbol: 'FCFA' },
  'GN': { value: '130 000', symbol: 'FG' },
  'CD': { value: '31 000', symbol: 'FC' },
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

// Premium — base ~29 € / 18 000 FCFA per license
const PREMIUM_CURRENCY_MAP = {
  'SN': { value: '18 000', symbol: 'FCFA' },
  'CI': { value: '18 000', symbol: 'FCFA' },
  'ML': { value: '18 000', symbol: 'FCFA' },
  'BF': { value: '18 000', symbol: 'FCFA' },
  'NE': { value: '18 000', symbol: 'FCFA' },
  'TG': { value: '18 000', symbol: 'FCFA' },
  'BJ': { value: '18 000', symbol: 'FCFA' },
  'GW': { value: '18 000', symbol: 'FCFA' },
  'CM': { value: '18 000', symbol: 'FCFA' },
  'GA': { value: '18 000', symbol: 'FCFA' },
  'CG': { value: '18 000', symbol: 'FCFA' },
  'TD': { value: '18 000', symbol: 'FCFA' },
  'CF': { value: '18 000', symbol: 'FCFA' },
  'GQ': { value: '18 000', symbol: 'FCFA' },
  'GN': { value: '260 000', symbol: 'FG' },
  'CD': { value: '62 000', symbol: 'FC' },
  'FR': { value: '29', symbol: '€' },
  'BE': { value: '29', symbol: '€' },
  'DE': { value: '29', symbol: '€' },
  'ES': { value: '29', symbol: '€' },
  'IT': { value: '29', symbol: '€' },
  'NL': { value: '29', symbol: '€' },
  'PT': { value: '29', symbol: '€' },
  'AT': { value: '29', symbol: '€' },
  'GR': { value: '29', symbol: '€' },
  'IE': { value: '29', symbol: '€' },
  'FI': { value: '29', symbol: '€' },
  'LU': { value: '29', symbol: '€' },
  'US': { value: '30', symbol: '$' },
  'CA': { value: '30', symbol: '$' },
  'MX': { value: '30', symbol: '$' },
  'GB': { value: '25', symbol: '£' },
  'JP': { value: '4 500', symbol: '¥' },
  'IN': { value: '2 500', symbol: '₹' },
  'CN': { value: '200', symbol: '¥' },
  'KR': { value: '40 000', symbol: '₩' },
  'SG': { value: '40', symbol: 'S$' },
  'MY': { value: '140', symbol: 'RM' },
  'TH': { value: '1 100', symbol: '฿' },
  'ID': { value: '480 000', symbol: 'Rp' },
  'PH': { value: '1 700', symbol: '₱' },
  'VN': { value: '750 000', symbol: '₫' },
  'BD': { value: '3 300', symbol: '৳' },
  'PK': { value: '8 400', symbol: '₨' },
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

function updatePriceElement(priceElement, countryCode, currencyMap) {
  if (!priceElement) return;

  if (countryCode && UNAVAILABLE_COUNTRIES[countryCode]) {
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
  const paymentTermsSpan = priceElement.querySelector('.price-payment-terms');

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
    document.getElementById('pricing-entreprise-price'),
    countryCode,
    ENTREPRISE_CURRENCY_MAP
  );
  updatePriceElement(
    document.getElementById('pricing-premium-price'),
    countryCode,
    PREMIUM_CURRENCY_MAP
  );
}

async function initPricingGeo() {
  if (
    !document.getElementById('pricing-entreprise-price') &&
    !document.getElementById('pricing-premium-price')
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
