<script>
  import { onMount } from "svelte";
  import FibWorker from "$lib/fib.worker?worker";

  let worker;
  let position = 0;
  let fibPromise;

  function asyncFib(n) {
    if (!worker) return Promise.reject();

    return new Promise((resolve, reject) => {
      worker.onerror = reject;
      worker.onmessage = (e) => {
        resolve(e.data);
      };

      worker.postMessage(parseInt(n));
    });
  }

  function handleSubmit() {
    if (!worker) return;
    fibPromise = asyncFib(position);
    position = 0;
  }

  onMount(async () => {
    worker = new FibWorker();
  });
</script>

<h1>Fibonacci Calculator</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label for="position">Position</label>
  <input
    bind:value={position}
    id="position"
    name="position"
    type="number"
    min="0"
    step="1"
  />
  <button type="submit">Calculate</button>
</form>

{#if fibPromise}
  <p>
    {#await fibPromise}
      Calculating...
    {:then result}
      The result is {result}
    {/await}
  </p>
{/if}
