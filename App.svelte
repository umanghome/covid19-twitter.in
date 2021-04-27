<script>
  import Modal, { bind } from 'svelte-simple-modal';

  import Tips from './Tips.svelte';
  import Feedback from './Feedback.svelte';
  import OtherResources from './OtherResources.svelte';
  import Donations from './Donations.svelte';
  import GeneratedLinksModal from './GeneratedLinksModal.svelte';
  import Ad from './Ad.svelte';

  import { POPULAR_CITIES, STORAGE_KEY, LocalStorage, capitalCase } from './utils';
  import { modal } from './store';

  const inputs = {
    cities: "",
    otherAlsoSearchFor: "",
    otherExcludedKeywords: '',
  };
  const checkboxes = {
    nearMe: false,
    verifiedOnly: true,
    excludeUnverified: true,
  };
  const alsoSearchFor = {
    beds: {
      keywords: ["bed", "beds"],
      checked: true
    },
    ICU: {
      keywords: ["icu"],
      checked: true,
    },
    oxygen: {
      keywords: ["oxygen"],
      checked: true
    },
    ventilator: {
      keywords: ["ventilator", "ventilators"],
      checked: true
    },
    tests: {
      keywords: ["test", "tests", "testing"],
      checked: false,
    },
    fabiflu: {
      keywords: ["fabiflu"],
      checked: false
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
    food: {
      keywords: ["tiffin", "food"],
      checked: false
    },
    ambulance: {
      keywords: ["ambulance"],
      checked: false
    },
  };
  const excludeKeywords = {
    needed: {
      keywords: ["needed", "need", "needs"],
      checked: true,
    },
    required: {
      keywords: ["required", "require", "requires", "requirement", "requirements"],
      checked: true,
    }
  };

  let links = [];
  let previouslySearched = LocalStorage.getItem(STORAGE_KEY.generated_links, []);
  let popularCityLinks = [];

  $: alsoSearchFor, inputs, checkboxes, excludeKeywords, generateLinks();
  $: alsoSearchFor, inputs, checkboxes, excludeKeywords, generatePopularCityLinks();

  function getAlsoSearchForString() {
    const keywords = Object.keys(alsoSearchFor).reduce((keywordsSoFar, item) => {
      if (alsoSearchFor[item].checked) {
        return keywordsSoFar.concat(alsoSearchFor[item].keywords);
      } else {
        return keywordsSoFar;
      }
    }, []);

    if (inputs.otherAlsoSearchFor) {
      keywords.push(inputs.otherAlsoSearchFor);
    }

    if (keywords.length > 0) {
      return `(${keywords.join(" OR ")})`;
    } else {
      return "";
    }
  }

  function getExcludedKeywordsString() {
    const keywords = Object.keys(excludeKeywords).reduce((keywordsSoFar, item) => {
      if (excludeKeywords[item].checked) {
        return keywordsSoFar.concat(excludeKeywords[item].keywords);
      } else {
        return keywordsSoFar;
      }
    }, []);

    if (inputs.otherExcludedKeywords) {
      keywords.push(inputs.otherExcludedKeywords);
    }

    return keywords.map(keyword => `-"${keyword}"`).join(' ');
  }

  function generateCityLinkObject (city) {
    return {
      city,
      href: generateLinkForCity(city)
    };
  }

  function generateLinkForCity(city) {
    const base = `https://twitter.com/search`;
    const params = new URLSearchParams();

    const query = [
      checkboxes.verifiedOnly && "verified",
      city.trim(),
      getAlsoSearchForString(),
      checkboxes.excludeUnverified && '-"not verified"',
      checkboxes.excludeUnverified && '-"unverified"',
      getExcludedKeywordsString(),
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

  function generateLinks () {
    if (!inputs.cities) {
      links = [];
      
      return;
    }

    const cities = inputs.cities
      .split(",")
      .map(city => city.trim())
      .filter(Boolean);

    links = cities.map(generateCityLinkObject);
  }

  function generatePopularCityLinks() {
    popularCityLinks = POPULAR_CITIES.map(generateCityLinkObject);
  }

  function generate() {
    if (!inputs.cities) {
      alert("Please enter city name");
      return;
    }

    modal.set(bind(GeneratedLinksModal, { links }));

    LocalStorage.setItem(STORAGE_KEY.generated_links, links);
  }

  function clearSavedLinks() {
    previouslySearched = [];

    LocalStorage.removeItem(STORAGE_KEY.generated_links);
  }
</script>

<style>
  .spaced > * {
    margin-bottom: 12px;
  }

  #cities {
    border: 2px solid #444444;
    display: block;
    width: 100%;
    font-size: 1.2rem;
    padding: 4px 8px;
    margin-bottom: 12px;
  }

  hr {
    margin: 12px auto;
  }

  #options .spaced > * {
    padding: 0 20px 0 0;
  }

  #clear {
    font-size: 0.8rem;
  }

  .split-two-one {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .split-three-two {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 460px) {
    .split-three-two {
      grid-template-columns: 1fr 1fr;
    }

    .split-two-one {
      grid-template-columns: 1fr;
    }
  }

  .other-input {
    margin-top: 4px;
  }

  .checkbox-fields > * {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 4px 0;
  }

  .checkbox-fields label {
    flex-grow: 1;
  }

  .checkbox-fields input {
    flex-shrink: 0;
  }

  #generate-button-container {
    margin-top: 24px;
  }
</style>

<main>
	<h1>Twitter Search for COVID</h1>

  <hr />

  <nav class="split-two-one">
    <a href="#frequent-searches">Frequently Searched Cities</a>
    {#if previouslySearched.length > 0}
      <a href="#previous-searches">Previous Searches</a>
    {/if}
  </nav>  

  <hr />

  <Tips />

  <hr />

  <div>
    <h2>Search</h2>
    
    <form on:submit|preventDefault={generate}>
      <div>
        <label for="cities">Name of city</label>
        <br />
        <input type="text" bind:value={inputs.cities} id="cities" placeholder="Enter city name here" />
      </div>

      <div class="split-three-two checkbox-fields">
        {#each Object.keys(alsoSearchFor) as item (item)}
          <div>
            <input type="checkbox" bind:checked={alsoSearchFor[item].checked} id={`alsoSearchFor-${item}`} />
            <label for={`alsoSearchFor-${item}`}>{capitalCase(item)}</label>
          </div>
        {/each}
      </div>

      <div class="other-input">
        <label for="alsoSearchFor-other">Other:</label>
        <input type="text" bind:value={inputs.otherAlsoSearchFor} id="alsoSearchFor-other" />
      </div>

      <div id="generate-button-container">
        <button>Search or Generate Links</button>
      </div>

      <hr />

      <div id="options">
        <div class="split-two-one spaced">
          <div>
            <input type="checkbox" bind:checked={checkboxes.verifiedOnly} id="verifiedOnly" />
            <label for="verifiedOnly">
              Show verified tweets only
              <br />
              <strong>Uncheck this for smaller cities</strong>
              <br />
              (Tweet should contain "verified")
            </label>
          </div>

          <div>
            <input type="checkbox" bind:checked={checkboxes.excludeUnverified} id="excludeUnverified" />
            <label for="excludeUnverified">
              Exclude unverified tweets
              <br />
              (Tweet should not contain "not verified" and "unverified")
            </label>
          </div>

          <div>
            Tweets should <strong>NOT</strong> have these words:
      
            {#each Object.keys(excludeKeywords) as item (item)}
              <div>
                <input type="checkbox" bind:checked={excludeKeywords[item].checked} id={`excludeKeywords-${item}`} />
                <label for={`excludeKeywords-${item}`}>{item} (and its variants)</label>
              </div>
            {/each}
      
            <div class="other-input">
              <label for="excludeKeywords-other">Other:</label>
              <input type="text" bind:value={inputs.otherExcludedKeywords} id="excludeKeywords-other" />
            </div>
          </div>
      
          <div>
            <input type="checkbox" bind:checked={checkboxes.nearMe} id="nearMe" />
            <label for="nearMe">Show Tweets near me</label>
          </div>
    
        </div>
      </div>
    </form>

    <Modal show={$modal} transitionBgProps={{ duration: 0 }} transitionWindowProps={{ duration: 0 }} />
  </div>

  <hr />

  <Ad />

  <hr />

  <div id="frequent-searches">
    <h2>Frequently Searched Cities</h2>

    <ol class="split-three-two">
      {#each popularCityLinks as link (link.href)}
        <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
      {/each}
    </ol>
  </div>

  <hr />

  {#if previouslySearched.length > 0}
    <div id="previous-searches">
      <h2>Previous Searches</h2>

      <ol class="split-three-two">
        {#each previouslySearched as link (link.href)}
          <li><a href={link.href} target="_blank" rel="noopener noreferrer">{capitalCase(link.city)}</a></li>
        {/each}
      </ol>

      <button id="clear" on:click|preventDefault={clearSavedLinks}>Clear Previous Searches</button>
    </div>

    <hr />
  {/if}

  <OtherResources />

  <hr />
  <Donations />

  <hr />

  <Feedback />
  
</main>
