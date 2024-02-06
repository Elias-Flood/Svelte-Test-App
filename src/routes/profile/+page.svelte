<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import TitleText from '$lib/elements/titleText.svelte';
	import SubTitleText from '$lib/elements/subTitleText.svelte';
	import Body from '$lib/elements/body.svelte';
	import BodyText from '$lib/elements/bodyText.svelte';
	import Box from '$lib/elements/box.svelte';
	import Header from '$lib/elements/header.svelte';
	import Logo from '$lib/elements/logoText.svelte';

    import * as Dialog from "$lib/components/ui/dialog";
    import * as Avatar from "$lib/components/ui/avatar";
    import { Skeleton } from "$lib/components/ui/skeleton";
</script>

<div class="h-screen bg-scroll bg-gradient-to-r from-purple-500 to-pink-500">
	<Header>
		<div class="grid-rows-3">
			<a href="/"><Logo>Navbar</Logo></a>
			<a href="/orders"><Button variant="ghost">Navlink 1</Button></a>
			<Button variant="ghost">Navlink 2</Button>
			<Button variant="ghost">Navlink 3</Button>
		</div>
	</Header>

	<Body>
		<div>
			<TitleText>Profile Styling Test</TitleText>
			<SubTitleText>Simply testing...</SubTitleText>
            

            <Dialog.Root>
                <Dialog.Trigger>Open Loading</Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Profile</Dialog.Title>
                    <hr/>
                    <Dialog.Description>
                        <div class="grid grid-rows-3 grid-flow-col gap-4">
                            <div class="row-span-3">
                                <Skeleton class="w-[90px] h-[90px] rounded-full" />
                            </div>
                            <div class="col-span-2">
                                <Skeleton class="w-[100%] h-[30px] rounded-5" />
                            </div>
                            <div class="row-span-2 col-span-2">
                                <Skeleton class="w-[100%] h-[60px] rounded-5" />
                            </div>
                        </div>
                    </Dialog.Description>
                  </Dialog.Header>
                </Dialog.Content>
              </Dialog.Root>
		</div>
	</Body>
</div>


