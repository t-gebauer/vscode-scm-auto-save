# scm-auto-save

Visual Studio Code extension

## Features

Automatically saves all text documents in the workspace on window focus loss, but only if the file is part of a git repository.

### Why?

VSCode already has a setting for automatic saves: `files.autoSave`

https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save

This extension behaves like `onWindowChange` (the window looses focus), when the file is under version control and like `off` (do nothing) when not.

## Known Issues

Does not actually check whether the file is added to version control, but only whether it is located inside a git directory. For example, git ignored files are also saved.

## Is this enterprise software?

Too much boilerplate for such a trivial feature. Most of it is automatically generated. But still, someone has to keep this up to date...

## License

MIT License

Copyright (c) 2021 Timo Gebauer
