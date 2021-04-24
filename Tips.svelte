<script>
  export let large = true;
</script>
<style>
 .img-div{
     display: block;
     margin-left: auto;
     margin-right: auto;
     width: 50%;
 }
</style>
<div>
  <h2>Tips</h2>
  <ol>
    {#if large}
      <li><strong>Do NOT make advanced payments unless you are 100% sure about their authenticity</strong></li>
      <li>Check for replies under the tweets</li>
    {/if}
    <li>
      Make sure search results are sorted by "Latest"
      <br />
      <img class="img-div" src="sort-click-here.jpg" alt="" />
    </li>
  </ol>
</div>