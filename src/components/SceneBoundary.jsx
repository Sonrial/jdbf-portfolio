import { Component } from 'react';

function Illustration() {
  return <div className="scene-fallback" role="img" aria-label="Ilustración de un panel solar en capas, rodeado por una órbita de energía">
    <svg viewBox="0 0 400 300" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="200" cy="155" rx="160" ry="80" transform="rotate(-20 200 155)" /><path d="m75 160 125-65 125 65-125 65zM75 135l125-65 125 65-125 65z" /><path fill="currentColor" fillOpacity=".12" d="m75 105 125-65 125 65-125 65z" /><path d="m116 84 125 65m-83-86 125 65m-166 0 125-65m-83 86 125-65" /></g></svg>
  </div>;
}

export default class SceneBoundary extends Component {
  state = { unavailable: false };
  static getDerivedStateFromError() { return { unavailable: true }; }
  render() { return this.state.unavailable ? <Illustration /> : this.props.children; }
}

export { Illustration };
