/**
 * IP-based pricing geolocation
 * Adapts pricing display based on user's location
 */

// Currency mapping: country code -> {currency, value, symbol}
// Base price: 9000 FCFA
// Note: value should NOT include the symbol, symbol is added separately
const CURRENCY_MAP = {
  // West Africa (CFA Franc)
  'SN': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Senegal
  'CI': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Côte d'Ivoire
  'ML': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Mali
  'BF': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Burkina Faso
  'NE': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Niger
  'TG': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Togo
  'BJ': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Benin
  'CM': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Cameroon
  'GA': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Gabon
  'CG': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Congo
  'TD': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Chad
  'CF': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Central African Republic
  'GQ': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Equatorial Guinea
  'GN': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Guinea
  'GW': { currency: 'FCFA', value: '9 000', symbol: 'FCFA' }, // Guinea-Bissau
  
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
  
  // Add more countries as needed
  // Format: 'XX': { currency: 'XXX', value: 'X', symbol: 'X' }
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
  const symbolBefore = currencyInfo.symbol === '€' || currencyInfo.symbol === '$' || currencyInfo.symbol === '£';
  
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

