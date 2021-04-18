<script>
  const inputs = {
    cities: "",
    other: ""
  };
  const checkboxes = {
    nearMe: false,
    verifiedOnly: true,
  }
  const alsoSearchFor = {
    beds: {
      keywords: ["bed", "beds"],
      checked: true
    },
    oxygen: {
      keywords: ["oxygen"],
      checked: true
    },
    ventilator: {
      keywords: ["ventilator", "ventilators"],
      checked: true,
    },
    hospitals: {
      keywords: ["hospitals", "hospital"],
      checked: true,
    },
    remdesivir: {
      keywords: ["remdesivir"],
      checked: false
    },
    plasma: {
      keywords: ["plasma"],
      checked: false,
    },
    tiffin: {
      keywords: ["tiffin"],
      checked: false
    }
  };
  let links = [];

  function getAlsoSearchForString() {
    const keywords = Object.keys(alsoSearchFor).reduce((keywordsSoFar, item) => {
      if (alsoSearchFor[item].checked) {
        return keywordsSoFar.concat(alsoSearchFor[item].keywords);
      } else {
        return keywordsSoFar;
      }
    }, []);

    if (inputs.other) {
      keywords.push(inputs.other);
    }

    if (keywords.length > 0) {
      return `(${keywords.join(" OR ")})`;
    } else {
      return "";
    }
  }

  function capitalCase(string) {
    if (!string) {
      return string;
    }

    return string[0].toUpperCase() + string.slice(1);
  }

  function generateLinkForCity(city) {
    const base = `https://twitter.com/search`;
    const params = new URLSearchParams();

    const query = [checkboxes.verifiedOnly && "verified", city.trim(), getAlsoSearchForString()]
      .filter(Boolean)
      .join(" ");

    params.set("q", query);

    params.set("f", "live");

    if (checkboxes.nearMe) {
      params.set("lf", "on");
    }

    const link = `${base}?${params.toString()}`;

    return link;
  }

  function generate() {
    if (!inputs.cities) {
      alert("Please enter city name(s)");
      return;
    }

    const cities = inputs.cities
      .split(",")
      .map(city => city.trim())
      .filter(Boolean);

    links = cities.map(city => {
      return {
        city,
        href: generateLinkForCity(city)
      };
    });
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  main {
    font-family: sans-serif;
    margin: 0 auto;
    max-width: 600px;
    padding: 0 20px 20px;
  }

  label,
  button {
    cursor: pointer;
  }

  button {
    font-size: 1.2rem;
  }

  form > div {
    margin-bottom: 12px;
  }

  li {
    margin-bottom: 4px;
  }

  .feedback {
    margin-top: 120px;
  }

  li img {
    max-width: 300px;
    height: auto;
  }
</style>

<main>
	<h1>Twitter Search for COVID</h1>
	
  <form on:submit|preventDefault={generate}>
    <div>
      <label for="cities">List of cities (comma-separated, e.g. mumbai, bengaluru)</label>
      <br />
      <input type="text" bind:value={inputs.cities} id="cities" />
    </div>

    <div>
      Also search for:
      
      {#each Object.keys(alsoSearchFor) as item (item)}
        <div>
          <input type="checkbox" bind:checked={alsoSearchFor[item].checked} id={`alsoSearchFor-${item}`} />
          <label for={`alsoSearchFor-${item}`}>{capitalCase(item)}</label>
        </div>
      {/each}

      <div>
        <label for="alsoSearchFor-other">Other:</label>
        <input type="text" bind:value={inputs.other} id="alsoSearchFor-other" />
      </div>

    </div>

    <div>
      <input type="checkbox" bind:checked={checkboxes.nearMe} id="nearMe" />
      <label for="nearMe">Near my location?</label>
    </div>

    <div>
      <input type="checkbox" bind:checked={checkboxes.verifiedOnly} id="verifiedOnly" />
      <label for="verifiedOnly">Show verified tweets only</label>
    </div>

    <div>
      <button>Generate Links</button>
    </div>
  </form>

  {#if links.length > 0}
    <h2>Links</h2>

    <ol>
      {#each links as link (link.href)}
        <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
      {/each}
    </ol>
  {/if}

  <h2>Tips</h2>
  <ol>
    <li>Check for replies under the tweets</li>
    <li>
      Make sure search results are sorted by "Latest"
      <br />
      <img src="/sort-click-here.jpg" alt="" />
    </li>
  </ol>

  <div class="feedback">
    <a class="feedback" href="https://twitter.com/umanghome/status/1383759182495588355" target="_blank" rel="noopener noreferrer">Got feedback?</a>
  </div>
</main>