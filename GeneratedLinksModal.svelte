<script>
  import GeneratedLinks from './GeneratedLinks.svelte';
  import Tips from './Tips.svelte';

  export let links;
</script>

<GeneratedLinks {links} />
<Tips large={false} />
