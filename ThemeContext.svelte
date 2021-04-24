<script>
    import { setContext, onMount } from "svelte";
    import { writable } from "svelte/store";
    import { themes } from "./theme.js";
    // set state of current theme's name
    let _current = themes[0].name;
  
    // utility to get current theme from name
    const getCurrentTheme = name => themes.find(h => h.name === name);
    const Theme = writable(getCurrentTheme(_current));
  
    setContext("theme", {
      theme: Theme,
      toggle: () => {
        let _currentIndex = themes.findIndex(h => h.name === _current);
        _current =
          themes[_currentIndex === themes.length - 1 ? 0 : (_currentIndex += 1)]
            .name;
        Theme.update(t => ({ ...t, ...getCurrentTheme(_current) }));
        setRootColors(getCurrentTheme(_current));
      }
    });
  
    onMount(() => {
      setRootColors(getCurrentTheme(_current));
    });
  
    // sets CSS vars for easy use in components
    // ex: var(--theme-background)
    const setRootColors = theme => {
      for (let [prop, color] of Object.entries(theme.colors)) {
        let varString = `--theme-${prop}`;
        document.documentElement.style.setProperty(varString, color);
      }
      document.documentElement.style.setProperty("--theme-name", theme.name);
    };
  </script>
  
  <slot>
  </slot>
