weebi.com

TODO - add photo images team 69009137.jpg

# Prerequisite

## macOS
```bash
brew install hugo
npm install
```

## WSL (Windows Subsystem for Linux)
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

# How to run the projet

## From Windows
```bash
hugo server -D --navigateToChanged
```
then go to http://localhost:1313/

**Note:** To preview the 404 page during development, visit `http://localhost:1313/404.html` directly. The custom 404 page will work automatically in production (GitHub Pages).

## From WSL
```bash
# Navigate to the project directory
cd /mnt/c/Users/PierreGancel/Documents/git_weebi/weebi-com.github.io

# Verify config file exists
ls -la hugo.toml

# Check Hugo version (should be 0.120+ for hugo.toml support)
hugo version

# If Hugo version is old, install Hugo Extended manually:
# wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.120.4/hugo_extended_0.120.4_linux-amd64.deb
# sudo dpkg -i /tmp/hugo.deb

# Run Hugo server (explicitly specify config if needed)
hugo server -D --navigateToChanged --config hugo.toml

# Or if the above doesn't work, try:
hugo server -D --navigateToChanged --configFile hugo.toml
```
then go to http://localhost:1313/

**Note:** If you get "Unable to locate config file" error:
- The `apt` version of Hugo might be too old. Install Hugo Extended manually (see commands above)
- Or explicitly specify the config file with `--config hugo.toml` 

# How to build for production
```
hugo server --environment production
```

## translations trad
run python translate_i18n.py --all

## improve
- lighthouse - perf & SEO
	- https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=fr&pli=1