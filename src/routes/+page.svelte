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
	import * as Table from '$lib/components/ui/table';

	let name = 'SmeltKit';

	class Mango {
		public InvoiceName?: string;
		public MangoStatus?: string;
		public mangoQuantity: number = 0;
		public mangoCost: number = 0;
		private _stat: number = 0;

		constructor(_invo: number, _stat: number, _Quan: number) {
			this.InvoiceName = 'MangoNr' + 0 + _invo;
			this.mangoQuantity = _Quan;
			console.log(typeof _stat)
			if(typeof _stat === "string"){
				_stat = parseInt(_stat)
			}
			switch (_stat) {
				case 2: {
					this.MangoStatus = 'Fresh';
					break;
				}
				case 1: {
					this.MangoStatus = 'Ripe';
					break;
				}
				default: {
					this.MangoStatus = 'Dirt';
					break;
				}
			}

			this.mangoCost = (_stat+1) * (_Quan*10);
		}
	}

let mangoList: Mango[] = [];
generateMangos(3);
function generateMangos(AmountOfInvoices: number){
	for (let i = 0; i < AmountOfInvoices; i++) {
		let rndFreshness = Math.floor(Math.random() * 3);
		let rndQuantity = Math.floor(Math.random() * 100) + 1;

		mangoList.push(new Mango(i, rndFreshness, rndQuantity));
	}

	//addNewMango();
}



let invoiceNumber: number = 0;
let mangoStatus: number = 0;
let mangoQuantity: number = 0;
function addNewMango(_x: number, _y: number, _z: number){
	let mango = new Mango(_x,_y,_z)
	mangoList = [...mangoList, mango];
	console.log("new" + mangoStatus);
}
	
</script>

<div class="h-screen bg-scroll bg-gradient-to-r from-purple-500 to-pink-500">
	<Header>
		<div class="grid-rows-3">
			<Logo>Navbar</Logo>
			<a href="/orders"><Button variant="ghost">Navlink 1</Button></a>
			<a href="/profile"><Button variant="ghost">Navlink 2</Button></a>
			<Button variant="ghost">Navlink 3</Button>
		</div>
	</Header>

	<Body>
		<div>
			<TitleText>Welcome to {name.toUpperCase()}</TitleText>
			<SubTitleText>Simply testing how one can make a page</SubTitleText>
			<BodyText>
				<p>
					Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation. I will
					now fill out this box with Lorem ipsum:
				</p>
				<br />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
			</BodyText>
			<hr
				class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
			/>
		</div>

		<div class="grid grid-cols-4 gap-4 py-2">
			<div class="col-span-1">
				<Box>
					<div class="h-full">
						<div>
							<labal for="invoiceNumber">Invoice Number:</labal>
							<Input type="number" bind:value={invoiceNumber} id="invoiceNumber"/>
						</div>
						<div>
							<labal for="mangoStatus">Mango Quality:</labal>
							<Input type="number" bind:value={mangoStatus} id="mangoStatus"/>
						</div>
						<div>
							<labal for="mangoQuantity">Quantity:</labal>
							<Input type="number" bind:value={mangoQuantity} id="mangoQuantity"/>
						</div>
						<hr class="my-4"/>
						<Button on:click={()=>addNewMango(invoiceNumber,mangoStatus,mangoQuantity)}>Place Order</Button>
					</div>
				</Box>
			</div>
			<div class="col-span-3">
				<Box>
					<SubTitleText>Mango Imports</SubTitleText>
					<Table.Root>
						<Table.Caption>A list of your recent invoices.</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-[100px]">Invoice</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head>Quantity</Table.Head>
								<Table.Head class="text-right">$$$</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each mangoList as item}
							<Table.Row>
								<Table.Cell class="font-medium">{item.InvoiceName}</Table.Cell>
									<Table.Cell>{item.MangoStatus}</Table.Cell>
									<Table.Cell>{item.mangoQuantity}</Table.Cell>
									<Table.Cell class="text-right">${item.mangoCost}</Table.Cell>
							</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</Box>
			</div>
		</div>
	</Body>
</div>
