/**
 * IP-based pricing geolocation
 * Adapts pricing display based on user's location
 */

// Currency mapping: country code -> {currency, value, symbol}
// Base price: 9000 FCFA
// Note: value should NOT include the symbol, symbol is added separately
const CURRENCY_MAP = {
  // West African CFA Franc (XOF) countries
  'SN': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Senegal
  'CI': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Côte d'Ivoire
  'ML': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Mali
  'BF': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Burkina Faso
  'NE': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Niger
  'TG': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Togo
  'BJ': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Benin
  'GW': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Guinea-Bissau
  
  // Central African CFA Franc (XAF) countries
  'CM': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Cameroon
  'GA': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Gabon
  'CG': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Republic of the Congo
  'TD': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Chad
  'CF': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Central African Republic
  'GQ': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Equatorial Guinea
  
  // Other African countries (using local currency with FCFA equivalent pricing)
  'GN': { currency: 'GNF', value: '130 000', symbol: 'FG' }, // Guinea (Conakry) - Guinean Franc
  'CD': { currency: 'CDF', value: '31 000', symbol: 'FC' }, // Democratic Republic of the Congo (DRC) - Congolese Franc
  
  // Europe (EUR)
  'FR': { currency: 'EUR', value: '14', symbol: '€' }, // France
  'BE': { currency: 'EUR', value: '14', symbol: '€' }, // Belgium
  'DE': { currency: 'EUR', value: '14', symbol: '€' }, // Germany
  'ES': { currency: 'EUR', value: '14', symbol: '€' }, // Spain
  'IT': { currency: 'EUR', value: '14', symbol: '€' }, // Italy
  'NL': { currency: 'EUR', value: '14', symbol: '€' }, // Netherlands
  'PT': { currency: 'EUR', value: '14', symbol: '€' }, // Portugal
  'AT': { currency: 'EUR', value: '14', symbol: '€' }, // Austria
  'GR': { currency: 'EUR', value: '14', symbol: '€' }, // Greece
  'IE': { currency: 'EUR', value: '14', symbol: '€' }, // Ireland
  'FI': { currency: 'EUR', value: '14', symbol: '€' }, // Finland
  'LU': { currency: 'EUR', value: '14', symbol: '€' }, // Luxembourg
  
  // North America (USD)
  'US': { currency: 'USD', value: '15', symbol: '$' }, // United States
  'CA': { currency: 'USD', value: '15', symbol: '$' }, // Canada
  'MX': { currency: 'USD', value: '15', symbol: '$' }, // Mexico
  
  // UK (GBP)
  'GB': { currency: 'GBP', value: '12', symbol: '£' }, // United Kingdom
  
  // Asia
  'JP': { currency: 'JPY', value: '2 200', symbol: '¥' }, // Japan - Japanese Yen
  'IN': { currency: 'INR', value: '1 250', symbol: '₹' }, // India - Indian Rupee
  'CN': { currency: 'CNY', value: '100', symbol: '¥' }, // China - Chinese Yuan
  'KR': { currency: 'KRW', value: '20 000', symbol: '₩' }, // South Korea - South Korean Won
  'SG': { currency: 'SGD', value: '20', symbol: 'S$' }, // Singapore - Singapore Dollar
  'MY': { currency: 'MYR', value: '70', symbol: 'RM' }, // Malaysia - Malaysian Ringgit
  'TH': { currency: 'THB', value: '550', symbol: '฿' }, // Thailand - Thai Baht
  'ID': { currency: 'IDR', value: '240 000', symbol: 'Rp' }, // Indonesia - Indonesian Rupiah
  'PH': { currency: 'PHP', value: '850', symbol: '₱' }, // Philippines - Philippine Peso
  'VN': { currency: 'VND', value: '375 000', symbol: '₫' }, // Vietnam - Vietnamese Dong
  'BD': { currency: 'BDT', value: '1 650', symbol: '৳' }, // Bangladesh - Bangladeshi Taka
  'PK': { currency: 'PKR', value: '4 200', symbol: '₨' }, // Pakistan - Pakistani Rupee
  
  // Add more countries as needed
  // Format: 'XX': { currency: 'XXX', value: 'X', symbol: 'X' }
};

// Countries where Enterprise plan is not available due to tax/regulatory reasons
// Software licenses are classified as taxable services in these countries
const UNAVAILABLE_COUNTRIES = {
  'NG': 'Nigeria',
  'KE': 'Kenya',
  'MZ': 'Mozambique'
};

// Exchange rate approximations (for reference, can be updated)
// Base: 9000 FCFA ≈ 14 EUR ≈ 15 USD ≈ 12 GBP
const EXCHANGE_RATES = {
  'FCFA': 1,
  'EUR': 0.00156, // 1 FCFA = 0.00156 EUR
  'USD': 0.00167, // 1 FCFA = 0.00167 USD
  'GBP': 0.00133, // 1 FCFA = 0.00133 GBP
};

/**
 * Get user's location from IP using free API
 * Falls back to default if geolocation fails
 */
async function getUserLocation() {
  try {
    // Using ipapi.co (free tier: 1000 requests/day)
    // Alternative: ip-api.com, ipgeolocation.io
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
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

/**
 * Update pricing display based on location
 */
function updatePricing(countryCode) {
  const priceElement = document.getElementById('pricing-team-cloud-price');
  if (!priceElement) return;
  
  // Check if Enterprise plan is unavailable in this country
  const isUnavailable = countryCode && UNAVAILABLE_COUNTRIES[countryCode];
  
  if (isUnavailable) {
    // Show unavailable message
    const priceCell = priceElement.closest('td');
    if (priceCell) {
      priceCell.innerHTML = `
        <div class="pricing-unavailable-wrapper">
          <div class="pricing-unavailable-text fw-bold">${getUnavailableText()}</div>
          <div class="pricing-unavailable-reason small mt-2">${getUnavailableReason()}</div>
        </div>
      `;
      priceCell.classList.add('pricing-unavailable-cell');
    }
    return;
  }
  
  // Get default values from data attributes
  const defaultValue = priceElement.getAttribute('data-default-value') || '9k';
  const defaultCurrency = priceElement.getAttribute('data-default-currency') || 'FCFA';
  const perUser = priceElement.getAttribute('data-per-user') || 'per user';
  
  // Get currency mapping for country, or use default
  const currencyInfo = countryCode && CURRENCY_MAP[countryCode] 
    ? CURRENCY_MAP[countryCode]
    : { currency: defaultCurrency, value: defaultValue, symbol: defaultCurrency };
  
  // Update price display
  const valueSpan = priceElement.querySelector('.price-value');
  const currencySpan = priceElement.querySelector('.price-currency');
  const perUserSpan = priceElement.querySelector('.price-per-user');
  
  // Determine if symbol goes before or after value
  // Symbols that go before: €, $, £, ¥, ₹, ₩, S$, RM, ฿, ₱, ₫, ৳, ₨
  const symbolBefore = ['€', '$', '£', '¥', '₹', '₩', 'S$', 'RM', '฿', '₱', '₫', '৳', '₨'].includes(currencyInfo.symbol);
  
  if (valueSpan) {
    if (symbolBefore) {
      // For €, $, £: include symbol in value
      valueSpan.textContent = currencyInfo.symbol + currencyInfo.value;
    } else {
      // For FCFA and similar: just the value
      valueSpan.textContent = currencyInfo.value;
    }
  }
  if (currencySpan) {
    if (symbolBefore) {
      // For €, $, £: hide currency span (symbol already in value)
      currencySpan.textContent = '';
    } else {
      // For FCFA and similar: show currency after value with space
      currencySpan.textContent = ' ' + currencyInfo.symbol;
    }
  }
  if (perUserSpan) {
    perUserSpan.textContent = ' ' + perUser;
  }
}

/**
 * Get unavailable text from data attributes
 */
function getUnavailableText() {
  const priceElement = document.getElementById('pricing-team-cloud-price');
  if (priceElement) {
    return priceElement.getAttribute('data-unavailable') || 'Not available';
  }
  return 'Not available';
}

/**
 * Get unavailable reason text from data attributes
 */
function getUnavailableReason() {
  const priceElement = document.getElementById('pricing-team-cloud-price');
  if (priceElement) {
    return priceElement.getAttribute('data-unavailable-reason') || 'Software licenses are classified as taxable services in your country. We are working to make this plan available.';
  }
  return 'Software licenses are classified as taxable services in your country. We are working to make this plan available.';
}

/**
 * Initialize pricing geolocation
 */
async function initPricingGeo() {
  // Only run if pricing element exists
  if (!document.getElementById('pricing-team-cloud-price')) {
    return;
  }
  
  try {
    const countryCode = await getUserLocation();
    if (countryCode) {
      updatePricing(countryCode);
    }
  } catch (error) {
    console.warn('Pricing geolocation failed:', error);
    // Keep default pricing
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingGeo);
} else {
  initPricingGeo();
}

