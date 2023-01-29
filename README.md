<h1 align="center">
    Maptool
</h1>

<h4 align="center"> 
    🚧  Maptool 🎲 Finished 🚧 
</h4>

<p align="center">
 <a href="#-about-the-project">About</a> •
 <a href="#setup">Setup</a> • 
 <a href="#how-to-use">How to use</a> • 
 <a href="#-technologies">Technologies</a>
</p>


## 💻 About the project

It's a web application that facilitates the management of the [Maptool](https://github.com/RPTools/maptool/) tokens and, in addition to mananing it, you can chat.

Currently, it you can only change the token properties and control it with arrow keys.

The objective of this project was to remove the inconvenience of taking the notebook to the rpg campaign, or else share it with your colleagues, so for that, you just have to take your cell phone and connect to the site and enter the maptool server and control your token.

## ⚙️ Setup <span id='setup'></span>

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

## ⌨️ How to use <span id='how-to-use'></span>

On the left bar, you can see server, player, tokens and chat. You can browse through them.

### Server

On the Server, You have to fill in the form to connect in maptool.

About the form:

**Address** - The address of the maptool, you can put `127.0.0.1`, if are on same device of maptool, otherwise, you can use the router address , here is a tutorial to get the address in [Window](https://support.microsoft.com/en-us/windows/find-your-ip-address-in-windows-f21a9bbc-c582-55cd-35e0-73431160a1b9) e no [Linux](https://www.linuxtrainingacademy.com/determine-public-ip-address-command-line-curl/);

**Port** - The port will be the one you used to create the maptool server, if the configuration has the default, it will be `51234`;

**Username** - Your name;

**Password** - You can use the player or gm password, which by default, you will be player;

**Version** - Same Maptool version.


Once you are able to connect to maptool, tou can navigate the rest of the left bar.

### Players

Here, you will see a list of players that are connected and in addition to clicking on the three dots, will appear 'whisper', if you click on it, you wiil be directed to chat.

### Tokens

For you to see your tokens, it is necessary that your token in maptool is yours, to do this, just double-click with right mouse button or open the menu and go to edit by clicking the left mouse button and then access owership and mark the checkbox your username and save. So you can see your token.

You will see some information, such as the name of the token and which map it is on, that is, if you happen to copy and paste it into another map, you will have two different tokens, so pay close attetion to which one you are messing with.

Also, you have Edit and Control.

#### Edit

Here you modify the name, notes and properties of the token.

#### Control

Here you can control your token, first you have to click on the start move button and then you can move it with the arrows and if you want to stop  just click on the stop move button.

### Chat

Here you can see message from other players and tou can also communicate or whisper using `@username messages`.

## 🛠 Technologies

The following tools were used in building the project:

-   **[Ruby](https://www.ruby-lang.org/en/)**
-   **[Sinatra](https://sinatrarb.com/)**
-   **[Tailwind](https://tailwindcss.com/)**
-   **[Flowbite](http://flowbite.com/)**
-   **[Faye](https://faye.jcoglan.com/)**
-   **[Protocol Buffers](https://developers.google.com/protocol-buffers/docs/reference/ruby-generated)**


## 📝 License

This project is under license [MIT](./LICENSE).

Made with ❤️ by Alexandre Alves 👋
