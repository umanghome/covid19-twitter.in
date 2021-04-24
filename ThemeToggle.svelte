<script>
    import { getContext } from "svelte";
    const { theme, toggle } = getContext("theme");
  </script>
  
  <button class="theme-button" on:click={toggle}>{$theme.name}</button>

  <style>
    .theme-button {
      font-size: 0.75rem;
      height: 25%;
      align-self: center;
      background-color: var(--theme-background);
	    padding: 4px 8px;
	    border-radius: 5px;
    }
  </style>
