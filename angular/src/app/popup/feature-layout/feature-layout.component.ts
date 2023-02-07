import { FeatureInfo, FeatureInfoService } from './../feature.service';
import { StorageService } from './../../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-layout',
  templateUrl: './feature-layout.component.html',
  styleUrls: ['./feature-layout.component.scss']
})
export class FeatureLayoutComponent implements OnInit {

  currentFeature: FeatureInfo
  constructor(
    private storageService: StorageService,
    private featureInfoService: FeatureInfoService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const lastUsedFeature = this.storageService.get('lastUsedFeature')
    this.currentFeature = this.featureInfoService.getAllFeatureInfo().filter(val => val.key === lastUsedFeature)[0]

  }

  backIndex(): void {
    this.storageService.clear('lastUsedFeature');
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }
}
