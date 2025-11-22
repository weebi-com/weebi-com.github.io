#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to translate Hugo i18n files from English to multiple languages.
Uses googletrans library (free, no API key required).
"""

import os
import re
import sys
import time
from pathlib import Path
from typing import Dict, List, Tuple

# Fix Windows console encoding
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

try:
    from googletrans import Translator
except ImportError:
    print("Installing googletrans...")
    import subprocess
    subprocess.check_call(["pip", "install", "googletrans==4.0.0rc1"])
    from googletrans import Translator

# Languages to translate (excluding 'en' and 'fr' which already exist)
LANGUAGES_TO_TRANSLATE = [
    'af', 'am', 'ar', 'az', 'bg', 'bn', 'bs', 'ca', 'cs', 'da', 'de', 'el', 'es', 'et',
    'fa', 'fi', 'gl', 'ha', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'iu',
    'ja', 'ka', 'kk', 'km', 'ko', 'ku', 'ky', 'lt', 'lv', 'mk', 'ml', 'ms', 'my', 'nb',
    'ne', 'nl', 'no', 'pl', 'ps', 'pt', 'ro', 'ru', 'sd', 'sk', 'sl', 'so', 'sq', 'sr',
    'sv', 'ta', 'th', 'tk', 'tr', 'tt', 'ug', 'uk', 'ur', 'uz', 'vi'
]

# Language code mapping for googletrans (some codes need adjustment)
LANG_CODE_MAP = {
    'iw': 'he',  # Hebrew
    'jw': 'id',  # Indonesian
    'in': 'id',  # Indonesian (old code)
}

def parse_toml_file(file_path: Path) -> List[Tuple[str, str, str]]:
    """Parse TOML file and extract key-value pairs with comments."""
    entries = []
    current_comment = None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            original_line = line
            line = line.rstrip()
            
            # Check if it's a comment
            if line.strip().startswith('#'):
                current_comment = line
            # Check if it's a key-value pair
            elif '=' in line and not line.strip().startswith('#'):
                # Match key = "value" pattern, handling escaped quotes
                match = re.match(r'^(\w+)\s*=\s*"(.*)"$', line)
                if match:
                    key = match.group(1)
                    value = match.group(2)
                    # Unescape quotes
                    value = value.replace('\\"', '"')
                    entries.append((key, value, current_comment))
                    current_comment = None
    
    return entries

def translate_text(text: str, target_lang: str, translator: Translator, max_retries: int = 3) -> str:
    """Translate text to target language with retry logic."""
    for attempt in range(max_retries):
        try:
            # Map language code if needed
            lang_code = LANG_CODE_MAP.get(target_lang, target_lang)
            
            result = translator.translate(text, dest=lang_code, src='en')
            return result.text
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"  Retry {attempt + 1}/{max_retries} for: {text[:50]}...")
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                print(f"  Failed to translate after {max_retries} attempts: {text[:50]}...")
                return text  # Return original if translation fails
    
    return text

def create_translation_file(
    entries: List[Tuple[str, str, str]],
    target_lang: str,
    output_path: Path,
    translator: Translator,
    batch_size: int = 5
):
    """Create a translated TOML file."""
    print(f"\nTranslating to {target_lang}...")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        last_comment = None
        
        for i, (key, value, comment) in enumerate(entries):
            # Write comment if it changed
            if comment and comment != last_comment:
                f.write(f"{comment}\n")
                last_comment = comment
            
            # Translate the value
            if value.strip():  # Only translate non-empty values
                translated_value = translate_text(value, target_lang, translator)
                # Escape quotes and backslashes in translated text
                translated_value = translated_value.replace('\\', '\\\\').replace('"', '\\"')
                f.write(f'{key} = "{translated_value}"\n')
            else:
                # Escape existing value
                escaped_value = value.replace('\\', '\\\\').replace('"', '\\"')
                f.write(f'{key} = "{escaped_value}"\n')
            
            # Add delay to avoid rate limiting (every batch_size entries)
            if (i + 1) % batch_size == 0:
                time.sleep(1)  # 1 second delay every 5 translations
    
    print(f"  [OK] Created {output_path}")

def get_remaining_languages(i18n_dir: Path) -> List[str]:
    """Get list of languages that still need translation."""
    # Get all existing .toml files (excluding en.toml and fr.toml)
    existing_files = {f.stem for f in i18n_dir.glob('*.toml') if f.stem not in ['en', 'fr']}
    # Return only languages that don't have files yet
    remaining = [lang for lang in LANGUAGES_TO_TRANSLATE if lang not in existing_files]
    return remaining, existing_files

def main():
    """Main function to translate i18n files."""
    script_dir = Path(__file__).parent
    i18n_dir = script_dir / 'themes' / 'weebiTheme' / 'i18n'
    source_file = i18n_dir / 'en.toml'
    
    if not source_file.exists():
        print(f"Error: Source file not found: {source_file}")
        return
    
    print(f"Reading source file: {source_file}")
    entries = parse_toml_file(source_file)
    print(f"Found {len(entries)} translation keys")
    
    # Get remaining languages to translate
    remaining_langs, existing_langs = get_remaining_languages(i18n_dir)
    
    print(f"\nAlready translated: {len(existing_langs)} languages")
    print(f"Remaining to translate: {len(remaining_langs)} languages")
    
    if not remaining_langs:
        print("\n[SUCCESS] All languages have been translated!")
        return
    
    translator = Translator()
    
    # Parse command line arguments or use defaults
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == '--all':
            languages = remaining_langs
        elif sys.argv[1] == '--batch':
            batch_size = int(sys.argv[2]) if len(sys.argv) > 2 else 5
            languages = remaining_langs[:batch_size]
        elif sys.argv[1] == '--langs':
            codes = sys.argv[2] if len(sys.argv) > 2 else ''
            requested = [code.strip() for code in codes.split(',')]
            # Only translate requested languages that are still remaining
            languages = [lang for lang in requested if lang in remaining_langs]
            if not languages:
                print(f"All requested languages ({codes}) are already translated!")
                return
        else:
            print("Usage: python translate_i18n.py [--all|--batch N|--langs lang1,lang2,...]")
            print("Default: translating first 5 remaining languages")
            languages = remaining_langs[:5]
    else:
        # Default: translate first 5 remaining languages
        print(f"\nStarting with first 5 remaining languages...")
        print("To translate all remaining: python translate_i18n.py --all")
        print("To translate N remaining: python translate_i18n.py --batch N")
        print("To translate specific: python translate_i18n.py --langs es,de,it")
        languages = remaining_langs[:5]
    
    print(f"\nTranslating {len(languages)} languages...")
    print("This may take a while due to rate limiting...\n")
    
    for lang in languages:
        output_file = i18n_dir / f'{lang}.toml'
        
        try:
            create_translation_file(entries, lang, output_file, translator)
        except Exception as e:
            print(f"  [ERROR] Error translating {lang}: {e}")
            # Remove partial file if it exists
            if output_file.exists():
                output_file.unlink()
        
        # Longer delay between languages
        time.sleep(2)
    
    print(f"\n[SUCCESS] Translation complete! Generated translation files.")
    print(f"Files are in: {i18n_dir}")

if __name__ == '__main__':
    main()

