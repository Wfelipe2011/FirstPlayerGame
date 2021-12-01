import { get } from "../../api.axios.js";
import { JobWork } from "../../index.js";

export class JobGet {
  start(config) {
    JobWork.start({
      config: config,
      start: this.execute.bind(this),
    });
  }

  async execute() {
    const data = await get('user_schedule') 
    console.log(data);
  }
}
