import * as vscode from "vscode"
import * as git from "./include/git"

// technically, only checks whether the file is located inside of a git directory, not whether it is actually version controlled...

export function activate(context: vscode.ExtensionContext) {
    console.log("activated")

    // The git extension is bundled with vscode and can not be uninstalled. But it could be disabled.
    const gitExtension = vscode.extensions.getExtension<git.GitExtension>("vscode.git")
    if (gitExtension === undefined) {
        return vscode.window.showErrorMessage("Git extension not available")
    }
    const git = gitExtension.exports.getAPI(1)

    function isInsideGitRepository(uri: vscode.Uri): boolean {
        return git.repositories.some((repository: git.Repository) => {
            return uri.fsPath.startsWith(repository.rootUri.fsPath)
        })
    }

    vscode.window.onDidChangeWindowState((windowState: vscode.WindowState) => {
        if (!windowState.focused) {
            // focus lost
            vscode.workspace.textDocuments.forEach((document: vscode.TextDocument) => {
                if (
                    !document.isClosed &&
                    !document.isUntitled &&
                    document.isDirty &&
                    isInsideGitRepository(document.uri)
                ) {
                    document.save()
                }
            })
        }
    }, context.subscriptions)
}

export function deactivate() {}
