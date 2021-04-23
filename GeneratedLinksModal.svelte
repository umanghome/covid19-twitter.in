<script>
  import GeneratedLinks from './GeneratedLinks.svelte';
  import Tips from './Tips.svelte';

  export let links;
</script>

<Tips />
<GeneratedLinks {links} />