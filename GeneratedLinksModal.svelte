<script>
  import GeneratedLinks from './GeneratedLinks.svelte';
  import Tips from './Tips.svelte';

  export let links;
</script>

<style>
  .ad {
    background: #777777;
    color: white;
    height: 100px;
    width: 300px;
    max-width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  p {
    text-align: center;
  }
</style>

<Tips large={false} />
<GeneratedLinks {links} />
<p>Our sponsor donated &lt;amount&gt; to &lt;place&gt; to show you this ad</p>
<div class="ad">Your ad goes here</div>