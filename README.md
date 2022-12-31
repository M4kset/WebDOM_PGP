<p align="center">
  <img alt="This is the hd logo" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/hd_logo.png">
</p>

## Introduction

* So, as the brief description said, this was a project that I made during a blackout back then to get something to do, the blackout only lasted like 1 day though, but only 1 day was necessary to make me want to continue the development. 

* I decided to call it PGP which stands for "Platform Game Prototype", since I couldn't come up with something better and I don't think it's anything more than that.

* On day 1/blackout day I got a quick demo that was just the player and a platform, then scrapped that demo and redoing the whole thing from scratch (as always 🤙) after taking a decision.

* Technically it took me 1 week to get the whole thing working, but it took me 2 weeks fixing some minor bugs and making some levels, so technically it didn't took me 1 week. 😔

* <strong>Mobile usage is supported, the game screen contains buttons that are intended for mobile players, and other mobile-intended functionalities as well.</strong>

<p align="center">
  <img alt="The whole page viewed on phone" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/full_page.jpg" width=30%>
  <p align="center"><sup>This is the whole page viewed on mobile</sup></p>
</p>


## Main game
<p align="center">
  <img alt="This is main title" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/main.jpg" width=40%>
  <img alt="This is a pic of gameplay" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/playing.jpg" width=40%>
  <p align="center"><sup>
    You move with asd keys, jump with w, and restart the level with r.
  </sup></p>
</p>

Once opened the index file, you will be received by the main screen that contains the title, and 3 buttons; the first 2 buttons are pretty self-explanatory, the last one and the green square in the corner are part of the editor, something that is explained later on.

## Editor & custom levels
One of the core features of PGP is the capability of the user to make levels as well, this is possible with the built-in editor.

<p align="center">
  <img alt="This is the whole editor" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/editor%26level_data.jpg" width=50%>
  <p align="center"><sup>In this picture, there is shown a level affected by the randomize button, by default is blank with an orange square on the top</sup></p>
</p>

* At the top there are some buttons that let you make quick changes to the editor, as well as the TC (which is a quick guide to the color block types)
* In the middle top section is the graphical mode of the level data, contains all the blocks within the level boundary which is by default 10x7, the size can be changed with the buttons on the sides, but can't be below the default, every square can be painted by clicking them using another color on the color bar below. 🖌
    - On the top left corneris a white square that indicating the block type selected from the color bar below.
    - On the top right and bottom left corner there are the zoom buttons, which, well, do zoom.
    - And below everything mentioned before, there is the color bar. 🎨
* The middle bottom part contains the raw level data, or the level data in text form, allows more advanced level editing and level importing and exporting as well.

<p align="center">
  <img alt="Making a level using the editor" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/using_editor.jpg" width=40%>
  <img alt="A pic of gameplay using custom" src="https://github.com/M4kset/WebDOM_PGP/blob/main/images/playing_custom_from_editor.jpg" width=40%>
  <p align="center"><sup>Pictures of the proper use of the editor and the showcase of the custom level</sup></p>
</p>

<details><summary><i> Wanna check the little hut in the pics for yourself? expand this and paste the raw level data in the editor</i></summary>
  
```
0,0,0,0,0,0,13,_0,0,0,0,8,13,3,_0,0,0,0,13,13,3,_0,0,0,1,13,3,3,_0,14,0,0,13,3,9,_14,14,14,0,13,3,9,_14,14,9,9,13,3,9,_14,14,9,9,13,3,9,_14,14,0,9,13,3,9,_14,14,9,9,13,3,9,_14,14,14,7,13,3,9,_0,14,0,0,13,3,9,_
  ```
</details>

* The bottom bottom bottom zone contains buttons that help to the resize of the raw level data container for mobile users and the randomize button.

<p align="center">
  <strong>
  ///Any syntax error in the raw level data or lack of orange squares in a level will make it invalid, the square in the top left of the page will tell you whether a custom level is valid or not///
  </strong>
</p>

## Notes
* The graphical mode on the editor is going to slow down the page responsiveness if a level is too big, and the only way to fix that is to implement a custom scroll modality or something doing a similar thing as the game screen, and with that the possibility of adding a more complex editor that allows you to paint complex forms and edit a level more easily, thing that would take me a lot of time to do, it's not that I'm lazy (possibly), but the "show and hide editor buttons" already take care of the slow proccesing with big levels, and I'm exhausted of making the project, maybe in an update I could take care of that or something, who knows.
