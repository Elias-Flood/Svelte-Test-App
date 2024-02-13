<script lang=ts>
	import Button from '$lib/components/ui/button/button.svelte';
    import Logo from '$lib/elements/logoText.svelte';
</script>
<div class="px-12 py-2  bg-stone-800 border-solid text-slate-100 font-bold">
    <div class="grid-rows-3">
        <Logo>Navbar</Logo>
        <a href="/"><Button variant="link">Home</Button></a>
        <a href="/movieSearch"><Button variant="link">Search Movies</Button></a>
        <a href="/movieList"><Button variant="link">Trending Movies</Button></a>
    </div>
    <slot></slot>
</div>