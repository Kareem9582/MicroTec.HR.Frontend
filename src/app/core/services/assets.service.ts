import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AssetType } from '../models/ui/enums/asset-type';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly assetBasePath = {
    [AssetType.ICON]: 'assets/images/icons',
    [AssetType.LOGO]: 'assets/images/logo',
    [AssetType.DOCUMENT]: 'assets/documents'
  };

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Get safe asset URL with type checking
   * @param type - AssetType enum value
   * @param filename - Asset filename without path
   * @returns Sanitized resource URL
   */
  getAsset(type: AssetType, filename: string): SafeResourceUrl {
    const path = `${this.assetBasePath[type]}/${filename}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  /**
   * Preload critical assets
   * @param assets - Array of assets to preload
   */
  preloadAssets(assets: { type: AssetType; filename: string }[]): void {
    assets.forEach(asset => {
      const img = new Image();
      img.src = `${this.assetBasePath[asset.type]}/${asset.filename}`;
    });
  }
}