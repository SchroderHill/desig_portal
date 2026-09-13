import { i as r } from "./pako.esm-DLNJzcmj.js";
import { B as a } from "./basedecoder-Bgma6Vmx.js";
class s extends a {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(e) {
    return r(new Uint8Array(e)).buffer;
  }
}
export {
  s as default
};
