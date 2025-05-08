import { SafeResourceUrl } from "@angular/platform-browser";

export interface projectAsset {
    src: SafeResourceUrl;
    alt: string;
    action: () => void;
  }