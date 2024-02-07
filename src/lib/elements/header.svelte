<script lang=ts>
	import Button from '$lib/components/ui/button/button.svelte';
    import Logo from '$lib/elements/logoText.svelte';
</script>
<div class="px-12 py-2  bg-stone-800 border-solid text-slate-100 font-bold">
    <div class="grid-rows-3">
        <Logo>Navbar</Logo>
        <a href="/"><Button variant="ghost">Home</Button></a>
        <a href="/orders"><Button variant="ghost">Trending Movies</Button></a>
        <Button variant="ghost">Nowhere</Button>
    </div>
    <slot></slot>
</div>