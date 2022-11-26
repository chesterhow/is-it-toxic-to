import { useEffect } from "react";

import { isMacLike } from "./isMacLike";

export function useKeyboardShortcuts(
  shortcuts: string | string[],
  onShortcutActivated: (event: KeyboardEvent, activatedShortcut: string) => void
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const allShortcuts =
        typeof shortcuts === "string" ? [shortcuts] : shortcuts;

      for (const shortcut of allShortcuts) {
        const shortcutKeys = shortcut.split("+");

        const isShortcutActivated = shortcutKeys.every((shortcutKey) => {
          switch (shortcutKey) {
            case "mod":
              return isMacLike ? event.metaKey : event.ctrlKey;
            case "cmd":
              return event.metaKey;
            case "ctrl":
              return event.ctrlKey;
            case "alt":
              return event.altKey;
            case "shift":
              return event.shiftKey;
            default:
              return event.key === shortcutKey;
          }
        });

        if (isShortcutActivated) {
          onShortcutActivated(event, shortcut);
          return;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onShortcutActivated, shortcuts]);
}
