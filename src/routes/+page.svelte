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

<svelte:head>
	<title>Тотсофт | Аккредитованная IT-компания | Разработка ПО под ключ</title
	>
	<meta
		name="title"
		content="Тотсофт | Аккредитованная IT-компания | Разработка ПО под ключ"
	/>
	<meta
		name="description"
		content="Экспертная разработка без легаси и бюрократии. От аутсорса команд до разработки Enterprise-систем под ключ. Middle+ специалисты, HighLoad проекты, AI Ready решения."
	/>
	<meta
		name="keywords"
		content="разработка ПО, IT-компания, веб-разработка, мобильная разработка, аутсорсинг, аутстаффинг, технический консалтинг"
	/>
	<meta
		name="author"
		content="ООО Тотсофт"
	/>
	<meta
		name="robots"
		content="index, follow"
	/>
	<link
		rel="canonical"
		href="https://totsoft.ru"
	/>

	<!-- Open Graph / Facebook -->
	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:url"
		content="https://totsoft.ru"
	/>
	<meta
		property="og:title"
		content="Тотсофт | Аккредитованная IT-компания"
	/>
	<meta
		property="og:description"
		content="Экспертная разработка без легаси и бюрократии. От аутсорса команд до разработки Enterprise-систем под ключ."
	/>
	<meta
		property="og:image"
		content="https://totsoft.ru/og-image.jpg"
	/>
	<meta
		property="og:locale"
		content="ru_RU"
	/>
	<meta
		property="og:site_name"
		content="Тотсофт"
	/>

	<!-- Twitter -->
	<meta
		property="twitter:card"
		content="summary_large_image"
	/>
	<meta
		property="twitter:url"
		content="https://totsoft.ru"
	/>
	<meta
		property="twitter:title"
		content="Тотсофт | Аккредитованная IT-компания"
	/>
	<meta
		property="twitter:description"
		content="Экспертная разработка без легаси и бюрократии. От аутсорса команд до разработки Enterprise-систем под ключ."
	/>
	<meta
		property="twitter:image"
		content="https://totsoft.ru/og-image.jpg"
	/>

	<!-- Structured Data (JSON-LD) -->
	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ООО Тотсофт",
      "alternateName": "Тотсофт",
      "url": "https://totsoft.ru",
      "logo": "https://totsoft.ru/logo.png",
      "description": "Аккредитованная IT-компания, специализирующаяся на разработке ПО, веб-разработке, мобильной разработке и техническом консалтинге",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "RU"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "dev@totsoft.net",
        "availableLanguage": "Russian"
      },
      "sameAs": []
    }
  </script>`}
</svelte:head>

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
			<ErrorFallback
				error={error as Error | undefined}
				{reset}
			/>
		{/snippet}
	</svelte:boundary>
	<Footer />
</div>
