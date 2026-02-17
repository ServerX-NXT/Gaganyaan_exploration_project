import React, { Component, ReactNode } from 'react';
import { Html, OrbitControls } from '@react-three/drei';

interface Props {
  children: ReactNode;
  modelName: string;
}

interface State {
  hasError: boolean;
}

export class ModelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(`Error loading model ${this.props.modelName}:`, error);
  }

  render() {
    if (this.state.hasError) {
      const fileName = this.props.modelName.split('/').pop();
      return (
        <group>
          <OrbitControls enablePan={true} />
          <ambientLight intensity={0.5} />
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#ff0000" wireframe />
          </mesh>
          <Html position={[0, 1.5, 0]} center zIndexRange={[100, 0]}>
            <div className="bg-red-950/90 text-white p-4 rounded-xl border border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.4)] text-center min-w-[280px] backdrop-blur-md font-sans">
              <div className="flex items-center justify-center gap-2 mb-2 text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                <h3 className="font-bold tracking-wider text-sm">MODEL NOT FOUND</h3>
              </div>
              <p className="text-xs font-mono text-gray-300 mb-3 bg-black/40 p-1 rounded">
                {this.props.modelName}
              </p>
              <div className="text-[11px] text-left bg-black/60 p-3 rounded border border-white/10 space-y-1">
                <p className="text-gray-400 font-semibold">Action Required:</p>
                <p>1. Create folder: <span className="text-yellow-400 font-mono">public/3D-hyphen-models</span></p>
                <p>2. Upload file: <span className="text-yellow-400 font-mono">{fileName}</span></p>
              </div>
            </div>
          </Html>
        </group>
      );
    }

    return this.props.children;
  }
}