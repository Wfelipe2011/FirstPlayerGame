import { JobWork } from "../../index.js";

export class JobInfo {
  start(config) {
    JobWork.start({
      config: config,
      start: this.execute.bind(this),
    });
  }

  async execute() {
    console.log("Chamou");
  }
}
