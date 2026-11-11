# www.weebi.com

## Prerequisite

### WSL (Windows Subsystem for Linux)
```bash
# Install Hugo
sudo apt update
sudo apt install hugo

# Install Node.js and npm if not already installed
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install
```

## How to run the website

### From Windows
```bash
hugo server -D --navigateToChanged --renderToMemory
```
then go to http://localhost:1313/

**Note:** To preview the 404 page during development, visit `http://localhost:1313/404.html` directly. The custom 404 page will work automatically in production (GitHub Pages).

### From WSL
```bash
# Navigate to the project directory
# Verify config file exists
ls -la hugo.toml

# Check Hugo version (should be 0.120+ for hugo.toml support)
hugo version

# If Hugo version is old, install Hugo Extended manually:
# wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.120.4/hugo_extended_0.120.4_linux-amd64.deb
# sudo dpkg -i /tmp/hugo.deb

# Run Hugo server in memory so it does not rewrite docs/ with localhost URLs.
# docs/ is what GitHub Pages publishes.
hugo server -D --navigateToChanged --renderToMemory --config hugo.toml
hugo server -D --disableFastRender --renderToMemory --config hugo.toml
```

then go to http://localhost:1313/

**Note:** If you get "Unable to locate config file" error:
- The `apt` version of Hugo might be too old. Install Hugo Extended manually (see commands above)
- Or explicitly specify the config file with `--config hugo.toml` 


## pricing
To add more countries or adjust prices, edit themes/weebiTheme/assets/js/pricing-geo.js:

## translations trad
run python translate_i18n.py --all

## improve
- lighthouse - perf & SEO
	- https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=fr&pli=1

