const vscode = require('vscode');
const { execFile } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

function activate(context) {
    let disposable = vscode.commands.registerCommand('terminal-image-paster.paste', () => {
        const timestamp = Date.now();
        const tmpFilePath = path.join(os.tmpdir(), `codex_clip_${timestamp}.png`);

        // JXA script: return value (last expression) goes to stdout reliably
        const script = `
ObjC.import('AppKit');
var pboard = $.NSPasteboard.generalPasteboard;
var classArray = $.NSArray.arrayWithObject($.NSImage.class);
var options = $.NSDictionary.dictionary;
var canRead = pboard.canReadObjectForClassesOptions(classArray, options);

if (canRead) {
    var images = pboard.readObjectsForClassesOptions(classArray, options);
    if (images.count > 0) {
        var image = images.objectAtIndex(0);
        var tiffData = image.TIFFRepresentation;
        var imageRep = $.NSBitmapImageRep.imageRepWithData(tiffData);
        var pngData = imageRep.representationUsingTypeProperties($.NSPNGFileType, $.NSDictionary.dictionary);
        pngData.writeToFileAtomically("${tmpFilePath}", true);
        "SUCCESS";
    } else {
        "NO_IMAGE";
    }
} else {
    "NO_IMAGE";
}
`;
        // Write script to a temp file to avoid stdin pipe issues
        const scriptPath = path.join(os.tmpdir(), `tip_jxa_${timestamp}.js`);
        fs.writeFileSync(scriptPath, script);

        execFile('/usr/bin/osascript', ['-l', 'JavaScript', scriptPath], { timeout: 5000 }, (error, stdout, stderr) => {
            // Clean up temp script
            try { fs.unlinkSync(scriptPath); } catch (_) {}

            const output = (stdout || '') + (stderr || '');

            if (!error && output.includes('SUCCESS')) {
                const terminal = vscode.window.activeTerminal;
                if (terminal) {
                    terminal.sendText(tmpFilePath, false);
                } else {
                    vscode.window.showWarningMessage('Terminal Image Paster: No active terminal.');
                }
            } else {
                // No image in clipboard — fallback to normal text paste
                vscode.env.clipboard.readText().then(text => {
                    const terminal = vscode.window.activeTerminal;
                    if (terminal && text) {
                        terminal.sendText(text, false);
                    }
                });
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
