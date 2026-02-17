export enum AppState {
  START_SCREEN = 'START_SCREEN',
  EXPLORATION = 'EXPLORATION',
}

export type ModuleView = 'FULL' | 'CREW' | 'SERVICE' | 'LVM3' | 'CROSS_SECTION' | 'INTERIOR';

export interface GaganyaanPart {
  id: string;
  name: string;
  description: string;
}