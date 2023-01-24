<h1 align="center">
    Maptool
</h1>

<h4 align="center"> 
    🚧  Maptool 🎲 Finished 🚧 
</h4>

<p align="center">
 <a href="#-about-the-project">About</a> •
 <a href="#-setup">Setup</a> • 
 <a href="#-technologies">Technologies</a>
</p>


## 💻 About the project

It's a web application that facilitates the management of the [Maptool](https://github.com/RPTools/maptool/) tokens and, in addition to mananing it, you can chat.

Currently, it you can only change the token properties and control it with arrow keys.

The objective of this project was to remove the inconvenience of taking the notebook to the rpg campaign, or else share it with your colleagues, so for that, you just have to take your cell phone and connect to the site and enter the maptool server and control your token.

## ⚙️ Setup

Currently only works on the local machine.

### Prerequisites to run on local machine
-   **[Git](https://git-scm.com)**
-   **[Ruby 3.1.3](https://www.ruby-lang.org/)**
-   **[Node js](https://nodejs.org/)**

---
First clone the repository.
```bash
git clone https://github.com/XandeKK/Maptool
cd Maptool
```
Install the dependencies.
```bash
bundle install
npm install
```
build TailwindCSS.
```bash
npx tailwindcss -i ./app/assets/stylesheets/input.css -o ./app/assets/stylesheets/application.css --minify
```
Test your app to check if everything is ok.

```bash
bundle exec rspec
```
Run web server.
```bash
bundle exec thin -p 9292 -e production start
```
Visit http://localhost:9292 in a browser.

If there is any problem, report it to me.

---

## 🛠 Technologies

The following tools were used in building the project:

-   **[Ruby](https://www.ruby-lang.org/en/)**
-   **[Sinatra](https://sinatrarb.com/)**
-   **[Tailwind](https://tailwindcss.com/)**
-   **[Flowbite](http://flowbite.com/)**
-   **[Faye](https://faye.jcoglan.com/)**

## 📝 License

This project is under license [MIT](./LICENSE).

Made with ❤️ by Alexandre Alves 👋🏽 [Contact](https://www.linkedin.com/in/alexandre-dos-santos-alves-707921206/)
