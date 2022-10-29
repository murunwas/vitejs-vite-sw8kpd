<script lang="ts">
  import {connect} from "./store/base"
  import {TelemetryStore} from "./store/telemetryStore"
  
  const { autorun } = connect();
  let vm = new TelemetryStore();
  let d=null;

  $: autorun(() => {
     d = vm.isMinute
    });
</script>

{d}

<button on:click={()=>vm.toggleGranularity()}>toggle</button>

