<script lang="ts">
    import { greet } from './lib/greet';

    let name = $state('');
    const greeting = $derived(greet(name));
</script>

<main class="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-6 px-6 py-12">
    <h1 class="text-3xl font-semibold tracking-tight">Svelte template</h1>
    <p class="text-slate-600">A small starting point for your next frontend.</p>
    <div class="flex flex-col gap-2">
        <label for="name" class="font-medium">Your name</label>
        <input
            id="name"
            name="name"
            autocomplete="given-name"
            bind:value={name}
            class="rounded-lg border border-slate-400 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        />
    </div>
    <p role="status" class="text-xl font-medium">{greeting}</p>
</main>
