<script lang="ts">
  import {onMount} from "svelte"
  import Counter from "./lib/Counter.svelte"
  import Danfojs from "./lib/Danfojs.svelte"
  
  import {merge1} from "./lib/app"

  import {formatter} from "./lib/f"
  import { initChart } from "./lib/utils";

  import data from "./lib/data.json";
  var m = merge1(data)

  let elem

  

  onMount(()=>{
    initChart(elem,m)
    formatter(data)
  })
</script>

<main>
  <h1>Vite + Svelte</h1>
  <div bind:this={elem} style="width: 100vw;height:400px;"></div>
<!-- <pre>{JSON.stringify(m,null,2)}</pre> -->
 <hr/>
 <Danfojs>
 <Counter/>
</Danfojs>
</main>
