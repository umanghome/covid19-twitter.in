<script>
  export let links = [];

  import { capitalCase } from './utils';
</script>

<style>
  h3 {
    margin-bottom: 0;
  }

  p {
    color: red;
    font-size: 0.8rem;
    margin-top: 0;
  }

  ol {
    border: 1px dashed blue;
  }
</style>

<div>
  <h3>Your Generated Links</h3>

  {#if links.length > 0}
    <ol id="city-links">
      {#each links as link (link.href)}
        <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
      {/each}
    </ol>
  {:else}
    <p>Please enter a city name to generate links</p>
  {/if}
</div>