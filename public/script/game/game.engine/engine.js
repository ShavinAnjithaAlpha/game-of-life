class Engine {
  constructor(renderEngine) {
    this.renderEngine = renderEngine;
  }

  run() {
    setInterval(() => {
      this.renderEngine.render();
    }, 100);
  }
}

export default Engine;
