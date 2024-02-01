// enrty point of the whole game of life application
import GameEngine from "./game.engine/engine.js";
import RenderEngine from "./render.engine/render.js";

// create a new game engine
const gameEngine = new GameEngine(new RenderEngine());
// start the game engine
gameEngine.run();
