<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Conway's Game of Life Simulation</h1>

  <p align="center">
    A web based implementation of Conway's Game of Life
    <br />
    <a href="https://github.com/ShavinAnjithaAlpha/game-of-life"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ShavinAnjithaAlpha/game-of-life">View Demo</a>
    ·
    <a href="https://github.com/ShavinAnjithaAlpha/game-of-life/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/ShavinAnjithaAlpha/game-of-life/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>

#### **Official Website: [gol.shavin.live](http://gol.shavin.live/)**

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/559e1272-70f4-4cab-b82a-c9f480edabd3)

#### **Official Website: [gol.shavin.live](http://gol.shavin.live/)**

### About the game of life

![Game of Life Demo](https://upload.wikimedia.org/wikipedia/commons/e/ec/Conways_game_of_life_breeder.png)

The Game of Life, also known as Life, is a cellular automaton that was created by British mathematician John Horton Conway in 1970. It is a zero-player game, which means that its evolution is determined by its initial state and requires no further input. To interact with the game of life, one creates an initial configuration and observes how it evolves. It is Turing complete and capable of simulating a universal constructor or any other Turing machine.

The game consists of 2d infinite grid of cells, each of which can be in one of two states, alive or dead. Every cell interacts with its neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The first generation is created by applying the above rules simultaneously to every cell in the initial state. The rules continued to be applied to create further generations.

**Patterns in the game of life**

From variety of patterns generated in the game of life, there are some patterns that can e classified into one of these categories most of the time:

- Still lifes: Patterns that do not change from one generation to the next.
- Oscillators: Patterns that repeat after a certain number of generations.
- Spaceships: Patterns that move across the grid.
- Methuselahs: Patterns that take a large number of generations to stabilize before becoming a combination of still lifes, oscillators, and spaceships.
- Guns: Patterns that shoot out spaceships.
- Puffers: Patterns that leave debris behind as they move.
- Rakes: Patterns that leave behind a trail of still lifes.
- Wickstretchers: Patterns that leave behind a trail of oscillators.
- Breeders: Patterns that leave behind a trail of spaceships.
- Agars: Patterns that grow indefinitely.

  ![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/219d50f1-c374-46fb-8ff1-3db623e57ff4)    ![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/66313bd7-b211-4a88-9050-7542e8c32cb5)     ![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/d595a30d-72cc-4797-8e8b-a63ee0903833)




### Design and Implementation of the project

This project is a web-based version of the game of life, running entirely on the client-side (in the browser), without the need for server-side processing. The game is implemented purely using HTML, CSS, and JavaScript, with the core of the game being written in JavaScript and the interface being built using HTML and CSS. The project utilizes the HTML5 Canvas low-level API for 2D rendering purposes.

The game is consists of three main components.

1. **The Game Engine**
   The game engine is responsible for the core logic of the game. It is responsible for managing other major components of the game and maintain consistent communication betweenn those components. Some of the task of the game engine are:

   - Initialize the game
   - Initialize other components of the game
   - Handle user events and interactions such as drawing, erasing, game controlling events etc...
   - Update the game state
   - Render the game state
   - Handle the game loop
   - Handle the game state transitions

2. **The Game Model**
   The game model is in charge of keeping track of the entire state of the game as an abstract mathematical model. Its core functionality makes use of a custom hash map implementation to rapidly store and retrieve the game's cell states.

3. **2D Rendering Engine**

   The 2D rendering engine is in charge of drawing the game state on the canvas at a low level. It utilizes the HTML5 Canvas API to draw the game state on the canvas. The rendering engine is responsible for drawing the cells, grid, and other game elements on the canvas.

4. **Grid System**

   The grid system acts as a bridge between the abstract game model and the rendering engine by providing a structured, standardized representation of the game world. The game engine utilizes the grid system to accurately reflect the game model on the canvas, allowing the rendering engine to create a visual representation of the game that is true to the underlying data.

   ```sh

   ++++++++++++++++                +++++++++++++++++                +++++++++++++++++++++++++
   +              +                +               +                +                       +
   +              +                +               +                +                       +
   +  Game Model  + <------------> +  Game Engine  + <------------> +  2D Rendering Engine  + <------------> User Interface
   +              +                +               +                +                       +
   +              +                +               +                +                       +
   ++++++++++++++++                +++++++++++++++++                +++++++++++++++++++++++++
                                          |
                                          |
                                          |
                                          |
                                   +++++++++++++++++
                                   +               +
                                   +               +
                                   +  Grid System  +
                                   +               +
                                   +               +
                                   +++++++++++++++++

   ```

   The game of life is deployed on the official website [Game of Life](http://gol.shavin.live/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- JavaScript
- HTML
- CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

1. Node.js (for live server)
2. NPM (for live server)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/ShavinAnjithaAlpha/game-of-life
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Run the project

   ```sh
   npm start
   ```

   Thats all for the installation. The project will be running on your local server.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/edd47be3-dd4b-464c-ae30-4e564c0d8dad)
![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/478cc648-fa6d-478f-89a5-a59a8e95b221)
![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/2ef21154-3be1-48a8-8dfb-9361ea0f8bd8)
![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/b44623b4-2d45-4243-a4b4-46e3d4b44c25)
![image](https://github.com/ShavinAnjithaAlpha/game-of-life/assets/85817726/76049008-eff7-4bee-a90a-dcd94a20e211)


The game of life is a zero-player game, which means that its evolution is determined by its initial state and requires no further input. To interact with the game of life, one creates an initial configuration and observes how it evolves. The game of life has a few controls that can be used to interact with the game.

For more informations on how to play the game, please refer to the Help page of the official website [Game of Life](http://gol.shavin.live/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Create the project struture
- [x] Implement the hash list data structure
- [x] Implement the game model
- [x] Implement the rendering engine
- [x] Implement the grid system
- [x] Implement the game of engine
  - [x] Implement the core of the game engine
  - [x] Implement the event hadling with user controls
  - [x] Implement the canvas event handling like drawing, erasing etc...
  - [x] Implement the logic for displaying game statistics in the chart
- [x] Implement the user interface
  - [x] Implement the game controls
  - [x] Implement the game state controls
  - [x] Implement the game speed controls
  - [x] Implement the game size controls
  - [x] Implement the game pattern controls
  - [x] Add chart to display the game statistics
- [x] Add feature to add custom initial configuration patterns to the game via json file

See the [open issues](https://github.com/ShavinAnjithaAlpha/game-of-life/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Shavin Anjitha ([shavin@shavin.live](mailto:shavin@shavin.live))
  ([LinkedIn](https://www.linkedin.com/in/shavin-anjitha-chandrawansha-555323229/))

- Project Link: [https://github.com/ShavinAnjithaAlpha/game-of-life](https://github.com/ShavinAnjithaAlpha/game-of-life)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)
- [Chart.js](https://www.chartjs.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
