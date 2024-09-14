import { StorageService } from './../../service/storage.service';
import { FeatureInfo, FeatureInfoService } from './../feature.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private featureInfoService: FeatureInfoService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    for (const feature of this.featureInfoService.getAllFeatureInfo()) {
      this.features.push(feature)
    }
  }
  lastUsedFeatureKey: string = 'lastUsedFeature'
  features: Array<FeatureInfo> = new Array<FeatureInfo>()
  ngOnInit(): void {
    const lastUsedFeature = this.storageService.get(this.lastUsedFeatureKey);
    if (lastUsedFeature) {
      const feature:FeatureInfo = this.features.find(val => val.key === lastUsedFeature);
      if (feature) {
        this.gotoFeature(feature)
      }
    }
  }

  gotoFeature(feature: FeatureInfo): void {
    this.router.navigate(['feature', feature.key], { relativeTo: this.activatedRoute.parent }).then(val => {
      console.log(val)
    })
    this.storageService.set(this.lastUsedFeatureKey, feature.key);
  }
}


