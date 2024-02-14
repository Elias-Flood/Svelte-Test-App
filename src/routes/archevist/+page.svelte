<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Body from '$lib/elements/body.svelte';
	import Box from '$lib/elements/box.svelte';
	import Header from '$lib/elements/header.svelte';

	import { Progress } from "$lib/components/ui/progress";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";

	import { onMount } from "svelte";
	import { writable, type Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import { AlignJustify } from 'lucide-svelte';
	import { LibraryBig } from 'lucide-svelte';
	import { Search } from 'lucide-svelte';
	import { Separator } from "$lib/components/ui/separator";

</script>

<div class="container">
	<div class="grid grid-flow-col grid-cols-9 grid-rows-1 h-screen">
		<div class="border border-2 col-span-2 h-[100%]">
			<div class="border border-2 ">
				<img src="https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg" alt="03 Image"/>
			</div>
			<!-- 01 Side Menu -->
			<div class="border border-2">
				06 Article Body
			</div>
		</div>
		<div class="border border-2 col-span-7 h-[100%]">
			<div class="border border-2 flex items-center h-[5%] bg-secondary gap-4 p-4">
				<span>Link 1 </span>
				<span>Link 2 </span>
				<span>Link 3 </span>
			</div>
			<!-- 02 Body -->
			<div class="border border-2 h-[95%] overflow-y-scroll">
				<div class="border border-2 h-[10%]">
					<span class="text-2xl px-2">Article Title</span><span class="text-lg opacity-75">(Faction)</span><span class="text-base italic opacity-50 px-2">Lorem, Ipsum, Dolor</span>
					<p class="text-base italic  px-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
				</div>
				<div class="grid grid-flow-col grid-cols-6 h-[40%]">
					<div class="border border-2 col-span-3">
						<h2 class="text-lg p-2">Description</h2>
						<p class="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
					<div class="border border-2 col-span-3">
						Image Carousel
					</div>
				</div>
				<div>
					<div class="border border-2">
						<h2 class="text-lg p-2">Chapter Title</h2>
						<p class="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
					<div class="border border-2 grid grid-flow-col grid-cols-5 h-[40%]">
						<div class="col-span-2 p-4">
							<Card.Root>
								<Card.Header class="p-2">
								  <Card.Title>Card Title</Card.Title>
								  <Card.Description>Card Description</Card.Description>
								</Card.Header>
								<Card.Content>
									<!-- <div class="bg-no-repeat bg-cover bg-center h-screen" style="background-image: url(https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg)"></div> -->
								<img src="https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg" alt="03 Image"/>
								</Card.Content>
								<Card.Footer class="p-2">
								  <p>Card Footer</p>
								</Card.Footer>
							  </Card.Root>						
						</div>
						<div class="col-span-3">
							<h2 class="text-lg p-2">Image Text</h2>
							<p class="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
					</div>
					<div class="border border-2">
						<script lang="ts">
							import * as Table from "$lib/components/ui/table";
						  
							const invoices = [
							  {
								invoice: "INV001",
								paymentStatus: "Paid",
								totalAmount: "$250.00",
								paymentMethod: "Credit Card"
							  },
							  {
								invoice: "INV002",
								paymentStatus: "Pending",
								totalAmount: "$150.00",
								paymentMethod: "PayPal"
							  },
							  {
								invoice: "INV003",
								paymentStatus: "Unpaid",
								totalAmount: "$350.00",
								paymentMethod: "Bank Transfer"
							  },
							  {
								invoice: "INV004",
								paymentStatus: "Paid",
								totalAmount: "$450.00",
								paymentMethod: "Credit Card"
							  },
							  {
								invoice: "INV005",
								paymentStatus: "Paid",
								totalAmount: "$550.00",
								paymentMethod: "PayPal"
							  },
							  {
								invoice: "INV006",
								paymentStatus: "Pending",
								totalAmount: "$200.00",
								paymentMethod: "Bank Transfer"
							  },
							  {
								invoice: "INV007",
								paymentStatus: "Unpaid",
								totalAmount: "$300.00",
								paymentMethod: "Credit Card"
							  }
							];
						  </script>
						  
						  <Table.Root>
							<Table.Caption>A list of your recent invoices.</Table.Caption>
							<Table.Header>
							  <Table.Row>
								<Table.Head class="w-[100px]">Invoice</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head>Method</Table.Head>
								<Table.Head class="text-right">Amount</Table.Head>
							  </Table.Row>
							</Table.Header>
							<Table.Body>
							{#each {length: 10} as _, i}
							<Table.Row>
								<Table.Cell class="font-medium">INV00{i + 1}</Table.Cell>
								<Table.Cell>Paid</Table.Cell>
								<Table.Cell>Credit Card</Table.Cell>
								<Table.Cell class="text-right">$250.00</Table.Cell>
								</Table.Row>
							{/each}
							</Table.Body>
						  </Table.Root>
					</div>
				</div>
			</div>
		</div>
		
	  </div>
</div>
