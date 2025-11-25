<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import TrustBar from '$lib/components/TrustBar.svelte';
	import Services from '$lib/components/Services.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import About from '$lib/components/About.svelte';
	import Process from '$lib/components/Process.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ErrorFallback from '$lib/components/ErrorFallback.svelte';
</script>

<!-- Meta tags и JSON-LD определены в app.html для главной страницы -->

<div class="min-h-screen bg-dark-900 text-white overflow-x-hidden font-sans">
	<Navbar />
	<svelte:boundary>
		<main>
			<Hero />
			<TrustBar />
			<Services />
			<TechStack />
			<About />
			<Process />
			<ContactForm />
		</main>
		{#snippet failed(error, reset)}
			<ErrorFallback error={error as Error | undefined} {reset} />
		{/snippet}
	</svelte:boundary>
	<Footer />
</div>
