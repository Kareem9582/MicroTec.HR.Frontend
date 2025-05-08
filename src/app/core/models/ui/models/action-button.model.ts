import { SafeResourceUrl } from "@angular/platform-browser";

export interface ActionButton {
    iconUrl: SafeResourceUrl;
    text: string;
    discription:string;
    variant: string;
    action: () => void;
  }