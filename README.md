# Terminal Image Paster

> **[🔥 Product page: Terminal Image Paster](https://olbin.dev/terminal-image-paster.html)** · [日本語](https://olbin.dev/terminal-image-paster-ja.html)  
> *Paste clipboard images into the VS Code terminal as absolute paths — macOS / olbin.dev.*


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


## Related projects ([olbin.dev](https://olbin.dev/))

| Project | Role |
|---------|------|
| [cAgent](https://github.com/olbin-dev/cAgent) | OpenClaw ↔ AgentKit JSON-RPC bridge — [case study](https://olbin.dev/factory.html) |
| [Vault Sync for Dropbox](https://github.com/olbin-dev/plugin) | Obsidian ↔ Dropbox sync — [product page](https://olbin.dev/vault-sync.html) |
| [Local LLM Brain Chat](https://github.com/olbin-dev/obisidian-Plugin-LocalLLM) | Obsidian ↔ local llama.cpp — [product page](https://olbin.dev/local-llm.html) |
| [LogosCyber](https://github.com/olbin-dev/logos-cyber) | Nuclei template AI scanner — [product page](https://olbin.dev/logos-cyber.html) |
| [Terminal Image Paster](https://github.com/olbin-dev/Terminal-image-paster) | VS Code clipboard→terminal paths — [product page](https://olbin.dev/terminal-image-paster.html) |
| [Sovereign Systems Log](https://github.com/olbin-dev/SSjapantokyokugahara) | Technical log — [product page](https://olbin.dev/ss-log.html) |
| [All projects](https://olbin.dev/projects.html) | Full catalog on olbin.dev |

