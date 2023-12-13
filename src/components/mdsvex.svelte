<!-- <script lang="ts">
  import { createTableOfContents } from '@melt-ui/svelte';
  import Toc from './toc.svelte';
  import AdSlot from './AdSlot.svelte';
  import SEO from './SEO.svelte';

  const { title, desc } = $props<{ title: string; desc: string }>();

  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    activeType: 'highest-parents',
    selector: '#article'
  });
</script>

{#if title}
  <SEO {title} {desc} />
{/if}

<div
  class="hero min-h-screen bg-neutral"
  style="background-image: url(https://willin.wang/images/bg.jpg);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center">
    <div class="max-w-full">
      {#if title}
        <h1 class="text:2xl lg:text-5xl font-bold glass rounded-lg p-4">
          {@html title}
        </h1>
      {/if}
      {#if desc}
        <p class="py-6">{@html desc}</p>
      {/if}
    </div>
  </div>
</div>

<div class="grid grid-cols-3">
  <article
    id="article"
    class="col-span-3 lg:col-span-2 prose prose-sm md:prose-base w-full !max-w-full p-2 lg:p-10">
    <AdSlot />
    <slot />
  </article>
  <aside class="hidden lg:block p-10">
    {#key $headingsTree}
      <Toc tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
    {/key}
  </aside>
</div> -->
