import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectAsset } from '@core/models/ui/models/project-asset.model';
import { AssetsService } from '@core/services/assets.service';
import { AssetType } from '@core/models/ui/enums/asset-type';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  standalone : true
})
export class AppHeaderComponent implements OnInit{
  logoUrl!: SafeResourceUrl;
  logoAlt :string = 'Company Logo';
  logoLink : string = '/';
  icons!: projectAsset[];

  constructor(private asset: AssetsService) {}
  ngOnInit(): void {
    this.logoUrl = this.asset.getAsset(AssetType.LOGO, 'company.svg');
    this.icons = [
      {
        src : this.asset.getAsset(AssetType.ICON, 'apps.svg'),
        alt : 'Applications',
        action: () => this.OpenApps(),
      },
      {
        src: this.asset.getAsset(AssetType.ICON, 'notification.svg'),
        alt: `Notifications`,
        action: () => this.showNotifications()
      }
    ];
  }
  OpenApps(): void {
    console.log("Apps Icon Pressed");
  }
  showNotifications(): void {
    console.log("Notifications Icon Pressed");
  }
}