<script>
	import '../app.pcss';
</script>

<div class="flex container">
	<aside class="border border-2 border-solid h-[calc(100vh)] top-14 shrink-0">
		<nav class="text-sm leading-5">
			<div class="border border-2 ">
				<img src="https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"/>
			</div>
			<!-- 01 Side Menu -->
			<div class="border border-2">
				06 Article Body
			</div>
		</nav>
	</aside>
	<div class="grow">
		<slot />
	</div>
</div>
