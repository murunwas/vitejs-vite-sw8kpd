import { makeAutoObservable } from "mobx";

export class TelemetryStore {
  isMinute = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleGranularity() {
    this.isMinute = !this.isMinute;
  }

  addMinuteGranularity() {}

  addGranularity() {}
}
