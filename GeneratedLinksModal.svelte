<script>
  import GeneratedLinks from './GeneratedLinks.svelte';
  import Tips from './Tips.svelte';
  import Ad from './Ad.svelte';

  export let links;
</script>

<Tips large={false} />
<GeneratedLinks {links} />
<Ad />