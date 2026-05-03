# Terminal Image Paster

A robust Visual Studio Code extension that allows you to seamlessly paste images from your clipboard directly into the integrated terminal as file paths. 

Say goodbye to manual `[CLIP]` tags and tedious screenshot saving. Just copy an image to your clipboard and hit `Cmd+V` (or your configured paste shortcut) in the terminal!

## Features

- **Seamless Integration**: Automatically captures images from the clipboard and saves them as temporary `.png` files.
- **Terminal Injection**: Instantly types the absolute file path of the saved image into the active VS Code terminal.
- **Smart Fallback**: If no image is detected in the clipboard, it gracefully falls back to pasting normal text.

## Why this is more reliable than other solutions

This extension was developed to solve the flakiness of traditional clipboard extraction methods. It leverages several technical advantages to ensure reliability on macOS:

1. **Deterministic JXA Execution**: Instead of relying on `console.log` which can drop output or hang, this extension utilizes the natural return value of JXA (JavaScript for Automation) scripts to guarantee standard output capture.
2. **Robust Process Management**: By using `execFile` with temporary script files instead of `exec` with string piping, it eliminates shell injection vulnerabilities and buffer issues.
3. **Absolute Pathing**: Hardcoded to use `/usr/bin/osascript` to bypass any path dependency or environment variable conflicts within the VS Code integrated terminal environment.

## Installation

1. Download the `terminal-image-paster-0.0.1.vsix` file from the repository.
2. Open VS Code, go to the Extensions view.
3. Click the `...` menu at the top right and select "Install from VSIX...".
4. Select the downloaded file.

## Requirements

- **macOS** (Relies on macOS-specific `osascript` and JXA for clipboard image extraction)
- VS Code ^1.80.0

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
