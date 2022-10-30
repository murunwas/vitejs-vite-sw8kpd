<script context="module">
    export const key = {};
  </script>

<script lang="ts">
    import { setContext } from 'svelte';
	
	import { onMount } from 'svelte';
    let isLoaded= false;

	onMount(async () => {
		
	});

	async function loaded() {
		isLoaded=true;
	}

    setContext(key, {
    f:()=>{
        let data =  new window.dfd.dateRange({"start":"2000-01-01 00:00", period:100, freq:"m"})
let sf = new window.dfd.Series(data)
//print the series
sf.print()
    },
    d:()=>{
        let data = {
    Abs: [20.2, 30, 47.3],
    Count: [34, 4, 5],
    "country code": ["NG", "FR", "GH"],
};

let df = new dfd.DataFrame(data);
const csv = dfd.toJSON(df);
        console.log(csv);
//dfd.toExcel(df, {filePath: 'path/to/file.xlsx',download: true})

    }
  });
</script>

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/danfojs@1.1.0/lib/bundle.min.js"
		on:load={loaded}></script>
</svelte:head>

{#if isLoaded}
<slot/>
{/if}