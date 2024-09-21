


import { Injectable } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { String } from 'lodash';

@Injectable({ providedIn: 'root' })
export class FeatureInfoService {
  getAllFeatureInfo(): FeatureInfo[] {
    return [
      {
      key: 'date-convert',
      name: '时间转换',
      desc: '时间转换',
      icon: ['far', 'clock']
    },
    {
      key: 'random-string',
      name: '随机字符串',
      desc: '随机字符串',
      icon: ['fas', 'shuffle']
    },
    {
      key: 'encoding',
      name: '字符串编码',
      desc: '字符串编码',
      icon: ['fas', 'text-height']
    },

    {
      key: 'json',
      name: 'JSON',
      desc: 'JSON解析和格式化',
      icon: ['fas', 'code']
    },
    ]
  }
}

export class FeatureInfo {
  key: string
  name: string
  desc: string
  icon: IconProp
}
