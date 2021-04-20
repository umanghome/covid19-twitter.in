<script>
  import { tick } from "svelte";

  const inputs = {
    cities: "",
    other: ""
  };
  const checkboxes = {
    nearMe: false,
    verifiedOnly: true
  };
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
      checked: true
    },
    fabiflu: {
      keywords: ["fabiflu"],
      checked: true
    },
    remdesivir: {
      keywords: ["remdesivir"],
      checked: false
    },
    favipiravir: {
      keywords: ["favipiravir"],
      checked: false
    },
    tocilizumab: {
      keywords: ["tocilizumab"],
      checked: false
    },
    plasma: {
      keywords: ["plasma"],
      checked: false
    },
    tiffin: {
      keywords: ["tiffin"],
      checked: false
    }
  };
  let links = [];
  let popularCityLinks = [];

  $: alsoSearchFor, inputs, checkboxes, generatePopularCityLinks();

  const POPULAR_CITIES = [
    "delhi",
    "pune",
    "mumbai",
    "bangalore",
    "thane",
    "hyderabad",
    "nagpur",
    "lucknow",
    "ahmedabad",
    "chennai",
    "kolkata"
  ];

  function generatePopularCityLinks() {
    popularCityLinks = POPULAR_CITIES.map(city => {
      return {
        city,
        href: generateLinkForCity(city)
      };
    });
  }

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

    const query = [
      checkboxes.verifiedOnly && "verified",
      city.trim(),
      getAlsoSearchForString()
    ]
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

    tick().then(() => {
      const firstItem = document.querySelector("#city-links li");

      if (firstItem) {
        firstItem.scrollIntoView();
        firstItem.focus();
      }
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
    margin-top: 60px;
  }

  li img {
    max-width: 300px;
    height: auto;
  }

  .split {
    display: flex;
    align-items: top;
    flex-wrap: wrap;
  }

  #tips {
    width: 100%;
  }

  #city-links {
    border: 1px dashed blue;
  }

  .highlight-red {
    border: 1px solid red;
    padding: 4px;
  }

  @media screen and (min-width: 769px) {
    #main-content {
      margin-right: 20px;
      max-width: calc(100% - 20ch - 20px - 1em);
    }

    #quick-links {
      max-width: 20ch;
      flex-grow: 0;
    }

    .only-mobile {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .split > * {
      width: 100%;
    }

    #quick-links {
      order: 1;
    }

    #tips {
      order: 2;
    }

    #main-content {
      order: 3;
    }

    #other-resources {
      order: 4;
    }

    .list-split-on-mobile {
      display: flex;
      flex-wrap: wrap;
      padding-left: 1em;
    }

    .list-split-on-mobile > * {
      width: 50%;
    }
  }

  @media screen and (max-width: 320px) {
    .list-split-on-mobile > * {
      width: 100%;
    }
  }
</style>

<main>
	<h1>Twitter Search for COVID</h1>
	
  <div class="split">
    <div id="main-content">
      <h2>Search by city/cities</h2>
      <form on:submit|preventDefault={generate}>
        <div>
          <label for="cities">List of cities (comma-separated, e.g. indore, jamnagar)</label>
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

        <ol id="city-links">
          {#each links as link (link.href)}
            <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
          {/each}
        </ol>
      {/if}
    </div>
    <div id="quick-links">
      <h2>Quick Links</h2>

      <ol class="list-split-on-mobile">
        {#each popularCityLinks as link (link.href)}
          <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
        {/each}
      </ol>

      <h3 class="only-mobile highlight-red">Scroll down to search for more cities and keywords</h3>
    </div>
    <div id="tips">
      <h2>Tips</h2>
      <ol>
        <li>Check for replies under the tweets</li>
        <li>
          Make sure search results are sorted by "Latest"
          <br />
          <img src="/sort-click-here.jpg" alt="" />
        </li>
      </ol>
    </div>
    <div id="other-resources">
      <h2>Other Resources</h2>
      <ul>
        <li><a href="https://covidfacts.in/" target="_blank" rel="noopener noreferrer">covidfacts.in</li>
      </ul>
    </div>
  </div>

  <div class="feedback">
    <div><a href="https://twitter.com/umanghome/status/1383759182495588355" target="_blank" rel="noopener noreferrer">Got feedback?</a></div>
    <div><a href="https://github.com/umanghome/twitter-search-covid19" target="_blank" rel="noopener noreferrer">Source code</a></div>
    <div>Made by <a href="https://twitter.com/umanghome" target="_blank" rel="noopener noreferrer">Umang</a></div>
  </div>
</main>