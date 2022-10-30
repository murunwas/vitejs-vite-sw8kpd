<script lang="ts">
  import {onMount} from "svelte"
  import {connect} from "./store/base"
  import {TelemetryStore} from "./store/telemetryStore"
  import { getContext, tick } from "svelte";
  import { key } from "./Danfojs.svelte";
  const { f,d } = getContext(key);
  
  const { autorun } = connect();
  let vm = new TelemetryStore();
 
  let ds=null;

  $: autorun(() => {
     ds = vm.isMinute
    });

    onMount(()=>{
      let data = {
    Abs: [20.2, 30, 47.3],
    Count: [34, 4, 5],
    "country code": ["NG", "FR", "GH"],
};


let df = new window.dfd.DataFrame(data,{index:data["country code"]});
const csv = window.dfd.toJSON(df.column("Count"));
        console.log(csv);
        df.print()
    })

   
</script>

{ds}


<button on:click={()=>f()}>d</button>
<button on:click={d}>ds</button>
<button on:click={()=>vm.toggleGranularity()}>toggle</button>

