import * as vscode from 'vscode'

export function activate (context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.browseIt',
    async () => {
      const url = await vscode.window.showInputBox({
        prompt: 'Enter an url. Example: http://localhost:8080',
        value: 'http://',
        ignoreFocusOut: true,
        validateInput: (value: string): string => {
          return ''
        }
      })

      const panel = vscode.window.createWebviewPanel(
        'browseItPanel',
        'Browser',
        vscode.ViewColumn.Active,
        { enableScripts: true }
      )

      panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Browser</title>
          <style>
            html, body, iframe {
              margin: 0;
              height: 100%;
              width: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe src="${url}"><iframe>
        </body>
      </html>
      `
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate () {
  /* noop */
}
