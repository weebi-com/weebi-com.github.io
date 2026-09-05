---
title: "What's new"
layout: "changelog"
description: "History of Weebi app updates, from 2022 to today."
---

User-facing product history for Weebi shop owners: sales, stock, customers, printing, sync, accounting, and everyday usability. Purely technical changes are omitted.

## 2026

### Version 368 — 5 September 2026

- Multiple items allowed on a free invoice
- Inventory guard to avoid unwanted stock-outs
- Article import fix on Windows
- Secondary currency correctly hidden when disabled
- Side menu: Sell, Purchases, Free invoice, and Stock as named activities (end of "Other operations")
- Inventory, stock in, and stock out merged into one Stock activity with a type selector
- Free invoice (sell / spend) grouped into a single operation tile
- Article screen redesigned: designation more visible, buttons easier to reach

### Version 367 — September 2026

- User creation flow fixed
- More reliable desktop PDF export (system save panel)
- Direct link to acquire a user license
- Managers can update passwords again

### Version 366 — August 2026

- Mac PDF export uses the native save dialog
- PDF filenames stay valid even when the shop legal name contains special characters

### Version 365 — August 2026

- Chinese language added
- User creation fix

### Version 363

- Shop currency inferred automatically from the selected country (when available)

### Version 362

- Sync: per-item resync for articles, shops, and contacts only in the detail view
- Advanced sync limited to Premium accounts
- "Sync all" button harder to reach to limit unnecessary calls
- Settings: Weebi license required; magic link wired there too
- SYSCOHADA accounting: balance adjustment / rebalancing
- Accounting on mobile: actions grouped in a menu (except Help) so the title is no longer covered

### Version 361

- Automatic ticket sync at app launch (Premium)
- Excel / LibreOffice exports for statistics
- Transfers between SYSCOHADA accounts (rebalancing)

### Version 360

- OHADA accounting — Minimal Cash System (Système Minimal de Trésorerie)
- Payment date entry for customer / supplier payments
- Summary view: OK button usable again after cancel
- Stock stats: PDF export uses the correct date range
- Stock stats: period selection harmonized
- Clearer credit sale / purchase summary
- Contact screen: ticket list starts at the top
- Side menu: simpler sign-out button
- Guards: VAT when OHADA is enabled; discount amounts integers only

### Version 359

- Dedicated view for tickets still stuck locally
- Ticket presentation refreshed
- Price and technical id less prominent

### Version 358

- Share an article card (name, price, photo)
- Rare bugs fixed at shop creation and when reloading stats
- Side menu no longer shows a loading progress indicator
- Clearer signed-in / signed-out state at startup
- Local events visible per object (article, shop, contact, ticket)
- Sync UI reworked
- Stats and charts: more vertical space; first column frozen

### Version 354

- Seller name on the ticket
- Catch up / edit a ticket just after it was issued
- Printer settings moved into Settings
- A4 / Letter printing available on all platforms
- Clearer printer setup (thermal vs laser)
- Thermal printer: 58 or 80 mm choice
- Thermal printer: thousands separator
- Several regressions fixed

### Version 350

- Balance before fixed on ticket detail and PDF
- Balance after fixed (was only valid at issue time)
- Balance before / after shown when sharing a ticket on WhatsApp

### Version 349

- Less intrusive back navigation
- Default contact: balance not shown
- Updating article / shop / contact: no confirmation dialog if nothing changed
- Accounting: finances view and charts merged
- Accounting charts and financial table refreshed
- Contact tickets list fix
- Cash-flow charts fix

### Version 346

- Secure data access fixes (Android, iOS, macOS)
- Link opening fix on iOS
- More consistent shop icon in the side menu
- Guard against negative stock
- Article basket creation shown again

### Version 343 — 26 April 2026

- PDF report with stock value

### Version 342 — 17 April 2026

- Secondary currency rate easier to read
- Contact display improved

### Version 341 — 14 April 2026

- Article update keeps the previous barcode
- Item cost on iOS tickets fixed
- First launch: French kept if no language is chosen
- Stock export sorted alphabetically (case-insensitive)
- Article categories sorted alphabetically (case-insensitive)
- Currency support added
- Secondary currency for conversion
- Link device to cloud account on first launch
- More space to tap items at the bottom of lists
- "Activity tracking" renamed to "Accounting"

### Version 339 — 21 February 2026

- User access configuration fixed
- "Forgot password" button visible on the login screen

### Version 338 — 5 January 2026

- SKU and category shown in the article preview
- Article search button reworked

## 2025

### December 2025

- Article preview harmonized across purchase, stock, and inventory operations
- Barcode scan button added in the purchase view

### November 2025

#### Version 330

- User permissions reworked: offline, previous rights are kept
- CRUD rights visible in the side menu
- Stats access better enforced by permissions
- Side menu display fixed when offline
- Navigation after password change fixed

#### Version 329

- UI refreshed

#### Version 328 — 5 November 2025

- Photo backup fixed when the file does not exist

#### Version 327 — 2 November 2025

- iOS Bluetooth printing fixed

### October 2025

#### Version 326 — 31 October 2025 (iOS)

- Shop update protected by rights and matching id
- Device–shop linking fixed with multiple shops
- Guidance to the device view to generate a linking code
- Password update view shown

#### Versions 326 / 325 / 324 — 28 October 2025

- Message when categories are empty; create button when rights allow
- Stock unit shown by default; box / carton unit fix
- Article update right after creation fixed
- Stock preview on long-press in sell fixed
- Decimal amounts on iOS fixed
- More close icons on dialogs

#### Version 323 — 21 October 2025

- Financial stats display even with unusual scales
- Photos backed up before delete
- Article backup issues fixed
- Cloud shop updates better reflected locally

#### Version 322 — 20 October 2025

- PDF catalogue export with stock levels (from Articles)
- More intuitive barcode scan icon
- 5% tax option
- First-sync fixes (shop and photos)

### September 2025 — Version 320

- Business administration: shops and linked devices (tills)
- User, rights, and access management
- Ticket exports fixed

### July 2025

- Barcode on Windows and macOS
- Barcode reader display fixed
- Product info via Open Food Facts when scanning
- Bypass when too many photos during catalogue download
- Better camera handling (rear, front, external)

### May 2025

- Scanner button shown by default
- Export name, price, and stock from stock stats
- More info on the article card
- Stock PDF export
- Promo rounding edge case fixed

### April 2025

#### Version 317

- Batch photo import persisted in the right folder
- Smoother export view
- No photo backup prompt when the folder is empty
- Easier device link to a single cloud shop
- Clearer sync labels and colours for queued events
- Login no longer blocked if some reads fail

#### Version 316

- Sync-related fixes

#### Version 312

- Contact view: tickets and balance reactive (e.g. disabling a ticket)
- Cleaner contact preview

#### Version 311

- Ticket sync fixes
- Contact balance before / after shown only for active tickets

### March 2025

- Country phone-number length fix
- Photo update fix
- Contact preview improved
- Category duplication on create fixed

### February 2025 — Version 304

- Ticket print uses contact info from the ticket
- Startup audio crash fixed

### January 2025

#### Versions 302 and 303

- Minimum version: store icon and URL

#### Version 301

- Mobile: print icon reactive after ticket operations
- PC / Mac: save PDF locally
- Basket cleared when opening a new activity
- App-bar buttons harmonized (purchases, stock, inventory: sort + share)
- Amount ceiling to avoid max-value errors
- Inventory display rounding refreshed
- Dates with full weekday and month names
- Ticket search by article label case-insensitive
- Basket auto-cleared when switching operation type

#### Version 300

- WhatsApp contact
- PDF sharing

#### Version 298

- Printed ticket date fixed on Android
- Thousands separator on printed tickets
- Stock / inventory ticket printing on iOS

#### Version 295 — 11 January 2025

- Spend fixes
- Dedicated expense-category view
- WhatsApp button to send the ticket to customer / supplier
- Share ticket as PDF
- Ticket detail view improved
- Weebi support via WhatsApp

#### Version 294 — 9 January 2025

- Contacts: customers vs suppliers
- Articles sorted alphabetically by default
- Contacts sorted by last name
- Cloud account subscription introduced
- Statistics orientation fixed

## 2024

### November 2024

- Off-catalogue spend entry simplified
- Off-catalogue sales added
- Off-catalogue sales / spends enriched with contact selection
- Uncountable articles
- More responsive ticket detail
- Payment dialog: clearer OK when amount is correct
- Dates shown per locale
- Article code hidden to avoid confusion
- Shop info edit fixed
- Categories
- Article search fixed after updates
- Sales view layout refreshed (price, icon, spacing)

### July 2024

- Contact info stored on the ticket (id, first name, last name)
- Printed / shared tickets better localized
- App minimum version: info dialog when upgrade is recommended
- iOS photo storage fixed

### June 2024

- Article / contact ids not reused after delete
- Photo picker fixed
- Dynamic update of articles within a calibre
- Article layout (slider / calibre) refreshed

### May 2024 — Version 279

- Customer search in sell / spend fixed

### April 2024

- Shop locale
- Sell / spend tab order fixed
- Article photo backup; photos included in JSON exports
- Overdraft removed from contact create / update
- Customer analysis: space between first and last name
- Translation into many languages
- Thousands separator
- Item subtotal in cart when quantity is between 0 and 1
- Android printer fix
- Microphone permissions on iOS / iPad refreshed
- Date / number formatting per locale
- Article creation date hidden when default
- Single-article update: designation synced with calibre title

### March 2024

- Proper addresses for shop and contacts
- Country codes for phone numbers
- Cart fix: discount / surcharge
- Edit and disable buttons (article, shop, contact) swapped for clarity
- Full address on contact create / update
- CSV / Excel import: new file clears previous error preview

### February 2024

#### Version 171

- Payment dialogs harmonized
- Comment clearable; reset if payment is cancelled

#### Version 170

- Article / contact import for updates fixed
- Scanned barcode visible on product create / update
- CSV / Excel import: previous error message cleared
- Expense categories visible for new users
- Stock unit editable from the article card
- Wording: "contact" and "shop"
- Barcode preference correctly remembered after restart

## 2023

### December 2023

#### Version 266 — 23 December 2023

- Android 13 permission fixes (voice message and CSV / JSON export)

#### 4 December 2023

- Product search in sales fixed (Android)
- Email validator on contact and shop

#### 3 December 2023

- Cash-flow charts (income / expenses, bars, pie)
- Shop financial stats table + export

### November 2023

- Discount display fixed
- Stock out: sign corrected (− not +)
- Accents stripped when printing articles for clearer receipts

### October 2023

#### Versions 251 / 250

- Article search fixed
- Contact search by first / last name and with / without accents
- Ticket filters: contact search fixed (mobile keyboard)
- Help refreshed
- Quick-spend articles hidden from search
- Voice messages
- File sharing on Windows
- Backups fixed (desktop export)

### September 2023

- Audio help
- Email launch improved + dialog on failure
- Side menu refreshed
- Mobile data backup fixed

### August 2023

- Supplier payment
- Credit purchase fixed
- Tax amount shown in cart total
- Cart total harmonized in spend
- Ticket JSON import flow harmonized
- Fixes for article delete, ticket import, cart visibility when calibre is removed
- FAQ: "Support" renamed "Help and contact"
- Startup message to help when a bug occurs
- Customer balance calculation fixed

### July 2023

#### Version 238 — 19 July 2023

- Photo persistence / backup fixed
- Disable button on article baskets
- Photo import on Windows

#### 14 July 2023

- Amounts with decimals
- Contact search by phone fixed
- Article name editing fixed
- Article photos; batch photo import
- File save on Mac and iOS
- More compact side menu

### June 2023

- Article photos: folder pick, preview, match by file name
- Photos included in exports
- Printer: auto reconnect / disconnect with app lifecycle
- Cart fix when entering a discount
- Barcode reworked in article create / update / detail
- Side menu order refreshed
- Clearer distinction purchases vs stock in
- CSV imports for articles and contacts
- Prompt to clear cart when switching sell ↔ spend
- Purchases and spends reordered for frequent operations
- Purchase and stock-out search fixed
- JSON exports (no more local database format)
- JSON import refreshed: duplicates, action types, import vs restore
- Backup required before deleting everything

### April 2023

- Exports / shares visible on Android
- Line tap opens the right article in the carousel

### March 2023

- Cart total price fixed
- Discount on the whole cart
- Quick spend view improved (create / edit / delete categories)
- Clarification to avoid mixing articles and expense categories
- Video tutorials: cash sale and stock in

### January 2023

- "Cart" renamed to distinguish customer purchase vs article basket
- Basket tax-inclusive preview fixed (min qty ×2 / ×3)
- Basket subtotal refreshed
- Desktop help for cart amounts
- Mac: quantity entry and amount-received validation
- Shop info on iOS / iPad tickets
- Up to 4 decimal places in entry (e.g. 0.0001)

### Other 2023 advances

- Barcode scan; add / edit barcode by scanning on create / update
- Option to show or hide the barcode icon
- Off-catalogue spend with payment type / discount
- Different billing date
- Inventory available
- Ticket email export fixed
- Stock in refreshed

## 2022

### Late December 2022

- Activity title at the top (instead of "Weebi")
- Version number at the bottom of the menu
- Sales article search tolerates accents
- Adding article lines to the cart fixed
- Article disable / re-enable
- Article card: status and modification dates
- Duplicate check when creating an article line or basket
- Better article display (animation + photo previews)

### December 2022

- Visual cue when an article is disabled
- Contact update / edit refreshed

### November 2022

- Catalogue article presentation refreshed
- Country search without accents / special characters
- CSV contact import

### October 2022

- Purchase right on customer card → balance
- Taxes kept when returning from the cart
- Clearer promo, discount, and tax detail
- Close control to cancel payment
- Article baskets visible in the catalogue
- Dropdown lists harmonized

### Version 204 — 4 September 2022

- FAQ refreshed
- Excel article import better explained
- Support view: easier call / message
- Tutorial video player refreshed
- Android connection tutorial
- YouTube demo: connecting a printer
- Advanced operations texts readable again
- Quick spends no longer shown in the sales catalogue

### Version 201 — 31 July 2022

- Delete all contacts, products, or tickets
- Exports: local save and sharing
- Payment view: cancel allowed; no longer stuck on amount entry
- Numeric pad for amounts (faster sales / purchases)
- Bluetooth or Wi‑Fi printer choice
- Promotion date ranges
- Address with country and suggestions
- Customer payment dialogs / buttons harmonized
- Purchase / sale confirm button refreshed
- Promotions removed from purchases (sales only)
- Remaining stock better rounded
- Long-press + tap for decimal or large quantities
- Mac / PC: leave the large-quantity window
- Long-press from contact selection to open the contact card
- Unknown customer checked by default when no contact
- Delete key fixed on desktop
- Purchase fixes

### Versions 180 / 178 / 176 / 172

- Quick spend / expense note
- Charts
- iOS printing
- Print layout refreshed
- Customer phone on the printed ticket
- Printer view fixed
- Startup audio
- Stock out
- Zero promo hidden in the shop view
- Ticket detail: phone and email when set; purchase right hidden without credit
- Ticket reactivation refreshed
- Customer selection and contact update fixed

### Versions 166–169 and early days (2021–early 2022)

- Promo across all products sold
- Manager fields (name, phone, email)
- CSV exports refreshed
- Product / sub-product create without cost fixed
- Confirmation on product create
- "Code" renamed "barcode"; auto id if barcode empty
- Mobile Money account hidden when not configured
- Reset function
- References listed alphabetically / by number
- Permanent ticket delete (after deactivation)
- Prices visible on products in sales
- Product tree in sales fixed
- Stock rounded (max 2 decimals)
- Credit invoicing simplified
- Sub-product: easier access; single tap to show
- Single article: button to create another
- Catalogue reset; delete a sub-product
- Product tiles adapt to screen size
- Ticket disable / re-enable fixed
- App version in About
- Excel catalogue import
- Dedicated stock-in view
- Misleading stock-after-operation display removed
- Privacy policy at init
- Orientation unlocked (tablet / PC landscape by default)
